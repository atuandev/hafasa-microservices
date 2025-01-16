package com.iuh.controller;

import com.iuh.dto.ApiResponse;
import com.iuh.dto.request.ReviewCreationRequest;
import com.iuh.dto.request.ReviewUpdateRequest;
import com.iuh.dto.response.PageResponse;
import com.iuh.dto.response.ReviewResponse;
import com.iuh.enums.ReviewStatus;
import com.iuh.service.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Review Controller")
@RestController
@RequestMapping("/reviews")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class ReviewController {
    static final String DEFAULT_PAGE_NO = "0";
    static final String DEFAULT_PAGE_SIZE = "12";
    static final String DEFAULT_SORT_BY = "createdAt:desc";
    static final String DEFAULT_SEARCH = "";
    static final String DEFAULT_RATING = "0";

    ReviewService reviewService;

    @PostMapping("/add")
    @Operation(summary = "Add review to book by user")
    public ApiResponse<ReviewResponse> addReview(@Valid @RequestBody ReviewCreationRequest request) {
        return ApiResponse.<ReviewResponse>builder()
                .message("Review added successfully")
                .data(reviewService.save(request)).build();
    }

    @GetMapping
    @Operation(summary = "ADMIN: Find all reviews")
    public ApiResponse<PageResponse<Object>> findAll(
            @RequestParam(defaultValue = DEFAULT_PAGE_NO, required = false) @Min(0) int pageNo,
            @RequestParam(defaultValue = DEFAULT_PAGE_SIZE, required = false) @Min(4) int pageSize,
            @RequestParam(defaultValue = DEFAULT_SORT_BY, required = false) String sortBy,
            @RequestParam(defaultValue = DEFAULT_SEARCH, required = false) String search,
            @RequestParam(required = false) ReviewStatus status
    ) {
        return ApiResponse.<PageResponse<Object>>builder()
                .message("Get all reviews successfully")
                .data(reviewService.findAll(pageNo, pageSize, sortBy, search, status)).build();
    }

    @GetMapping("/book/{bookId}")
    @Operation(summary = "Find all reviews by book id",
            description = "Get all reviews by book id with pagination, sorting, search and status true")
    public ApiResponse<PageResponse<Object>> findByBookId(
            @PathVariable String bookId,
            @RequestParam(defaultValue = DEFAULT_PAGE_NO, required = false) @Min(0) int pageNo,
            @RequestParam(defaultValue = DEFAULT_PAGE_SIZE, required = false) @Min(4) int pageSize,
            @RequestParam(defaultValue = DEFAULT_SORT_BY, required = false) String sortBy,
            @RequestParam(defaultValue = DEFAULT_RATING, required = false) Integer rating
    ) {
        return ApiResponse.<PageResponse<Object>>builder()
                .message("Get all reviews by book id successfully")
                .data(reviewService.findAllByBookId(bookId, pageNo, pageSize, sortBy, rating)).build();
    }

    @GetMapping("/user/{userId}")
    @Operation(summary = "Find all reviews by user id",
            description = "Get all reviews by user id with pagination, sorting, search and status true")
    public ApiResponse<PageResponse<Object>> findByUserId(
            @PathVariable String userId,
            @RequestParam(defaultValue = DEFAULT_PAGE_NO, required = false) @Min(0) int pageNo,
            @RequestParam(defaultValue = DEFAULT_PAGE_SIZE, required = false) @Min(4) int pageSize,
            @RequestParam(defaultValue = DEFAULT_SORT_BY, required = false) String sortBy
    ) {
        return ApiResponse.<PageResponse<Object>>builder()
                .message("Get all reviews by user id successfully")
                .data(reviewService.findAllByUserId(userId, pageNo, pageSize, sortBy)).build();
    }

    @GetMapping("/{reviewId}")
    @Operation(summary = "ADMIN: Find review by id")
    public ApiResponse<ReviewResponse> findById(@PathVariable String reviewId) {
        return ApiResponse.<ReviewResponse>builder()
                .message("Get review by id successfully")
                .data(reviewService.findById(reviewId)).build();
    }

    @PutMapping("/{reviewId}")
    @Operation(summary = "Update review by id")
    public ApiResponse<ReviewResponse> updateReview(
            @PathVariable String reviewId,
            @Valid @RequestBody ReviewUpdateRequest request
    ) {
        return ApiResponse.<ReviewResponse>builder()
                .message("Review updated successfully")
                .data(reviewService.update(reviewId, request)).build();
    }

    @DeleteMapping("/{reviewId}")
    @Operation(summary = "Delete review by id")
    public ApiResponse<Void> deleteReview(@PathVariable String reviewId) {
        reviewService.delete(reviewId);
        return ApiResponse.<Void>builder().message("Review deleted successfully").build();
    }

    @PatchMapping("/{reviewId}/status")
    @Operation(summary = "Update review status by id")
    public ApiResponse<ReviewResponse> updateReviewStatus(
            @PathVariable String reviewId,
            @RequestParam ReviewStatus status
    ) {
        reviewService.updateStatus(reviewId, status);
        return ApiResponse.<ReviewResponse>builder()
                .message("Review status updated successfully").build();
    }
}
