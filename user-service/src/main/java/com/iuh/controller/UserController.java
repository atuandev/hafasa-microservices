package com.iuh.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.iuh.dto.ApiResponse;
import com.iuh.dto.request.UserCreationRequest;
import com.iuh.dto.request.UserUpdateAvatarRequest;
import com.iuh.dto.request.UserUpdatePasswordRequest;
import com.iuh.dto.request.UserUpdateRequest;
import com.iuh.dto.response.PageResponse;
import com.iuh.dto.response.UserResponse;
import com.iuh.enums.UserStatus;
import com.iuh.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

@Tag(name = "User Controller")
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class UserController {
    UserService userService;

    @Operation(summary = "Register new user")
    @PostMapping("/add")
    ApiResponse<UserResponse> createUser(@RequestBody @Valid UserCreationRequest request) {
        return ApiResponse.<UserResponse>builder()
                .message("User created successfully")
                .data(userService.save(request)).build();
    }

    @Operation(summary = "ADMIN: Get all users",
            description = "Get all books with pagination, sorting, and search")
    @GetMapping()
    ApiResponse<PageResponse<Object>> getAllUsersWithSortByAndSearch(
            @RequestParam(defaultValue = "0", required = false) @Min(0) int pageNo,
            @RequestParam(defaultValue = "12", required = false) @Min(4) int pageSize,
            @RequestParam(defaultValue = "createdAt:desc", required = false) String sortBy,
            @RequestParam(defaultValue = "", required = false) String search
    ) {
        return ApiResponse.<PageResponse<Object>>builder()
                .message("Get list users successfully")
                .data(userService.findAll(pageNo, pageSize, sortBy, search)).build();
    }

    @Operation(summary = "ADMIN: Get all users with specifications",
            description = "Get all books with pagination, sorting, and search")
    @GetMapping("/specifications")
    ApiResponse<PageResponse<Object>> getAllUsersWithSpecifications(
            @RequestParam(defaultValue = "0", required = false) @Min(0) int pageNo,
            @RequestParam(defaultValue = "12", required = false) @Min(4) int pageSize,
            @RequestParam(defaultValue = "createdAt:desc", required = false) String sortBy,
            @RequestParam(required = false) String[] users
    ) {
        return ApiResponse.<PageResponse<Object>>builder()
                .message("Get list users successfully")
                .data(userService.findAllWithSpecifications(pageNo, pageSize, sortBy, users)).build();
    }

    @Operation(summary = "ADMIN: Get user details")
    @GetMapping("/{userId}")
    ApiResponse<UserResponse> getUser(@PathVariable String userId) {
        return ApiResponse.<UserResponse>builder()
                .message("Get user details successfully")
                .data(userService.findById(userId)).build();
    }

    @Operation(summary = "Get user info")
    @GetMapping("/me")
    ApiResponse<UserResponse> getMyInfo() throws JsonProcessingException {
        return ApiResponse.<UserResponse>builder()
                .message("Get user info successfully")
                .data(userService.getMyInfo()).build();
    }

    @Operation(summary = "Update user")
    @PutMapping("/{userId}")
    ApiResponse<UserResponse> updateUser(
            @PathVariable String userId, @RequestBody @Valid UserUpdateRequest request) throws JsonProcessingException {
        return ApiResponse.<UserResponse>builder()
                .message("User updated successfully")
                .data(userService.update(userId, request)).build();
    }

    @Operation(summary = "ADMIN: Delete user")
    @DeleteMapping("/{userId}")
    ApiResponse<Void> deleteUser(@PathVariable String userId) {
        userService.delete(userId);
        return ApiResponse.<Void>builder().message("User deleted successfully").build();
    }

    @SneakyThrows
    @Operation(summary = "ADMIN: Update user status")
    @PatchMapping("/{userId}/status")
    ApiResponse<Void> updateUserStatus(@PathVariable String userId,
                                       @RequestParam UserStatus status) {
        userService.updateStatus(userId, status);
        return ApiResponse.<Void>builder().message("User status updated successfully").build();
    }

    @SneakyThrows
    @Operation(summary = "Update user password")
    @PatchMapping("/{userId}/update-password")
    ApiResponse<Void> updatePassword(@PathVariable String userId,
                                     @RequestBody @Valid UserUpdatePasswordRequest request) {
        userService.updatePassword(userId, request);
        return ApiResponse.<Void>builder().message("Password updated successfully").build();
    }

    @SneakyThrows
    @Operation(summary = "Update avatar")
    @PatchMapping("/{userId}/update-avatar")
    ApiResponse<Void> updateAvatar(@PathVariable String userId,
                                   @RequestBody @Valid UserUpdateAvatarRequest request) {
        userService.updateAvatar(userId, request);
        return ApiResponse.<Void>builder().message("Avatar updated successfully").build();
    }

}
