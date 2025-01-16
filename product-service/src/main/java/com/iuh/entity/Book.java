package com.iuh.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.iuh.enums.BookStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.HashSet;
import java.util.Set;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "books")
public class Book extends AbstractEntity {

    @Column(nullable = false)
    String title;

    @Column(nullable = false, unique = true)
    String slug;

    @Column(nullable = false, columnDefinition = "TEXT")
    String thumbnail;

    @Column(columnDefinition = "TEXT")
    String description;

    String author;

    String size;

    Integer pages;

    Integer weight;

    Integer publishYear;

    Double importPrice;

    Double price;

    Integer stock;

    Integer sold;

    Integer reviewCount;

    Double reviewStar;

    Boolean isNew;

    Boolean isFeatured;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    BookStatus status = BookStatus.DRAFT;

    @ManyToOne()
    @JoinColumn(name = "category_id")
    Category category;

    @ManyToOne()
    @JoinColumn(name = "publisher_id")
    Publisher publisher;

    @ManyToOne()
    @JoinColumn(name = "discount_id")
    Discount discount;

    @JsonIgnore
    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL, orphanRemoval = true)
    Set<BookImage> bookImages;

    public void addBookImage(BookImage bookImage) {
        if (bookImages == null) {
            bookImages = new HashSet<>();
        }
        bookImages.add(bookImage);
        bookImage.setBook(this);
    }

    public Double getDiscountPrice() {
        if (discount == null || !discount.isValid()) {
            return price;
        }
        return price - (price * discount.getPercent() / 100);
    }
}
