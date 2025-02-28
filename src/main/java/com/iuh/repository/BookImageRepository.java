package com.iuh.repository;

import com.iuh.entity.BookImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookImageRepository extends JpaRepository<BookImage, String> {
    @Query("SELECT b FROM BookImage b WHERE b.book.id = :bookId")
    Optional<BookImage> findAllByBookId(String bookId);

    void deleteAllByBookId(String bookId);
}
