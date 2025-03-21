package com.iuh.repository.httpclient;

import com.iuh.configuration.AuthenticationRequestInterceptor;
import com.iuh.dto.ApiResponse;
import com.iuh.dto.request.BookUpdateStockRequest;
import com.iuh.dto.response.BookResponseAdmin;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@FeignClient(
        name = "book-service",
        url = "${app.product-service-url}",
        configuration = AuthenticationRequestInterceptor.class
)
public interface BookClient {
    @PostMapping("/internal/books/batch-update")
    ApiResponse<List<BookResponseAdmin>> updateBooks(@RequestBody List<BookUpdateStockRequest> requests);
}
