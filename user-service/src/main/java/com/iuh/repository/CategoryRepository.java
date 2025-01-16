package com.iuh.repository;

import com.iuh.entity.Category;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, String> {
    Optional<Category> findBySlug(String slug);

    Page<Category> findAllByNameContainingIgnoreCase(String name, Pageable pageable);
}
