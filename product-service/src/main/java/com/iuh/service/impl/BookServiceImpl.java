package com.iuh.service.impl;

import com.iuh.constant.AppConstant;
import com.iuh.dto.request.BookCreationRequest;
import com.iuh.dto.request.BookImageRequest;
import com.iuh.dto.request.BookUpdateRequest;
import com.iuh.dto.response.BookResponse;
import com.iuh.dto.response.BookResponseAdmin;
import com.iuh.dto.response.PageResponse;
import com.iuh.entity.Book;
import com.iuh.entity.BookImage;
import com.iuh.enums.BookStatus;
import com.iuh.exception.AppException;
import com.iuh.exception.ErrorCode;
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
    BookMapper bookMapper;

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    @Transactional
    public BookResponse save(BookCreationRequest request) {
        Book book = bookMapper.toEntity(request);

        book.setCategory(categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND)));

        book.setPublisher(publisherRepository.findById(request.getPublisherId())
                .orElseThrow(() -> new AppException(ErrorCode.PUBLISHER_NOT_FOUND)));

        book.setDiscount(discountRepository.findByCode(request.getDiscountCode()).orElse(null));

        for (BookImageRequest bookImageRequest : request.getBookImages()) {
            book.addBookImage(BookImage.builder().url(bookImageRequest.getUrl()).build());
        }

        try {
            book = bookRepository.save(book);
        } catch (DataIntegrityViolationException e) {
            throw new AppException(ErrorCode.BOOK_EXISTS);
        }

        return bookMapper.toResponse(book);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public PageResponse<Object> findAll(int pageNo, int pageSize, String sortBy, String categorySlug, String search) {
        Pageable pageable = PageUtil.getPageable(pageNo, pageSize, sortBy);
        Page<Book> books = bookRepository.findWithFilterAndSearch(categorySlug, search, search, pageable);
        List<BookResponseAdmin> items = books.map(bookMapper::toResponseAdmin).getContent();

        return PageUtil.getPageResponse(pageable, books, items);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public PageResponse<Object> findAllSpecifications(int pageNo, int pageSize, String sortBy, String[] books) {
        if (books == null || books.length == 0) {
            return findAll(pageNo, pageSize, sortBy, null, "");
        }

        BookSpecificationsBuilder builder = getBookSpecificationsBuilder(books);

        Pageable pageable = PageUtil.getPageable(pageNo, pageSize, sortBy);
        Page<Book> booksPage = bookRepository.findAll(builder.build(), pageable);
        List<BookResponseAdmin> items = booksPage.map(bookMapper::toResponseAdmin).getContent();

        return PageUtil.getPageResponse(pageable, booksPage, items);
    }

    @Override
    public PageResponse<Object> findAllBooksStatusActive(int pageNo, int pageSize, String sortBy, String categorySlug, String search) {
        Pageable pageable = PageUtil.getPageable(pageNo, pageSize, sortBy);
        Page<Book> books = bookRepository.findWithFilterAndSearchStatusActive(categorySlug, search, search, pageable);
        List<BookResponse> items = books.map(bookMapper::toResponse).getContent();

        return PageUtil.getPageResponse(pageable, books, items);
    }

    @Override
    public PageResponse<Object> findAllSpecificationsActive(int pageNo, int pageSize, String sortBy, String[] books) {
        if (books == null || books.length == 0) {
            return findAllBooksStatusActive(pageNo, pageSize, sortBy, null, "");
        }

        BookSpecificationsBuilder builder = getBookSpecificationsBuilder(books);

        Pageable pageable = PageUtil.getPageable(pageNo, pageSize, sortBy);
        Page<Book> booksPage = bookRepository.findAll(builder.build(), pageable);
        List<BookResponse> items = booksPage.map(bookMapper::toResponse).getContent();

        return PageUtil.getPageResponse(pageable, booksPage, items);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public BookResponse findById(String id) {
        Book book = getBookById(id);
        return bookMapper.toResponse(book);
    }

    @Override
    public BookResponse findBySlug(String slug) {
        return bookRepository.findBySlug(slug).map(bookMapper::toResponse)
                .orElseThrow(() -> new AppException(ErrorCode.BOOK_NOT_FOUND));
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    @Transactional
    public BookResponse update(String id, BookUpdateRequest request) {
        Book book = getBookById(id);
        bookMapper.toUpdateEntity(book, request);

        book.setCategory(categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND)));

        book.setPublisher(publisherRepository.findById(request.getPublisherId())
                .orElseThrow(() -> new AppException(ErrorCode.PUBLISHER_NOT_FOUND)));

        book.setDiscount(discountRepository.findByCode(request.getDiscountCode()).orElse(null));

        // update book images
        book.getBookImages().clear();
        for (BookImageRequest bookImageRequest : request.getBookImages()) {
            book.addBookImage(BookImage.builder().url(bookImageRequest.getUrl()).build());
        }

        try {
            book = bookRepository.save(book);
        } catch (DataIntegrityViolationException e) {
            throw new AppException(ErrorCode.BOOK_EXISTS);
        }

        return bookMapper.toResponse(book);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(String id) {
        bookRepository.deleteById(id);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public void changeStatus(String bookId, BookStatus status) {
        Book book = getBookById(bookId);
        book.setStatus(status);
        bookRepository.save(book);
    }

    private Book getBookById(String bookId) {
        return bookRepository.findById(bookId).orElseThrow(() -> new AppException(ErrorCode.BOOK_NOT_FOUND));
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
