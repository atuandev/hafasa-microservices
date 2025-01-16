package com.iuh.mapper;

import com.iuh.dto.response.PermissionResponse;
import com.iuh.entity.Permission;
import org.mapstruct.Mapper;

import com.iuh.dto.request.PermissionRequest;

@Mapper(componentModel = "spring")
public interface PermissionMapper {
    Permission toPermission(PermissionRequest request);

    PermissionResponse toPermissionResponse(Permission permission);
}
