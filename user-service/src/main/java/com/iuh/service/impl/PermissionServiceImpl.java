package com.iuh.service.impl;

import com.iuh.dto.request.PermissionRequest;
import com.iuh.dto.response.PageResponse;
import com.iuh.dto.response.PermissionResponse;
import com.iuh.entity.Permission;
import com.iuh.exception.AppException;
import com.iuh.exception.ErrorCode;
import com.iuh.mapper.PermissionMapper;
import com.iuh.repository.PermissionRepository;
import com.iuh.service.PermissionService;
import com.iuh.util.PageUtil;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class PermissionServiceImpl implements PermissionService {
    PermissionRepository permissionRepository;
    PermissionMapper permissionMapper;

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public PermissionResponse save(PermissionRequest request) {
        Permission permission = permissionMapper.toPermission(request);

        boolean exists = permissionRepository.existsById(permission.getName());
        if (exists) throw new AppException(ErrorCode.PERMISSION_ALREADY_EXISTS);

        permission = permissionRepository.save(permission);
        return permissionMapper.toPermissionResponse(permission);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public PageResponse<Object> findAll(int pageNo, int pageSize, String sortBy, String search) {
        Pageable pageable = PageUtil.getPageable(pageNo, pageSize, sortBy);

        Page<Permission> permissions = permissionRepository.findWithSearch(search, search, pageable);

        List<Permission> items = permissions.getContent();

        return PageUtil.getPageResponse(pageable, permissions, items);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(String name) {
        permissionRepository.deleteById(name);
    }
}
