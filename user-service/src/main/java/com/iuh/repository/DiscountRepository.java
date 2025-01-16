package com.iuh.repository;

import com.iuh.entity.Discount;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DiscountRepository extends JpaRepository<Discount, String> {
    Optional<Discount> findByCode(String code);

    boolean existsByCode(String code);

    @Query("""
             SELECT d FROM Discount d\s
             WHERE LOWER(d.name) LIKE %:search% OR LOWER(d.code) LIKE %:search%\s
            """)
    Page<Discount> findAllBySearch(String search, Pageable pageable);
}
