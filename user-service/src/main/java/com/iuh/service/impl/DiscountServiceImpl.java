package com.iuh.service.impl;

import com.iuh.dto.request.DiscountRequest;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class DiscountServiceImpl implements DiscountService {
    DiscountRepository discountRepository;
    DiscountMapper discountMapper;

    @Override
    public Discount save(DiscountRequest request) {
        Discount discount = discountRepository.findByCode(request.getCode())
                .orElseThrow(() -> new AppException(ErrorCode.DISCOUNT_CODE_EXISTED));
        return discountRepository.save(discount);
    }

    @Override
    public PageResponse<Object> findAll(int pageNo, int pageSize, String sortBy, String search) {
        Pageable pageable = PageUtil.getPageable(pageNo, pageSize, sortBy);

        Page<Discount> discounts = discountRepository.findAllBySearch(search, pageable);

        List<Discount> items = discounts.getContent();

        return PageUtil.getPageResponse(pageable, discounts, items);
    }

    @Override
    public Discount findById(String id) {
        return discountRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.DISCOUNT_NOT_FOUND));
    }

    @Override
    public Discount update(String id, DiscountRequest request) {
        Discount discount = findById(id);
        discountMapper.toUpdateEntity(discount, request);
        return discountRepository.save(discount);
    }

    @Override
    public void delete(String id) {
        discountRepository.deleteById(id);
    }
}
