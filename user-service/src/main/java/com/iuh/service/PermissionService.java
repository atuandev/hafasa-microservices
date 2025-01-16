package com.iuh.service;

import com.iuh.dto.request.PermissionRequest;
import com.iuh.dto.response.PageResponse;
import com.iuh.dto.response.PermissionResponse;

public interface PermissionService {
    PermissionResponse save(PermissionRequest request);

    PageResponse<Object> findAll(int pageNo, int pageSize, String sortBy, String search);

    void delete(String name);
}
