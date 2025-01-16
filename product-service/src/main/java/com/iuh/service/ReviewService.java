package com.iuh.service;

import com.iuh.dto.request.ReviewCreationRequest;
import com.iuh.dto.request.ReviewUpdateRequest;
import com.iuh.dto.response.PageResponse;
import com.iuh.dto.response.ReviewResponse;
import com.iuh.enums.ReviewStatus;

public interface ReviewService {

    ReviewResponse save(ReviewCreationRequest request);

    PageResponse<Object> findAll(int pageNo, int pageSize, String sortBy, String search, ReviewStatus status);

    PageResponse<Object> findAllByBookId(String bookId, int pageNo, int pageSize, String sortBy, int rating);

    PageResponse<Object> findAllByUserId(String userId, int pageNo, int pageSize, String sortBy);

    ReviewResponse findById(String reviewId);

    ReviewResponse update(String reviewId, ReviewUpdateRequest request);

    void delete(String reviewId);

    void updateStatus(String reviewId, ReviewStatus status);
}
