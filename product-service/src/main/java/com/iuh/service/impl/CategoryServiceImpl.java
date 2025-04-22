package com.iuh.service.impl;

import com.iuh.dto.request.CategoryRequest;
import com.iuh.dto.response.CategoryResponse;
import com.iuh.dto.response.PageResponse;
import com.iuh.entity.Category;
import com.iuh.exception.AppException;
import com.iuh.exception.ErrorCode;
import com.iuh.mapper.CategoryMapper;
import com.iuh.repository.CategoryRepository;
import com.iuh.service.CategoryService;
import com.iuh.util.PageUtil;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class CategoryServiceImpl implements CategoryService {
    CategoryRepository categoryRepository;
    CategoryMapper categoryMapper;

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public CategoryResponse save(CategoryRequest request) {
        log.info("Saving new category with name: {}", request.getName());
        try {
            CategoryResponse response = categoryMapper.toResponse(categoryRepository.save(categoryMapper.toEntity(request)));
            log.info("Category saved successfully: name={}",  response.getName());
            return response;
        } catch (Exception e) {
            log.error("Error occurred while saving category: {}", e.getMessage(), e);
            throw e;
        }
    }

    @Override
    public PageResponse<Object> findAll(int pageNo, int pageSize, String sortBy, String search) {
        log.info("Fetching categories with filters: pageNo={}, pageSize={}, sortBy={}, search={}", pageNo, pageSize, sortBy, search);
        try {
            Pageable pageable = PageUtil.getPageable(pageNo, pageSize, sortBy);
            Page<Category> categories = categoryRepository.findAllByNameContainingIgnoreCase(search, pageable);
            List<CategoryResponse> items = categories.map(categoryMapper::toResponse).getContent();
            log.info("Fetched {} categories", items.size());
            return PageUtil.getPageResponse(pageable, categories, items);
        } catch (Exception e) {
            log.error("Error occurred while fetching categories: {}", e.getMessage(), e);
            throw e;
        }
    }

    @Override
    public CategoryResponse findBySlug(String slug) {
        log.info("Fetching category with slug: {}", slug);
        try {
            Category category = categoryRepository.findBySlug(slug)
                    .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));
            log.info("Category found: id={}, name={}", category.getId(), category.getName());
            return categoryMapper.toResponse(category);
        } catch (Exception e) {
            log.error("Error occurred while fetching category with slug '{}': {}", slug, e.getMessage(), e);
            throw e;
        }
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public CategoryResponse findById(String id) {
        log.info("Fetching category by id: {}", id);
        try {
            Category category = getCategoryById(id);
            log.info("Category found: id={}, name={}", category.getId(), category.getName());
            return categoryMapper.toResponse(category);
        } catch (Exception e) {
            log.error("Error occurred while fetching category by id '{}': {}", id, e.getMessage(), e);
            throw e;
        }
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public CategoryResponse update(String id, CategoryRequest request) {
        log.info("Updating category with id: {}, new name: {}", id, request.getName());
        try {
            Category category = getCategoryById(id);
            categoryMapper.toUpdateEntity(category, request);
            Category updatedCategory = categoryRepository.save(category);
            log.info("Category updated successfully: id={}, name={}", updatedCategory.getId(), updatedCategory.getName());
            return categoryMapper.toResponse(updatedCategory);
        } catch (Exception e) {
            log.error("Error occurred while updating category with id '{}': {}", id, e.getMessage(), e);
            throw e;
        }
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(String id) {
        log.info("Deleting category with id: {}", id);
        try {
            Category category = getCategoryById(id);
            categoryRepository.deleteById(category.getId());
            log.info("Category deleted successfully: id={}", id);
        } catch (Exception e) {
            log.error("Error occurred while deleting category with id '{}': {}", id, e.getMessage(), e);
            throw e;
        }
    }

    private Category getCategoryById(String id) {
        log.debug("Fetching category with id: {}", id);
        return categoryRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));
    }
}