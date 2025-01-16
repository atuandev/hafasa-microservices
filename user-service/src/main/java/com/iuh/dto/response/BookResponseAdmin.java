package com.iuh.dto.response;

import com.iuh.enums.BookStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class BookResponseAdmin {
    String id;
    String title;
    String slug;
    String thumbnail;
    String description;
    String author;
    String size;
    Integer pages;
    Integer weight;
    Integer publishYear;
    Double importPrice;
    Double price;
    Double discountPrice;
    Integer stock;
    Integer sold;
    Integer reviewCount;
    Double reviewStar;
    Boolean isNew;
    Boolean isFeatured;
    BookStatus status;
    CategoryResponse category;
    PublisherResponse publisher;
    DiscountResponse discount;
    Set<BookImageResponse> bookImages;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
}
