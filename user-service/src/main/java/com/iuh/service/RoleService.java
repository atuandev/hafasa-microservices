package com.iuh.service;

import com.iuh.dto.request.RoleRequest;
import com.iuh.dto.response.PageResponse;
import com.iuh.dto.response.RoleResponse;

public interface RoleService {
    RoleResponse save(RoleRequest request);

    PageResponse<Object> findAll(int pageNo, int pageSize, String sortBy, String search);

    void delete(String role);
}
