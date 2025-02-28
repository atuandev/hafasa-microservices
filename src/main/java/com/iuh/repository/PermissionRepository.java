package com.iuh.repository;

import com.iuh.entity.Permission;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PermissionRepository extends JpaRepository<Permission, String> {
    @Query("SELECT p FROM Permission p WHERE LOWER(p.name) LIKE %:name% AND LOWER(p.description) LIKE %:description%")
    Page<Permission> findWithSearch(String name, String description, Pageable pageable);
}
