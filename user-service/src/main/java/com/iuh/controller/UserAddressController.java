package com.iuh.controller;

import com.iuh.dto.ApiResponse;
import com.iuh.dto.request.UserAddressRequest;
import com.iuh.dto.response.PageResponse;
import com.iuh.dto.response.UserAddressResponse;
import com.iuh.service.UserAddressService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

@Tag(name = "User Address Controller")
@RestController
@RequestMapping("/addresses")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class UserAddressController {
    UserAddressService userAddressService;

    @Operation(summary = "Create user address")
    @PostMapping("/add")
    ApiResponse<UserAddressResponse> createUserAddress(@RequestBody @Valid UserAddressRequest request) {
        return ApiResponse.<UserAddressResponse>builder()
                .message("User address created successfully")
                .data(userAddressService.save(request)).build();
    }

    @Operation(summary = "ADMIN: Get all user addresses")
    @GetMapping
    ApiResponse<PageResponse<Object>> getAllUserAddresses(
            @RequestParam(defaultValue = "0", required = false) @Min(0) int pageNo,
            @RequestParam(defaultValue = "12", required = false) @Min(4) int pageSize,
            @RequestParam(defaultValue = "createdAt:desc", required = false) String sortBy,
            @RequestParam(defaultValue = "", required = false) String search
    ) {
        return ApiResponse.<PageResponse<Object>>builder()
                .message("Get all user addresses")
                .data(userAddressService.findAll(pageNo, pageSize, sortBy, search)).build();
    }

    @Operation(summary = "ADMIN: Get all user addresses")
    @GetMapping("/user/{userId}")
    ApiResponse<PageResponse<Object>> getAllByUserId(
            @PathVariable String userId,
            @RequestParam(defaultValue = "0", required = false) @Min(0) int pageNo,
            @RequestParam(defaultValue = "12", required = false) @Min(4) int pageSize,
            @RequestParam(defaultValue = "createdAt:desc", required = false) String sortBy,
            @RequestParam(defaultValue = "", required = false) String search
    ) {
        return ApiResponse.<PageResponse<Object>>builder()
                .message("Get all user addresses")
                .data(userAddressService.findAllByUserId(userId, pageNo, pageSize, sortBy, search)).build();
    }

    @Operation(summary = "Get user address details")
    @GetMapping("/{addressId}")
    ApiResponse<UserAddressResponse> getUserAddressDetails(@PathVariable String addressId) {
        return ApiResponse.<UserAddressResponse>builder()
                .message("Get user addresses details")
                .data(userAddressService.findById(addressId)).build();
    }

    @Operation(summary = "Update user address")
    @PutMapping("/{addressId}")
    ApiResponse<UserAddressResponse> updateUserAddress(
            @PathVariable String addressId,
            @RequestBody @Valid UserAddressRequest request
    ) {
        return ApiResponse.<UserAddressResponse>builder()
                .message("User address updated successfully")
                .data(userAddressService.update(addressId, request)).build();
    }

    @Operation(summary = "Delete user address")
    @DeleteMapping("/{addressId}")
    ApiResponse<Void> deleteUserAddress(@PathVariable String addressId) {
        userAddressService.delete(addressId);
        return ApiResponse.<Void>builder()
                .message("User address deleted successfully").build();
    }
}
