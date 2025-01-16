package com.iuh.repository;

import com.iuh.entity.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, String> {

    @Query("SELECT r FROM Role r WHERE LOWER(r.name) LIKE %:name% AND LOWER(r.description) LIKE %:description%")
    Page<Role> findAllWithSearch(String name, String description, Pageable pageable);
}
