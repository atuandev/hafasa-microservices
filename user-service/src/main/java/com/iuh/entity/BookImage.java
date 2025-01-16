package com.iuh.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "book_images")
public class BookImage extends AbstractEntity {

    @Column(columnDefinition = "TEXT")
    String url;

    @ManyToOne()
    @JoinColumn(name = "book_id")
    Book book;
}
