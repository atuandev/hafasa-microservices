package com.iuh.dto.request;

import com.iuh.enums.BookStatus;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class BookUpdateRequest {

    @Size(min = 1, message = "INVALID_BOOK_TITLE")
    String title;

    @Size(min = 1, message = "INVALID_BOOK_SLUG")
    String slug;

    @Size(min = 1, message = "INVALID_BOOK_THUMBNAIL")
    String thumbnail;

    @Size(min = 1, message = "INVALID_BOOK_DESCRIPTION")
    String description;

    @Size(min = 1, message = "INVALID_BOOK_AUTHOR")
    String author;

    @Size(min = 1, message = "INVALID_BOOK_SIZE")
    String size;

    @Min(value = 0, message = "INVALID_BOOK_PAGES")
    Integer pages;

    @Min(value = 0, message = "INVALID_BOOK_WEIGHT")
    Integer weight;

    @Min(value = 1900, message = "INVALID_BOOK_PUBLISH_YEAR")
    Integer publishYear;

    @Min(value = 0, message = "INVALID_BOOK_IMPORT_PRICE")
    Double importPrice;

    @Min(value = 0, message = "INVALID_BOOK_PRICE")
    Double price;

    @Min(value = 0, message = "INVALID_BOOK_STOCK")
    Integer stock;

    @Min(value = 0, message = "INVALID_BOOK_SOLD")
    Integer sold;

    Boolean isNew;

    Boolean isFeatured;

    Integer reviewCount;

    Double reviewStar;

    BookStatus status;

    String categorySlug;

    String publisherSlug;

    String discountCode;

    @NotNull(message = "INVALID_BOOK_IMAGE_URL")
    Set<BookImageRequest> bookImages;
}
