package com.iuh.mapper;

import com.iuh.dto.request.OrderCreationRequest;
import com.iuh.dto.response.OrderDetailResponse;
import com.iuh.dto.response.OrderResponse;
import com.iuh.entity.Order;
import com.iuh.entity.OrderDetail;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface OrderMapper {

    @Mapping(target = "orderDetails", ignore = true)
    Order toOrder(OrderCreationRequest request);

    @Mapping(source = "user.id", target = "userId")
    OrderResponse toOrderResponse(Order order);

    @Mapping(source = "book.title", target = "bookTitle")
    @Mapping(source = "book.slug", target = "slug")
    @Mapping(source = "book.thumbnail", target = "thumbnail")
    OrderDetailResponse toOrderDetailResponse(OrderDetail orderDetail);

}
