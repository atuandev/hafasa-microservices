package com.iuh.service;

import com.iuh.dto.request.DiscountRequest;
import com.iuh.dto.response.PageResponse;
import com.iuh.entity.Discount;

public interface DiscountService {
    Discount save(DiscountRequest request);

    PageResponse<Object> findAll(int pageNo, int pageSize, String sortBy, String search);

    Discount findById(String id);

    Discount update(String id, DiscountRequest request);

    void delete(String id);
}
