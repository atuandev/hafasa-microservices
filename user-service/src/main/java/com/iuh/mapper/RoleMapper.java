package com.iuh.mapper;

import com.iuh.dto.response.RoleResponse;
import com.iuh.entity.Role;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.iuh.dto.request.RoleRequest;

@Mapper(componentModel = "spring")
public interface RoleMapper {
    @Mapping(target = "permissions", ignore = true)
    Role toEntity(RoleRequest request);

    RoleResponse toResponse(Role role);
}
