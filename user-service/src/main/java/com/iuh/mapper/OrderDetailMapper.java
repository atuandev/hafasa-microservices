package com.iuh.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.iuh.dto.request.OrderDetailRequest;
import com.iuh.entity.OrderDetail;

@Mapper(componentModel = "spring")
public interface OrderDetailMapper {
	@Mapping(target = "order", ignore = true)
	@Mapping(target = "book", ignore = true)
	@Mapping(target = "price", ignore = true)
	OrderDetail toEntity(OrderDetailRequest request);
}
