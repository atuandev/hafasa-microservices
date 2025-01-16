package com.iuh.controller;

import com.iuh.dto.ApiResponse;
import com.iuh.dto.request.RoleRequest;
import com.iuh.dto.response.PageResponse;
import com.iuh.dto.response.RoleResponse;
import com.iuh.service.RoleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Role Controller")
@RestController
@RequestMapping("/roles")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class RoleController {
    RoleService roleService;

    @Operation(summary = "ADMIN: Create role")
    @PostMapping("/add")
    ApiResponse<RoleResponse> create(@RequestBody RoleRequest request) {
        return ApiResponse.<RoleResponse>builder()
                .message("Create role successfully")
                .data(roleService.save(request)).build();
    }

    @Operation(summary = "ADMIN: Get all roles")
    @GetMapping
    ApiResponse<PageResponse<Object>> getAll(
            @RequestParam(defaultValue = "0", required = false) @Min(0) int pageNo,
            @RequestParam(defaultValue = "12", required = false) @Min(4) int pageSize,
            @RequestParam(defaultValue = "name:asc", required = false) String sortBy,
            @RequestParam(defaultValue = "", required = false) String search
    ) {
        return ApiResponse.<PageResponse<Object>>builder()
                .message("Get all roles successfully")
                .data(roleService.findAll(pageNo, pageSize, sortBy, search)).build();
    }

    @Operation(summary = "ADMIN: Delete role by id")
    @DeleteMapping("/{roleId}")
    ApiResponse<Void> delete(@PathVariable String roleId) {
        roleService.delete(roleId);
        return ApiResponse.<Void>builder().message("Delete role successfully").build();
    }
}
