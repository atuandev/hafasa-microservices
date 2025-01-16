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
import com.iuh.repository.UserRepository;
import com.iuh.service.ReviewService;
import com.iuh.util.PageUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class ReviewServiceImpl implements ReviewService {
    ReviewRepository reviewRepository;
    ReviewMapper reviewMapper;
    UserRepository userRepository;
    BookRepository bookRepository;

    @Override
    @Transactional
    public ReviewResponse save(ReviewCreationRequest request) {
        Review review = reviewMapper.toEntity(request);

        review.setUser(userRepository.findById(request.getUserId())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND)));

        Book book = bookRepository.findById(request.getBookId())
                .orElseThrow(() -> new AppException(ErrorCode.BOOK_NOT_FOUND));
        // Increase review count of book and update review star
        book.setReviewCount(book.getReviewCount() + 1);
        book.setReviewStar((book.getReviewStar() * (book.getReviewCount() - 1) + request.getRating()) / book.getReviewCount());
        review.setBook(book);

        return reviewMapper.toResponse(reviewRepository.save(review));
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public PageResponse<Object> findAll(int pageNo, int pageSize, String sortBy, String search, ReviewStatus status) {
        Pageable pageable = PageUtil.getPageable(pageNo, pageSize, sortBy);

        Page<Review> reviews = reviewRepository.findAllWithSearch(search, search, search, search, status, pageable);

        List<ReviewResponse> items = reviews.map(reviewMapper::toResponse).getContent();

        return PageUtil.getPageResponse(pageable, reviews, items);
    }

    @Override
    public PageResponse<Object> findAllByBookId(String bookId, int pageNo, int pageSize, String sortBy, int rating) {
        Pageable pageable = PageUtil.getPageable(pageNo, pageSize, sortBy);

        Page<Review> reviews;
        if (rating == 0) {
            reviews = reviewRepository.findAllByBookId(bookId, pageable);
        } else {
            reviews = reviewRepository.findAllByBookIdAndRating(bookId, rating, pageable);
        }

        List<ReviewResponse> items = reviews.map(reviewMapper::toResponse).getContent();

        return PageUtil.getPageResponse(pageable, reviews, items);
    }

    @Override
    public PageResponse<Object> findAllByUserId(String userId, int pageNo, int pageSize, String sortBy) {
        Pageable pageable = PageUtil.getPageable(pageNo, pageSize, sortBy);

        Page<Review> reviews = reviewRepository.findAllWithSearchByUserId(userId, pageable);

        List<ReviewResponse> items = reviews.map(reviewMapper::toResponse).getContent();

        return PageUtil.getPageResponse(pageable, reviews, items);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public ReviewResponse findById(String reviewId) {
        Review review = getReviewById(reviewId);
        return reviewMapper.toResponse(review);
    }

    @Override
    public ReviewResponse update(String reviewId, ReviewUpdateRequest request) {
        Review review = getReviewById(reviewId);
        reviewMapper.toUpdateEntity(review, request);
        return reviewMapper.toResponse(reviewRepository.save(review));
    }

    @Override
    public void delete(String reviewId) {
        // Decrease review count of book
        Book book = getReviewById(reviewId).getBook();
        book.setReviewCount(book.getReviewCount() - 1);
        book.setReviewStar((book.getReviewStar() * (book.getReviewCount() + 1) - book.getReviewStar()) / book.getReviewCount());

        reviewRepository.deleteById(reviewId);
    }

    @Override
    public void updateStatus(String reviewId, ReviewStatus status) {
        Review review = getReviewById(reviewId);
        review.setStatus(status);
        reviewRepository.save(review);
    }

    private Review getReviewById(String reviewId) {
        return reviewRepository.findById(reviewId).orElseThrow(() -> new AppException(ErrorCode.REVIEW_NOT_FOUND));
    }
}
