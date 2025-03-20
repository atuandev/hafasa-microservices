package com.iuh.mapper;

import com.iuh.dto.request.OrderCreationRequest;
import com.iuh.dto.response.OrderResponse;
import com.iuh.entity.Order;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface OrderMapper {

    @Mapping(target = "orderDetails", ignore = true)
    Order toOrder(OrderCreationRequest request);

    OrderResponse toOrderResponse(Order order);

}
