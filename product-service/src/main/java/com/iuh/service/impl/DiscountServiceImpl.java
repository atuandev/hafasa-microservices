package com.iuh.service.impl;

import com.iuh.dto.request.DiscountRequest;
import com.iuh.dto.response.DiscountResponse;
import com.iuh.dto.response.PageResponse;
import com.iuh.entity.Discount;
import com.iuh.exception.AppException;
import com.iuh.exception.ErrorCode;
import com.iuh.mapper.DiscountMapper;
import com.iuh.repository.DiscountRepository;
import com.iuh.service.DiscountService;
import com.iuh.util.PageUtil;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class DiscountServiceImpl implements DiscountService {
    DiscountRepository discountRepository;
    DiscountMapper discountMapper;

    @Override
    public DiscountResponse save(DiscountRequest request) {
        log.info("Saving new discount with name: {}", request.getName());
        try {
            Discount discount = discountMapper.toEntity(request);
            DiscountResponse response = discountMapper.toResponse(discountRepository.save(discount));
            log.info("Discount saved successfully: id={}, name={}", response.getId(), response.getName());
            return response;
        } catch (Exception e) {
            log.error("Error occurred while saving discount: {}", e.getMessage(), e);
            throw e;
        }
    }

    @Override
    public PageResponse<Object> findAll(int pageNo, int pageSize, String sortBy, String search) {
        log.info("Fetching discounts with filters: pageNo={}, pageSize={}, sortBy={}, search={}", pageNo, pageSize, sortBy, search);
        try {
            Pageable pageable = PageUtil.getPageable(pageNo, pageSize, sortBy);
            Page<Discount> discounts = discountRepository.findAllBySearch(search, pageable);
            List<DiscountResponse> items = discounts.map(discountMapper::toResponse).getContent();
            log.info("Fetched {} discounts", items.size());
            return PageUtil.getPageResponse(pageable, discounts, items);
        } catch (Exception e) {
            log.error("Error occurred while fetching discounts: {}", e.getMessage(), e);
            throw e;
        }
    }

    @Override
    public DiscountResponse getById(String id) {
        log.info("Fetching discount by id: {}", id);
        try {
            return discountRepository.findById(id)
                    .map(discountMapper::toResponse)
                    .orElseThrow(() -> new AppException(ErrorCode.DISCOUNT_NOT_FOUND));
        } catch (Exception e) {
            log.error("Error occurred while fetching discount with id '{}': {}", id, e.getMessage(), e);
            throw e;
        }
    }

    @Override
    public DiscountResponse update(String id, DiscountRequest request) {
        log.info("Updating discount with id: {}, new name: {}", id, request.getName());
        try {
            Discount discount = discountRepository.findById(id)
                    .orElseThrow(() -> new AppException(ErrorCode.DISCOUNT_NOT_FOUND));

            discountMapper.toUpdateEntity(discount, request);
            Discount updatedDiscount = discountRepository.save(discount);
            log.info("Discount updated successfully: id={}, name={}", updatedDiscount.getId(), updatedDiscount.getName());
            return discountMapper.toResponse(updatedDiscount);
        } catch (Exception e) {
            log.error("Error occurred while updating discount with id '{}': {}", id, e.getMessage(), e);
            throw e;
        }
    }

    @Override
    public void delete(String id) {
        log.info("Deleting discount with id: {}", id);
        try {
            discountRepository.deleteById(id);
            log.info("Discount deleted successfully: id={}", id);
        } catch (Exception e) {
            log.error("Error occurred while deleting discount with id '{}': {}", id, e.getMessage(), e);
            throw e;
        }
    }
}

