package com.iuh.service.impl;

import com.iuh.constant.AppConstant;
import com.iuh.document.BookDocument;
import com.iuh.dto.request.BookCreationRequest;
import com.iuh.dto.request.BookImageRequest;
import com.iuh.dto.request.BookUpdateRequest;
import com.iuh.dto.request.BookUpdateStockRequest;
import com.iuh.dto.response.BookResponse;
import com.iuh.dto.response.BookResponseAdmin;
import com.iuh.dto.response.PageResponse;
import com.iuh.entity.Book;
import com.iuh.entity.BookImage;
import com.iuh.enums.BookStatus;
import com.iuh.exception.AppException;
import com.iuh.exception.ErrorCode;
import com.iuh.mapper.BookDocumentMapper;
import com.iuh.mapper.BookMapper;
import com.iuh.repository.*;
import com.iuh.repository.specification.BookSpecificationsBuilder;
import com.iuh.service.BookService;
import com.iuh.util.PageUtil;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class BookServiceImpl implements BookService {
    BookRepository bookRepository;
    CategoryRepository categoryRepository;
    PublisherRepository publisherRepository;
    DiscountRepository discountRepository;
    BookDocumentRepository bookDocumentRepository;
    BookMapper bookMapper;
    BookDocumentMapper bookDocumentMapper;

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    @Transactional
    public BookResponseAdmin save(BookCreationRequest request) {
        log.info("Starting to save a new book: title={}, slug={}, categorySlug={}, publisherSlug={}, discountCode={}",
                request.getTitle(), request.getSlug(), request.getCategorySlug(), request.getPublisherSlug(), request.getDiscountCode());

        try {
            log.debug("Full book creation request: {}", request); // Useful for debugging

            Book book = bookMapper.toEntity(request);

            log.debug("Setting up associations for the book");
            setAssociations(book, request.getCategorySlug(), request.getPublisherSlug(), request.getDiscountCode());

            log.debug("Adding {} book images", request.getBookImages().size());
            addBookImages(book, request.getBookImages());            BookResponseAdmin response = saveBook(book);
            
            // Save to Elasticsearch
            try {
                log.debug("Saving book to Elasticsearch: id={}", book.getId());
                BookDocument bookDocument = bookDocumentMapper.toDocument(book);
                bookDocumentRepository.save(bookDocument);
                log.debug("Book successfully saved to Elasticsearch: id={}", book.getId());
            } catch (Exception e) {
                log.error("Error saving book to Elasticsearch: id={}, error={}", book.getId(), e.getMessage(), e);
                // Continue anyway - we don't want to fail the operation if Elasticsearch indexing fails
            }
            
            log.info("Book saved successfully: id={}, title={}", response.getId(), response.getTitle());

            return response;
        } catch (Exception e) {
            log.error("Error occurred while saving book '{}': {}", request.getTitle(), e.getMessage(), e);
            throw e;
        }
    }    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public PageResponse<Object> findAll(int pageNo, int pageSize, String sortBy, String categorySlug, String search) {
        log.info("Fetching books with filters: pageNo={}, pageSize={}, sortBy={}, categorySlug={}, search={}",
                pageNo, pageSize, sortBy, categorySlug, search);

        try {
            Pageable pageable = PageUtil.getPageable(pageNo, pageSize, sortBy);
            log.debug("Generated Pageable: {}", pageable);

            Page<Book> books = bookRepository.findWithFilterAndSearch(categorySlug, search, search, pageable);
            log.debug("Found {} books from database", books.getTotalElements());

            // Synchronize with Elasticsearch
            try {
                log.debug("Synchronizing books with Elasticsearch");
                // Batch process books to Elasticsearch
                List<BookDocument> bookDocuments = books.getContent().stream()
                        .map(bookDocumentMapper::toDocument)
                        .toList();
                
                bookDocumentRepository.saveAll(bookDocuments);
                log.debug("Successfully synchronized {} books with Elasticsearch", bookDocuments.size());
                
                // Optional: Check if we need to do a full reindex (if this is the first page)
                if (pageNo == 0 && search.isEmpty() && categorySlug == null) {
                    syncAllBooksWithElasticsearch();
                }
            } catch (Exception e) {
                log.error("Error synchronizing books with Elasticsearch: {}", e.getMessage(), e);
                // Continue anyway - we don't want to fail the operation if Elasticsearch indexing fails
            }

            List<BookResponseAdmin> items = books.map(bookMapper::toResponseAdmin).getContent();
            log.debug("Mapped {} books to BookResponseAdmin", items.size());

            PageResponse<Object> response = PageUtil.getPageResponse(pageable, books, items);
            log.info("Successfully fetched page {} of books", pageNo);

            return response;
        } catch (Exception e) {
            log.error("Error occurred while fetching books: {}", e.getMessage(), e);
            throw e;
        }
    }
    
    /**
     * Synchronize all books from the database to Elasticsearch
     * This can be used for a full reindex
     */
    private void syncAllBooksWithElasticsearch() {
        try {
            log.info("Performing full reindex of all books to Elasticsearch");
            // Get all books from the database
            List<Book> allBooks = bookRepository.findAll();
            log.debug("Found {} books in database for full reindex", allBooks.size());
            
            // Convert books to documents
            List<BookDocument> documents = allBooks.stream()
                    .map(bookDocumentMapper::toDocument)
                    .toList();
            
            // Delete existing index to ensure clean state
            try {
                bookDocumentRepository.deleteAll();
                log.debug("Deleted existing documents from Elasticsearch");
            } catch (Exception e) {
                log.warn("Could not delete existing documents: {}", e.getMessage());
                // Continue with save operation
            }
            
            // Save all documents
            bookDocumentRepository.saveAll(documents);
            log.info("Successfully reindexed {} books to Elasticsearch", documents.size());
        } catch (Exception e) {
            log.error("Error during full reindex to Elasticsearch: {}", e.getMessage(), e);
            // Don't propagate exception, just log it
        }
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public PageResponse<Object> findAllSpecifications(int pageNo, int pageSize, String sortBy, String[] books) {
        log.info("Fetching books with specifications: pageNo={}, pageSize={}, sortBy={}, filters={}",
                pageNo, pageSize, sortBy, books != null ? String.join(", ", books) : "null");

        try {
            if (books == null || books.length == 0) {
                log.debug("No specifications provided. Falling back to default findAll()");
                return findAll(pageNo, pageSize, sortBy, null, "");
            }

            log.debug("Building specifications from filters");
            BookSpecificationsBuilder builder = getBookSpecificationsBuilder(books);

            Pageable pageable = PageUtil.getPageable(pageNo, pageSize, sortBy);
            log.debug("Generated Pageable: {}", pageable);

            Page<Book> booksPage = bookRepository.findAll(builder.build(), pageable);
            log.debug("Found {} books with specifications", booksPage.getTotalElements());

            List<BookResponseAdmin> items = booksPage.map(bookMapper::toResponseAdmin).getContent();
            log.debug("Mapped {} books to BookResponseAdmin", items.size());

            PageResponse<Object> response = PageUtil.getPageResponse(pageable, booksPage, items);
            log.info("Successfully fetched books with specifications for page {}", pageNo);

            return response;
        } catch (Exception e) {
            log.error("Error occurred while fetching books with specifications: {}", e.getMessage(), e);
            throw e;
        }
    }

    @Override
    public PageResponse<Object> findAllBooksStatusActive(int pageNo, int pageSize, String sortBy, String categorySlug, String search) {
        log.info("Fetching active books with filters: pageNo={}, pageSize={}, sortBy={}, categorySlug={}, search={}",
                pageNo, pageSize, sortBy, categorySlug, search);

        try {
            Pageable pageable = PageUtil.getPageable(pageNo, pageSize, sortBy);
            log.debug("Generated Pageable: {}", pageable);
            Page<Book> books = bookRepository.findWithFilterAndSearchStatusActive(categorySlug, search, search, pageable);
            log.debug("Found {} active books", books.getTotalElements());

            List<BookResponse> items = books.map(bookMapper::toResponse).getContent();
            log.debug("Mapped {} books to BookResponse", items.size());

            PageResponse<Object> response = PageUtil.getPageResponse(pageable, books, items);
            log.info("Successfully fetched page {} of active books", pageNo);

            return response;
        } catch (Exception e) {
            log.error("Error occurred while fetching active books: {}", e.getMessage(), e);
            throw e;
        }
    }

    @Override
    public PageResponse<Object> findAllSpecificationsActive(int pageNo, int pageSize, String sortBy, String[] books) {
        log.info("Fetching books with specifications for active status: pageNo={}, pageSize={}, sortBy={}, filters={}",
                pageNo, pageSize, sortBy, books != null ? String.join(", ", books) : "null");

        try {
            if (books == null || books.length == 0) {
                log.debug("No specifications provided. Falling back to default findAllBooksStatusActive()");
                return findAllBooksStatusActive(pageNo, pageSize, sortBy, null, "");
            }


            BookSpecificationsBuilder builder = getBookSpecificationsBuilder(books);

            Pageable pageable = PageUtil.getPageable(pageNo, pageSize, sortBy);
            log.debug("Generated Pageable: {}", pageable);

            Page<Book> booksPage = bookRepository.findAll(builder.build(), pageable);
            log.debug("Found {} books with specifications", booksPage.getTotalElements());

            List<BookResponse> items = booksPage.map(bookMapper::toResponse).getContent();
            log.debug("Mapped {} books to BookResponse", items.size());

            PageResponse<Object> response = PageUtil.getPageResponse(pageable, booksPage, items);
            log.info("Successfully fetched books with specifications for page {}", pageNo);

            return response;
        } catch (Exception e) {
            log.error("Error occurred while fetching books with specifications: {}", e.getMessage(), e);
            throw e;
        }
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public BookResponseAdmin findById(String id) {
        return bookMapper.toResponseAdmin(getBookById(id));
    }

    @Override
    public BookResponse findBySlug(String slug) {
        return bookRepository.findBySlug(slug)
                .map(bookMapper::toResponse)
                .orElseThrow(() -> new AppException(ErrorCode.BOOK_NOT_FOUND));
    }    @Override
    @PreAuthorize("hasRole('ADMIN')")
    @Transactional
    public BookResponseAdmin update(String id, BookUpdateRequest request) {
        log.info("Updating book with id: {}", id);
        Book book = getBookById(id);
        bookMapper.toUpdateEntity(book, request);

        setAssociations(book, request.getCategorySlug(), request.getPublisherSlug(), request.getDiscountCode());
        updateBookImages(book, request.getBookImages());

        BookResponseAdmin response = saveBook(book);
        
        // Update in Elasticsearch
        try {
            log.debug("Updating book in Elasticsearch: id={}", book.getId());
            BookDocument bookDocument = bookDocumentMapper.toDocument(book);
            bookDocumentRepository.save(bookDocument);
            log.debug("Book successfully updated in Elasticsearch: id={}", book.getId());
        } catch (Exception e) {
            log.error("Error updating book in Elasticsearch: id={}, error={}", book.getId(), e.getMessage(), e);
            // Continue anyway - we don't want to fail the operation if Elasticsearch indexing fails
        }
        
        return response;
    }    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(String id) {
        log.info("Deleting book with id: {}", id);
        bookRepository.deleteById(id);
        
        // Delete from Elasticsearch
        try {
            log.debug("Deleting book from Elasticsearch: id={}", id);
            bookDocumentRepository.deleteById(id);
            log.debug("Book successfully deleted from Elasticsearch: id={}", id);
        } catch (Exception e) {
            log.error("Error deleting book from Elasticsearch: id={}, error={}", id, e.getMessage(), e);
            // Continue anyway - we don't want to fail the operation if Elasticsearch deletion fails
        }
    }    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public void changeStatus(String bookId, BookStatus status) {
        log.info("Changing book status: id={}, newStatus={}", bookId, status);
        Book book = getBookById(bookId);
        book.setStatus(status);
        Book savedBook = bookRepository.save(book);
        
        // Update in Elasticsearch
        try {
            log.debug("Updating book status in Elasticsearch: id={}, status={}", bookId, status);
            BookDocument bookDocument = bookDocumentMapper.toDocument(savedBook);
            bookDocumentRepository.save(bookDocument);
            log.debug("Book status successfully updated in Elasticsearch: id={}", bookId);
        } catch (Exception e) {
            log.error("Error updating book status in Elasticsearch: id={}, error={}", bookId, e.getMessage(), e);
            // Continue anyway - we don't want to fail the operation if Elasticsearch indexing fails
        }
    }

    @Override
    @Transactional
    public List<BookResponseAdmin> getAndUpdateBooks(List<BookUpdateStockRequest> requests) {
        log.info("Updating stock for {} books", requests.size());

        try {
            List<BookResponseAdmin> updatedBooks = requests.stream().map(request -> {
                log.debug("Processing stock update for book: id={}, quantity={}", request.getBookId(), request.getQuantity());

                Book book = getBookById(request.getBookId());
                if (book.getStock() < request.getQuantity()) {
                    log.error("Book out of stock: id={}, requestedQuantity={}", request.getBookId(), request.getQuantity());
                    throw new AppException(ErrorCode.BOOK_OUT_OF_STOCK);
                }                book.setStock(book.getStock() - request.getQuantity());
                book.setSold(book.getSold() + request.getQuantity());

                Book savedBook = bookRepository.save(book);
                BookResponseAdmin response = bookMapper.toResponseAdmin(savedBook);
                
                // Update in Elasticsearch
                try {
                    log.debug("Updating book stock in Elasticsearch: id={}, newStock={}, newSold={}", 
                              book.getId(), book.getStock(), book.getSold());
                    BookDocument bookDocument = bookDocumentMapper.toDocument(savedBook);
                    bookDocumentRepository.save(bookDocument);
                    log.debug("Book stock successfully updated in Elasticsearch: id={}", book.getId());
                } catch (Exception e) {
                    log.error("Error updating book stock in Elasticsearch: id={}, error={}", 
                              book.getId(), e.getMessage(), e);
                    // Continue anyway - we don't want to fail the operation if Elasticsearch indexing fails
                }
                log.debug("Updated book: id={}, newStock={}, newSold={}", book.getId(), book.getStock(), book.getSold());
                return response;
            }).toList();

            log.info("Successfully updated stock for {} books", updatedBooks.size());
            return updatedBooks;
        } catch (Exception e) {
            log.error("Error occurred while updating stock for books: {}", e.getMessage(), e);
            throw e;
        }
    }

    private Book getBookById(String bookId) {
        return bookRepository.findById(bookId).orElseThrow(() -> new AppException(ErrorCode.BOOK_NOT_FOUND));
    }

    private BookResponseAdmin saveBook(Book book) {
        try {
            Book savedBook = bookRepository.save(book);
            return bookMapper.toResponseAdmin(savedBook);
        } catch (DataIntegrityViolationException e) {
            throw new AppException(ErrorCode.BOOK_EXISTS);
        }
    }

    private void setAssociations(Book book, String categorySlug, String publisherSlug, String discountCode) {
        book.setCategory(categoryRepository.findBySlug(categorySlug)
                .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND)));

        book.setPublisher(publisherRepository.findBySlug(publisherSlug)
                .orElseThrow(() -> new AppException(ErrorCode.PUBLISHER_NOT_FOUND)));

        book.setDiscount(discountRepository.findByCode(discountCode).orElse(null));
    }

    private void addBookImages(Book book, Set<BookImageRequest> images) {
        images.forEach(image ->
                book.addBookImage(BookImage.builder().url(image.getUrl()).build())
        );
    }

    private void updateBookImages(Book book, Set<BookImageRequest> images) {
        book.getBookImages().clear();
        addBookImages(book, images);
    }

    private BookSpecificationsBuilder getBookSpecificationsBuilder(String[] books) {
        BookSpecificationsBuilder builder = new BookSpecificationsBuilder();
        Pattern pattern = Pattern.compile(AppConstant.SEARCH_SPEC_OPERATOR);

        for (String s : books) {
            Matcher matcher = pattern.matcher(s);
            if (matcher.find())
                builder.with(matcher.group(1), matcher.group(2), matcher.group(3), matcher.group(4), matcher.group(5));
        }

        return builder;
    }

}
