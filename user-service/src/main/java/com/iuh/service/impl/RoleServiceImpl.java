package com.iuh.service.impl;

import java.util.HashSet;
import java.util.List;

import com.iuh.dto.response.PageResponse;
import com.iuh.dto.response.ReviewResponse;
import com.iuh.dto.response.RoleResponse;
import com.iuh.entity.Review;
import com.iuh.entity.Role;
import com.iuh.mapper.RoleMapper;
import com.iuh.service.RoleService;
import com.iuh.util.PageUtil;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import com.iuh.dto.request.RoleRequest;
import com.iuh.repository.PermissionRepository;
import com.iuh.repository.RoleRepository;

import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
@Slf4j
public class RoleServiceImpl implements RoleService {
    RoleRepository roleRepository;
    PermissionRepository permissionRepository;
    RoleMapper roleMapper;

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public RoleResponse save(RoleRequest request) {
        var role = roleMapper.toEntity(request);

        var permissions = permissionRepository.findAllById(request.getPermissions());
        role.setPermissions(new HashSet<>(permissions));

        return roleMapper.toResponse(roleRepository.save(role));
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public PageResponse<Object> findAll(int pageNo, int pageSize, String sortBy, String search) {
        Pageable pageable = PageUtil.getPageable(pageNo, pageSize, sortBy);

        Page<Role> roles = roleRepository.findAllWithSearch(search, search, pageable);

        List<RoleResponse> items = roles.map(roleMapper::toResponse).getContent();

        return PageUtil.getPageResponse(pageable, roles, items);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(String role) {
        roleRepository.deleteById(role);
    }
}
