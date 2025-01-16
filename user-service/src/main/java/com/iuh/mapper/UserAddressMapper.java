package com.iuh.mapper;

import com.iuh.dto.request.UserAddressRequest;
import com.iuh.dto.response.UserAddressResponse;
import com.iuh.entity.UserAddress;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserAddressMapper {
    UserAddress toEntity(UserAddressRequest userAddress);

    @Mapping(target = "userId", source = "user.id")
    UserAddressResponse toResponse(UserAddress userAddress);

    void toUpdate(@MappingTarget UserAddress userAddress, UserAddressRequest userAddressRequest);
}
