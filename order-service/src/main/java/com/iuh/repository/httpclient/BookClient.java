package com.iuh.repository.httpclient;

import com.iuh.dto.ApiResponse;
import com.iuh.dto.response.BookResponseAdmin;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "book-service", url = "${app.product-service-url}")
public interface BookClient {
    @GetMapping(value = "/internal/books/{bookId}", produces = MediaType.APPLICATION_JSON_VALUE)
    ApiResponse<BookResponseAdmin> getBookDetails(@PathVariable String bookId);

    @PutMapping(value = "/internal/books/{bookId}/update-stock-sold", produces = MediaType.APPLICATION_JSON_VALUE)
    void updateBookStockAndSold(@PathVariable String bookId, @RequestParam int stock, @RequestParam int sold);
}
