package com.iuh.controller;

import com.iuh.dto.ApiResponse;
import com.iuh.dto.request.CategoryRequest;
import com.iuh.dto.response.CategoryResponse;
import com.iuh.dto.response.PageResponse;
import com.iuh.service.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Category Controller")
@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class CategoryController {
    CategoryService categoryService;

    @Operation(summary = "ADMIN: Create category")
    @PostMapping("/add")
    ApiResponse<CategoryResponse> create(@RequestBody CategoryRequest request) {
        return ApiResponse.<CategoryResponse>builder()
                .message("Category created successfully")
                .data(categoryService.save(request)).build();
    }

    @GetMapping("/slug/{slug}")
    @Operation(summary = "Get category by slug")
    ApiResponse<CategoryResponse> getCategoryBySlug(@PathVariable String slug) {
        return ApiResponse.<CategoryResponse>builder()
                .message("Get category by slug successfully")
                .data(categoryService.findBySlug(slug)).build();
    }

    @GetMapping("/list")
    @Operation(summary = "Get list categories")
    ApiResponse<PageResponse<Object>> getAll(
            @Min(0) @RequestParam(defaultValue = "0", required = false) int pageNo,
            @Min(4) @RequestParam(defaultValue = "12", required = false) int pageSize,
            @RequestParam(defaultValue = "createdAt:desc", required = false) String sortBy,
            @RequestParam(defaultValue = "", required = false) String search
    ) {
        return ApiResponse.<PageResponse<Object>>builder()
                .message("Get list categories successfully")
                .data(categoryService.findAll(pageNo, pageSize, sortBy, search)).build();
    }

    @GetMapping("/{categoryId}")
    @Operation(summary = "ADMIN: Get category by id")
    ApiResponse<CategoryResponse> getCategoryById(@PathVariable String categoryId) {
        return ApiResponse.<CategoryResponse>builder()
                .message("Get category successfully")
                .data(categoryService.findById(categoryId)).build();
    }

    @PutMapping("/{categoryId}")
    @Operation(summary = "ADMIN: Update category by id")
    ApiResponse<CategoryResponse> updateCategoryById(@PathVariable String categoryId,
                                                     @RequestBody CategoryRequest request) {
        return ApiResponse.<CategoryResponse>builder()
                .message("Update category successfully")
                .data(categoryService.update(categoryId, request)).build();
    }

    @DeleteMapping("/{categoryId}")
    @Operation(summary = "ADMIN: Delete category by id")
    ApiResponse<Void> deleteCategoryById(@PathVariable String categoryId) {
        categoryService.delete(categoryId);
        return ApiResponse.<Void>builder().message("Delete category successfully").build();
    }

}
