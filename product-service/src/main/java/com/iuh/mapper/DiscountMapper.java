package com.iuh.mapper;

import com.iuh.dto.request.DiscountRequest;
import com.iuh.dto.response.DiscountResponse;
import com.iuh.entity.Discount;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface DiscountMapper {
    Discount toEntity(DiscountRequest request);

    void toUpdateEntity(@MappingTarget Discount category, DiscountRequest request);

    @Mapping(target = "id", source = "id")
    DiscountResponse toResponse(Discount discount);
}
