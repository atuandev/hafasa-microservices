package com.iuh.controller;

import com.iuh.dto.ApiResponse;
import com.iuh.dto.request.PublisherRequest;
import com.iuh.dto.response.PageResponse;
import com.iuh.entity.Publisher;
import com.iuh.service.PublisherService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Publisher Controller")
@RestController
@RequestMapping("/publishers")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class PublisherController {
    PublisherService publisherService;

    @Operation(summary = "ADMIN: Get list publishers", description = "Get list publishers with pagination, sort and search")
    @GetMapping
    public ApiResponse<PageResponse<Object>> findAll(
            @Min(0) @RequestParam(defaultValue = "0", required = false) int pageNo,
            @Min(4) @RequestParam(defaultValue = "12", required = false) int pageSize,
            @RequestParam(defaultValue = "createdAt:desc", required = false) String sortBy,
            @RequestParam(defaultValue = "", required = false) String search
    ) {
        return ApiResponse.<PageResponse<Object>>builder()
                .message("Get list publishers successfully")
                .data(publisherService.findAll(pageNo, pageSize, sortBy, search))
                .build();
    }

    @Operation(summary = "Get list publishers", description = "Get list publishers with pagination, sort and search")
    @GetMapping("/list")
    public ApiResponse<PageResponse<Object>> findAllStatusTrue(
            @Min(0) @RequestParam(defaultValue = "0", required = false) int pageNo,
            @Min(4) @RequestParam(defaultValue = "12", required = false) int pageSize,
            @RequestParam(defaultValue = "createdAt:desc", required = false) String sortBy,
            @RequestParam(defaultValue = "", required = false) String search
    ) {
        return ApiResponse.<PageResponse<Object>>builder()
                .message("Get list publishers successfully")
                .data(publisherService.findAllStatusTrue(pageNo, pageSize, sortBy, search))
                .build();
    }

    @Operation(summary = "ADMIN: Get publisher by id")
    @GetMapping("/{publisherId}")
    public ApiResponse<Publisher> findById(@PathVariable String publisherId) {
        return ApiResponse.<Publisher>builder()
                .message("Get publisher successfully")
                .data(publisherService.findById(publisherId))
                .build();
    }

    @Operation(summary = "Get publisher by slug")
    @GetMapping("/slug/{slug}")
    public ApiResponse<Publisher> findBySlug(@PathVariable String slug) {
        return ApiResponse.<Publisher>builder()
                .message("Get publisher by slug successfully")
                .data(publisherService.findBySlug(slug))
                .build();
    }

    @Operation(summary = "ADMIN: Create publisher")
    @PostMapping("/add")
    public ApiResponse<Publisher> addPublisher(@RequestBody PublisherRequest request) {
        return ApiResponse.<Publisher>builder()
                .message("Publisher created successfully")
                .data(publisherService.save(request))
                .build();
    }

    @Operation(summary = "ADMIN: Update publisher by id")
    @PutMapping("/{publisherId}")
    public ApiResponse<Publisher> updatePublisher(@PathVariable String publisherId, @RequestBody PublisherRequest request) {
        return ApiResponse.<Publisher>builder()
                .message("Publisher updated successfully")
                .data(publisherService.update(publisherId, request))
                .build();
    }

    @Operation(summary = "ADMIN: Delete publisher by id")
    @DeleteMapping("/{publisherId}")
    public ApiResponse<Void> deletePublisher(@PathVariable String publisherId) {
        publisherService.delete(publisherId);
        return ApiResponse.<Void>builder()
                .message("Publisher deleted successfully")
                .build();
    }

    @Operation(summary = "ADMIN: Update publisher status by id")
    @PatchMapping("/{publisherId}/status")
    public ApiResponse<Publisher> updateStatus(@PathVariable String publisherId, Boolean status) {
        publisherService.updateStatus(publisherId, status);
        return ApiResponse.<Publisher>builder()
                .message("Publisher status updated successfully")
                .build();
    }
}
