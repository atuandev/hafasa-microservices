package com.iuh.service;

import com.iuh.dto.request.BookCreationRequest;
import com.iuh.dto.request.BookUpdateRequest;
import com.iuh.dto.request.BookUpdateStockRequest;
import com.iuh.dto.response.BookResponse;
import com.iuh.dto.response.BookResponseAdmin;
import com.iuh.dto.response.PageResponse;
import com.iuh.enums.BookStatus;

import java.util.List;

public interface BookService {
    BookResponseAdmin save(BookCreationRequest request);

    PageResponse<Object> findAll(int pageNo, int pageSize, String sortBy, String categorySlug, String search);

    PageResponse<Object> findAllSpecifications(int pageNo, int pageSize, String sortBy, String[] books);

    PageResponse<Object> findAllBooksStatusActive(int pageNo, int pageSize, String sortBy, String categorySlug, String search);

    PageResponse<Object> findAllSpecificationsActive(int pageNo, int pageSize, String sortBy, String[] books);

    BookResponseAdmin findById(String id);

    BookResponse findBySlug(String slug);

    BookResponseAdmin update(String id, BookUpdateRequest request);

    void delete(String id);

    void changeStatus(String bookId, BookStatus status);

    List<BookResponseAdmin> getAndUpdateBooks(List<BookUpdateStockRequest> requests);

}
