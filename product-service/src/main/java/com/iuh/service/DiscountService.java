package com.iuh.service;

import com.iuh.dto.request.DiscountRequest;
import com.iuh.dto.response.DiscountResponse;
import com.iuh.dto.response.PageResponse;
import com.iuh.entity.Discount;

public interface DiscountService {
    DiscountResponse save(DiscountRequest request);

    PageResponse<Object> findAll(int pageNo, int pageSize, String sortBy, String search);

    DiscountResponse getById(String id);

    DiscountResponse update(String id, DiscountRequest request);

    void delete(String id);
}
