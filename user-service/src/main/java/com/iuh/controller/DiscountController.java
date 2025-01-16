package com.iuh.controller;

import com.iuh.dto.ApiResponse;
import com.iuh.dto.request.DiscountRequest;
import com.iuh.dto.response.PageResponse;
import com.iuh.entity.Discount;
import com.iuh.service.DiscountService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Discount Controller")
@RestController
@RequestMapping("/discounts")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
@Slf4j
public class DiscountController {
    DiscountService discountService;

    @Operation(summary = "ADMIN: Create discount")
    @PostMapping("/add")
    public ApiResponse<Discount> save(@RequestBody @Valid DiscountRequest request) {
        return ApiResponse.<Discount>builder()
                .message("Discount created successfully")
                .data(discountService.save(request))
                .build();
    }

    @Operation(summary = "ADMIN: Get all discounts")
    @GetMapping
    public ApiResponse<PageResponse<Object>> findAll(
            @Min(0) @RequestParam(defaultValue = "0", required = false) int pageNo,
            @Min(4) @RequestParam(defaultValue = "12", required = false) int pageSize,
            @RequestParam(defaultValue = "createdAt:desc", required = false) String sortBy,
            @RequestParam(defaultValue = "", required = false) String search
    ) {
        return ApiResponse.<PageResponse<Object>>builder()
                .message("Get list discounts successfully")
                .data(discountService.findAll(pageNo, pageSize, sortBy, search))
                .build();
    }

    @Operation(summary = "ADMIN: Get discount by id")
    @GetMapping("/{discountId}")
    public ApiResponse<Discount> findById(@PathVariable String discountId) {
        return ApiResponse.<Discount>builder()
                .message("Get discount successfully")
                .data(discountService.findById(discountId))
                .build();
    }

    @Operation(summary = "ADMIN: Update discount")
    @PutMapping("/{discountId}")
    public ApiResponse<Discount> updatePublisher(
            @PathVariable String discountId,
            @RequestBody @Valid DiscountRequest request
    ) {
        return ApiResponse.<Discount>builder()
                .message("Discount updated successfully")
                .data(discountService.update(discountId, request))
                .build();
    }

    @Operation(summary = "ADMIN: Delete discount")
    @DeleteMapping("/{discountId}")
    public ApiResponse<Void> deletePublisher(@PathVariable String discountId) {
        discountService.delete(discountId);
        return ApiResponse.<Void>builder()
                .message("Discount deleted successfully")
                .build();
    }
}
