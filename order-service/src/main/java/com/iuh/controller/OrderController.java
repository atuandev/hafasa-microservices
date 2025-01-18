package com.iuh.controller;

import com.iuh.dto.ApiResponse;
import com.iuh.dto.request.OrderCreationRequest;
import com.iuh.dto.response.OrderResponse;
import com.iuh.dto.response.PageResponse;
import com.iuh.enums.OrderStatus;
import com.iuh.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Order Controller")
@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class OrderController {
    OrderService orderService;

    @Operation(summary = "Create a new order")
    @PostMapping
    public ApiResponse<OrderResponse> create(@Valid @RequestBody OrderCreationRequest request) {
        return ApiResponse.<OrderResponse>builder()
                .message("Order created successfully")
                .data(orderService.save(request))
                .build();
    }

    @Operation(summary = "Get an order by id")
    @GetMapping("/{id}")
    public ApiResponse<OrderResponse> getById(@PathVariable String id) {
        return ApiResponse.<OrderResponse>builder()
                .message("Get order successfully")
                .data(orderService.findById(id))
                .build();
    }

    @Operation(
            summary = "Get all orders",
            description = "Get all orders with pagination(pageNo, pageSize) and sortBy(field:direction)")
    @GetMapping("/list")
    public ApiResponse<PageResponse<Object>> getAllOrders(
            @Min(0) @RequestParam(defaultValue = "0", required = false) int pageNo,
            @Min(4) @RequestParam(defaultValue = "12", required = false) int pageSize,
            @RequestParam(defaultValue = "createdAt:desc", required = false) String sortBy) {
        return ApiResponse.<PageResponse<Object>>builder()
                .message("Get list orders successfully")
                .data(orderService.findAllOrders(pageNo, pageSize, sortBy))
                .build();
    }

    @Operation(
            summary = "Get all orders of a user",
            description = "Get all orders with pagination(pageNo, pageSize) and sortBy(field:direction)")
    @GetMapping("/list/user/{userId}")
    public ApiResponse<PageResponse<Object>> getAllUserOrders(
            @PathVariable String userId,
            @Min(0) @RequestParam(defaultValue = "0", required = false) int pageNo,
            @Min(4) @RequestParam(defaultValue = "12", required = false) int pageSize,
            @RequestParam(defaultValue = "createdAt:desc", required = false) String sortBy) {
        return ApiResponse.<PageResponse<Object>>builder()
                .message("Get list orders successfully")
                .data(orderService.findAllByUserId(userId, pageNo, pageSize, sortBy))
                .build();
    }

    @Operation(summary = "Change order status")
    @PatchMapping("/{id}/status")
    public ApiResponse<Void> changeStatus(@PathVariable String id, @RequestParam OrderStatus status) {
        orderService.changeStatus(id, status);
        return ApiResponse.<Void>builder()
                .message("Order status changed successfully")
                .build();
    }
}
