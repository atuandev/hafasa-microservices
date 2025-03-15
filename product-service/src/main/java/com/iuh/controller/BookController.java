package com.iuh.controller;

import com.iuh.dto.ApiResponse;
import com.iuh.dto.request.BookCreationRequest;
import com.iuh.dto.request.BookUpdateRequest;
import com.iuh.dto.response.BookResponse;
import com.iuh.dto.response.BookResponseAdmin;
import com.iuh.dto.response.PageResponse;
import com.iuh.enums.BookStatus;
import com.iuh.service.BookService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Book Controller")
@RestController
@RequestMapping("/books")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class BookController {
    BookService bookService;

    @Operation(summary = "ADMIN: Create book")
    @PostMapping("/add")
    ApiResponse<BookResponseAdmin> createBook(@RequestBody @Valid BookCreationRequest request) {
        return ApiResponse.<BookResponseAdmin>builder()
                .message("Book created successfully")
                .data(bookService.save(request))
                .build();
    }

    @Operation(summary = "ADMIN: Get all books",
            description = "Get all books with pagination, sorting, filter(categorySlug) and search(title, author)")
    @GetMapping
    ApiResponse<PageResponse<Object>> getAllBooks(
            @Min(0) @RequestParam(defaultValue = "0", required = false) int pageNo,
            @Min(4) @RequestParam(defaultValue = "12", required = false) int pageSize,
            @RequestParam(defaultValue = "createdAt:desc", required = false) String sortBy,
            @RequestParam(required = false) String categorySlug,
            @RequestParam(defaultValue = "", required = false) String search
    ) {
        return ApiResponse.<PageResponse<Object>>builder()
                .message("Get list books successfully")
                .data(bookService.findAll(pageNo, pageSize, sortBy, categorySlug, search))
                .build();
    }

    @Operation(summary = "ADMIN: Get all books with specifications")
    @GetMapping("/specifications")
    ApiResponse<PageResponse<Object>> getAllBooksSpecifications(
            @Min(0) @RequestParam(defaultValue = "0", required = false) int pageNo,
            @Min(4) @RequestParam(defaultValue = "12", required = false) int pageSize,
            @RequestParam(defaultValue = "createdAt:desc", required = false) String sortBy,
            @RequestParam(required = false) String[] books
    ) {
        return ApiResponse.<PageResponse<Object>>builder()
                .message("Get list books successfully")
                .data(bookService.findAllSpecifications(pageNo, pageSize, sortBy, books))
                .build();
    }

    @Operation(summary = "Get all books with status ACTIVE",
            description = "Get all books with pagination, sorting, filter(categorySlug) and search(title, author) status true")
    @GetMapping("/list")
    ApiResponse<PageResponse<Object>> getAllBooksStatusTrue(
            @Min(0) @RequestParam(defaultValue = "0", required = false) int pageNo,
            @Min(4) @RequestParam(defaultValue = "12", required = false) int pageSize,
            @RequestParam(defaultValue = "createdAt:desc", required = false) String sortBy,
            @RequestParam(required = false) String categorySlug,
            @RequestParam(defaultValue = "", required = false) String search
    ) {
        return ApiResponse.<PageResponse<Object>>builder()
                .message("Get list books successfully")
                .data(bookService.findAllBooksStatusActive(pageNo, pageSize, sortBy, categorySlug, search))
                .build();
    }

    @Operation(summary = "Get all books with specifications status ACTIVE")
    @GetMapping("/list/specifications")
    ApiResponse<PageResponse<Object>> getAllBooksSpecificationsActive(
            @Min(0) @RequestParam(defaultValue = "0", required = false) int pageNo,
            @Min(4) @RequestParam(defaultValue = "12", required = false) int pageSize,
            @RequestParam(defaultValue = "createdAt:desc", required = false) String sortBy,
            @RequestParam(required = false) String[] books
    ) {
        return ApiResponse.<PageResponse<Object>>builder()
                .message("Get list books successfully")
                .data(bookService.findAllSpecificationsActive(pageNo, pageSize, sortBy, books)).build();
    }

    @Operation(summary = "ADMIN: Get book details by id")
    @GetMapping("/{bookId}")
    ApiResponse<BookResponseAdmin> getBookDetails(@PathVariable String bookId) {
        return ApiResponse.<BookResponseAdmin>builder()
                .message("Get book details successfully")
                .data(bookService.findById(bookId)).build();
    }

    @Operation(summary = "Get book details by slug")
    @GetMapping("/slug/{slug}")
    ApiResponse<BookResponse> getBookDetailsBySlug(@PathVariable String slug) {
        return ApiResponse.<BookResponse>builder()
                .message("Get book details successfully")
                .data(bookService.findBySlug(slug))
                .build();
    }

    @Operation(summary = "ADMIN: Update book")
    @PutMapping("/{bookId}")
    ApiResponse<BookResponseAdmin> updateBook(@PathVariable String bookId, @RequestBody @Valid BookUpdateRequest request) {
        return ApiResponse.<BookResponseAdmin>builder()
                .message("Book updated successfully")
                .data(bookService.update(bookId, request))
                .build();
    }

    @Operation(summary = "ADMIN: Delete book")
    @DeleteMapping("/{bookId}")
    ApiResponse<Void> deleteBook(@PathVariable String bookId) {
        bookService.delete(bookId);
        return ApiResponse.<Void>builder()
                .message("Book deleted successfully").build();
    }

    @Operation(summary = "ADMIN: Change book status")
    @PatchMapping("/{bookId}/status")
    ApiResponse<Void> changeBookStatus(@PathVariable String bookId, BookStatus status) {
        bookService.changeStatus(bookId, status);
        return ApiResponse.<Void>builder()
                .message("Book status changed successfully").build();
    }
}
