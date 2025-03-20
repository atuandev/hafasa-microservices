package com.iuh.controller;

import com.iuh.dto.ApiResponse;
import com.iuh.dto.response.BookResponseAdmin;
import com.iuh.service.BookService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class InternalBookController {
    BookService bookService;

    @GetMapping("/internal/{bookId}")
    ApiResponse<BookResponseAdmin> getBookDetails(@PathVariable String bookId) {
        return ApiResponse.<BookResponseAdmin>builder()
                .message("Get book details successfully")
                .data(bookService.findById(bookId))
                .build();
    }

    @PutMapping("/internal/{bookId}/update-stock-sold")
    void updateBookStockAndSold(@PathVariable String bookId, @RequestParam int stock, @RequestParam int sold) {
        bookService.updateStockAndSold(bookId, stock, sold);
    }
}
