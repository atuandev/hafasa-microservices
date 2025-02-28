package com.iuh.repository;

import com.iuh.entity.Publisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PublisherRepository extends JpaRepository<Publisher, String> {
    Optional<Publisher> findBySlug(String slug);

    @Query("""
             SELECT p FROM Publisher p\s
             WHERE LOWER(p.name) LIKE %:name%\s
             OR LOWER(p.slug) LIKE %:slug%\s
             OR LOWER(p.address) LIKE %:address%
            """)
    Page<Publisher> findWithSearch(String name, String slug, String address, Pageable pageable);

    @Query("""
             SELECT p FROM Publisher p\s
             WHERE LOWER(p.name) LIKE %:name%\s
             OR LOWER(p.slug) LIKE %:slug%\s
             OR LOWER(p.address) LIKE %:address%
             AND p.status = true
            """)
    Page<Publisher> findAllWithSearchStatusTrue(String name, String slug, String address, Pageable pageable);
}
