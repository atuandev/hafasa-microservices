package com.iuh.service;


import com.iuh.dto.request.OrderCreationRequest;
import com.iuh.dto.response.OrderResponse;
import com.iuh.dto.response.PageResponse;
import com.iuh.enums.OrderStatus;

public interface OrderService {
    OrderResponse save(OrderCreationRequest request);

    OrderResponse findById(String id);

    PageResponse<Object> findAllOrders(int pageNo, int pageSize, String sortBy);

    PageResponse<Object> findAllByUserId(String userId, int pageNo, int pageSize, String sortBy);

    void changeStatus(String id, OrderStatus status);
}
