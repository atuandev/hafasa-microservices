package com.iuh.repository;

import com.iuh.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, String>, JpaSpecificationExecutor<Book> {
    Optional<Book> findBySlug(String slug);

    @Query("""
            SELECT b FROM Book b
            WHERE (:categorySlug IS NULL OR b.category.slug = :categorySlug)\s
            AND (LOWER(b.title) LIKE %:title% OR LOWER(b.author) LIKE %:author%)\s
            """)
    Page<Book> findWithFilterAndSearch(String categorySlug, String title, String author, Pageable pageable);

    @Query("""
            SELECT b FROM Book b
            WHERE (:categorySlug IS NULL OR b.category.slug = :categorySlug)\s
            AND (LOWER(b.title) LIKE %:title% OR LOWER(b.author) LIKE %:author%)\s
            AND b.status = 'ACTIVE'
            """)
    Page<Book> findWithFilterAndSearchStatusActive(String categorySlug, String title, String author, Pageable pageable);

}
