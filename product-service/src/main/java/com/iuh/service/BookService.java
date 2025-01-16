package com.iuh.service;

import com.iuh.dto.request.BookCreationRequest;
import com.iuh.dto.request.BookUpdateRequest;
import com.iuh.dto.response.BookResponse;
import com.iuh.dto.response.PageResponse;
import com.iuh.enums.BookStatus;

public interface BookService {
    BookResponse save(BookCreationRequest request);

    PageResponse<Object> findAll(int pageNo, int pageSize, String sortBy, String categorySlug, String search);

    PageResponse<Object> findAllSpecifications(int pageNo, int pageSize, String sortBy, String[] books);

    PageResponse<Object> findAllBooksStatusActive(int pageNo, int pageSize, String sortBy, String categorySlug, String search);

    PageResponse<Object> findAllSpecificationsActive(int pageNo, int pageSize, String sortBy, String[] books);

    BookResponse findById(String id);

    BookResponse findBySlug(String slug);

    BookResponse update(String id, BookUpdateRequest request);

    void delete(String id);

    void changeStatus(String bookId, BookStatus status);
}
