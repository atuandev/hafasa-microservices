package com.iuh.controller;

import com.iuh.dto.ApiResponse;
import com.iuh.dto.request.BookUpdateStockRequest;
import com.iuh.dto.response.BookResponseAdmin;
import com.iuh.service.BookService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class InternalBookController {
    BookService bookService;

    @PostMapping("/internal/books/batch-update")
    ApiResponse<List<BookResponseAdmin>> getAndUpdateBooks(@RequestBody List<BookUpdateStockRequest> requests) {
        return ApiResponse.<List<BookResponseAdmin>>builder()
                .message("Update books successfully")
                .data(bookService.getAndUpdateBooks(requests))
                .build();
    }
}
