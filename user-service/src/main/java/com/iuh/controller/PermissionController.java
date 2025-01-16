package com.iuh.controller;

import com.iuh.dto.ApiResponse;
import com.iuh.dto.request.PermissionRequest;
import com.iuh.dto.response.PageResponse;
import com.iuh.dto.response.PermissionResponse;
import com.iuh.service.PermissionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Permission Controller")
@RestController
@RequestMapping("/permissions")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class PermissionController {
    PermissionService permissionService;

    @Operation(summary = "ADMIN: Create permission")
    @PostMapping("/add")
    ApiResponse<PermissionResponse> create(@RequestBody PermissionRequest request) {
        return ApiResponse.<PermissionResponse>builder()
                .message("Permission created successfully")
                .data(permissionService.save(request))
                .build();
    }

    @Operation(summary = "ADMIN: Get all permissions")
    @GetMapping
    ApiResponse<PageResponse<Object>> getAll(
            @Min(0) @RequestParam(defaultValue = "0", required = false) int pageNo,
            @Min(4) @RequestParam(defaultValue = "12", required = false) int pageSize,
            @RequestParam(defaultValue = "name:asc", required = false) String sortBy,
            @RequestParam(defaultValue = "", required = false) String search
    ) {
        return ApiResponse.<PageResponse<Object>>builder()
                .message("Get all permissions successfully")
                .data(permissionService.findAll(pageNo, pageSize, sortBy, search))
                .build();
    }

    @Operation(summary = "ADMIN: Get permission by name")
    @DeleteMapping("/{permission}")
    ApiResponse<Void> delete(@PathVariable String permission) {
        permissionService.delete(permission);
        return ApiResponse.<Void>builder()
                .message("Permission deleted successfully")
                .build();
    }
}
