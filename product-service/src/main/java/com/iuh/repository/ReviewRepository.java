package com.iuh.repository;

import com.iuh.entity.Review;
import com.iuh.enums.ReviewStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review, String> {
    @Query("""
              SELECT r FROM Review r
              WHERE (LOWER(r.comment) LIKE %:comment%
              OR LOWER(r.book.title) LIKE %:title%)
              AND r.status = :status
            """)
    Page<Review> findAllWithSearch(String comment, String username, String name, String title, ReviewStatus status, Pageable pageable);

    @Query("""
              SELECT r FROM Review r\s
              WHERE  r.book.id =:bookId\s
              AND r.status = 'ACTIVE'
            """)
    Page<Review> findAllByBookId(String bookId, Pageable pageable);

    @Query("""
              SELECT r FROM Review r\s
              WHERE  r.book.id =:bookId\s
              AND r.rating = :rating\s
              AND r.status = 'ACTIVE'
            """)
    Page<Review> findAllByBookIdAndRating(String bookId, int rating, Pageable pageable);

    @Query("""
              SELECT r FROM Review r\s
              WHERE  r.userId = :userId\s
              AND r.status = 'ACTIVE'
            """)
    Page<Review> findAllWithSearchByUserId(String userId, Pageable pageable);
}
