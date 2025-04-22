package com.iuh.service.impl;

import com.iuh.dto.request.ReviewCreationRequest;
import com.iuh.dto.request.ReviewUpdateRequest;
import com.iuh.dto.response.PageResponse;
import com.iuh.dto.response.ReviewResponse;
import com.iuh.entity.Book;
import com.iuh.entity.Review;
import com.iuh.enums.ReviewStatus;
import com.iuh.exception.AppException;
import com.iuh.exception.ErrorCode;
import com.iuh.mapper.ReviewMapper;
import com.iuh.repository.BookRepository;
import com.iuh.repository.ReviewRepository;
import com.iuh.service.ReviewService;
import com.iuh.util.PageUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;
@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class ReviewServiceImpl implements ReviewService {
    ReviewRepository reviewRepository;
    ReviewMapper reviewMapper;
    BookRepository bookRepository;

    @Override
    @Transactional
    public ReviewResponse save(ReviewCreationRequest request) {
        log.debug("Saving review for user: {}, book: {}, rating: {}", request.getUserId(), request.getBookId(), request.getRating());

        // Convert request to entity
        Review review = reviewMapper.toEntity(request);
        review.setUserId(request.getUserId());

        // Get book and update review count and star rating
        Book book = bookRepository.findById(request.getBookId())
                .orElseThrow(() -> {
                    log.debug("Book not found with ID: {}", request.getBookId());
                    return new AppException(ErrorCode.BOOK_NOT_FOUND);
                });
        book.setReviewCount(book.getReviewCount() + 1);
        book.setReviewStar((book.getReviewStar() * (book.getReviewCount() - 1) + request.getRating()) / book.getReviewCount());
        review.setBook(book);

        // Save review
        Review savedReview = reviewRepository.save(review);
        log.debug("Review saved with ID: {}", savedReview.getId());

        return reviewMapper.toResponse(savedReview);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public PageResponse<Object> findAll(int pageNo, int pageSize, String sortBy, String search, ReviewStatus status) {
        log.debug("Fetching all reviews with search: '{}', pageNo: {}, pageSize: {}, sortBy: {}, status: {}",
                search, pageNo, pageSize, sortBy, status);

        Pageable pageable = PageUtil.getPageable(pageNo, pageSize, sortBy);
        Page<Review> reviews = reviewRepository.findAllWithSearch(search, search, search, search, status, pageable);

        List<ReviewResponse> items = reviews.map(reviewMapper::toResponse).getContent();
        log.debug("Fetched {} reviews", items.size());

        return PageUtil.getPageResponse(pageable, reviews, items);
    }

    @Override
    public PageResponse<Object> findAllByBookId(String bookId, int pageNo, int pageSize, String sortBy, int rating) {
        log.debug("Fetching reviews for book with ID: {}, rating: {}, pageNo: {}, pageSize: {}, sortBy: {}",
                bookId, rating, pageNo, pageSize, sortBy);

        Pageable pageable = PageUtil.getPageable(pageNo, pageSize, sortBy);
        Page<Review> reviews;
        if (rating == 0) {
            reviews = reviewRepository.findAllByBookId(bookId, pageable);
        } else {
            reviews = reviewRepository.findAllByBookIdAndRating(bookId, rating, pageable);
        }

        List<ReviewResponse> items = reviews.map(reviewMapper::toResponse).getContent();
        log.debug("Fetched {} reviews for book ID: {}", items.size(), bookId);

        return PageUtil.getPageResponse(pageable, reviews, items);
    }

    @Override
    public PageResponse<Object> findAllByUserId(String userId, int pageNo, int pageSize, String sortBy) {
        log.debug("Fetching reviews for user with ID: {}, pageNo: {}, pageSize: {}, sortBy: {}",
                userId, pageNo, pageSize, sortBy);

        Pageable pageable = PageUtil.getPageable(pageNo, pageSize, sortBy);
        Page<Review> reviews = reviewRepository.findAllWithSearchByUserId(userId, pageable);

        List<ReviewResponse> items = reviews.map(reviewMapper::toResponse).getContent();
        log.debug("Fetched {} reviews for user ID: {}", items.size(), userId);

        return PageUtil.getPageResponse(pageable, reviews, items);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public ReviewResponse findById(String reviewId) {
        log.debug("Fetching review with ID: {}", reviewId);

        Review review = getReviewById(reviewId);
        log.debug("Found review with ID: {}", reviewId);

        return reviewMapper.toResponse(review);
    }

    @Override
    public ReviewResponse update(String reviewId, ReviewUpdateRequest request) {
        log.debug("Updating review with ID: {}", reviewId);

        Review review = getReviewById(reviewId);
        reviewMapper.toUpdateEntity(review, request);

        Review updatedReview = reviewRepository.save(review);
        log.debug("Review with ID: {} updated successfully", reviewId);

        return reviewMapper.toResponse(updatedReview);
    }

    @Override
    public void delete(String reviewId) {
        log.debug("Deleting review with ID: {}", reviewId);

        // Decrease review count and update star rating for the associated book
        Book book = getReviewById(reviewId).getBook();
        book.setReviewCount(book.getReviewCount() - 1);
        if (book.getReviewCount() > 0) {
            book.setReviewStar((book.getReviewStar() * (book.getReviewCount() + 1) - book.getReviewStar()) / book.getReviewCount());
        }

        reviewRepository.deleteById(reviewId);
        log.debug("Review with ID: {} deleted successfully", reviewId);
    }

    @Override
    public void updateStatus(String reviewId, ReviewStatus status) {
        log.debug("Updating status of review with ID: {} to {}", reviewId, status);

        Review review = getReviewById(reviewId);
        review.setStatus(status);
        reviewRepository.save(review);

        log.debug("Status of review with ID: {} updated to {}", reviewId, status);
    }

    private Review getReviewById(String reviewId) {
        return reviewRepository.findById(reviewId).orElseThrow(() -> {
            log.debug("Review not found with ID: {}", reviewId);
            return new AppException(ErrorCode.REVIEW_NOT_FOUND);
        });
    }
}
