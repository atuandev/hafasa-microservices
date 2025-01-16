package com.iuh.entity;

import com.iuh.enums.ReviewStatus;
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
@Table(name = "reviews")
public class Review extends AbstractEntity {

    @Column(columnDefinition = "TEXT")
    String comment;

    @Column(nullable = false)
    Integer rating;

    @ManyToOne()
    @JoinColumn(name = "user_id")
    User user;

    @ManyToOne()
    @JoinColumn(name = "book_id")
    Book book;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    ReviewStatus status = ReviewStatus.ACTIVE;

}
