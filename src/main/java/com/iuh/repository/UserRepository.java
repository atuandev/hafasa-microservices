package com.iuh.repository;

import com.iuh.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String>, JpaSpecificationExecutor<User> {
    Optional<User> findByUsername(String username);

    @Query("""
            SELECT u FROM User u
            WHERE LOWER(u.username) LIKE %:username%
            OR LOWER(u.id) LIKE %:id%
            OR LOWER(u.name) LIKE %:name%
            OR LOWER(u.email) LIKE %:email%
            """)
    Page<User> findAllAndSearch(String username, String name, String email, String id, Pageable pageable);

}
