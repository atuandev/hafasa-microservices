package com.iuh.service;

import com.iuh.dto.request.CategoryRequest;
import com.iuh.dto.response.CategoryResponse;
import com.iuh.dto.response.PageResponse;

public interface CategoryService {
    CategoryResponse save(CategoryRequest request);

    PageResponse<Object> findAll(int pageNo, int pageSize, String sortBy, String search);

    CategoryResponse findBySlug(String slug);

    CategoryResponse findById(String id);

    CategoryResponse update(String id, CategoryRequest request);

    void delete(String id);
}
