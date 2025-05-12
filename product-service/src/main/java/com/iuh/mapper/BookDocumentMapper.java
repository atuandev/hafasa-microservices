package com.iuh.mapper;

import com.iuh.document.BookDocument;
import com.iuh.entity.Book;
import org.springframework.stereotype.Component;

@Component
public class BookDocumentMapper {

    public BookDocument toDocument(Book book) {
        if (book == null) {
            return null;
        }
        
        return BookDocument.builder()
                .id(book.getId())
                .title(book.getTitle())
                .slug(book.getSlug())
                .thumbnail(book.getThumbnail())
                .description(book.getDescription())
                .author(book.getAuthor())
                .size(book.getSize())
                .pages(book.getPages())
                .weight(book.getWeight())
                .publishYear(book.getPublishYear())
                .importPrice(book.getImportPrice())
                .price(book.getPrice())
                .stock(book.getStock())
                .sold(book.getSold())
                .reviewCount(book.getReviewCount())
                .reviewStar(book.getReviewStar())
                .isNew(book.getIsNew())
                .isFeatured(book.getIsFeatured())
                .status(book.getStatus().name())
                .category(book.getCategory() != null ? book.getCategory().getName() : null)
                .publisher(book.getPublisher() != null ? book.getPublisher().getName() : null)
                .build();
    }
}
