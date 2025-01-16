package com.iuh.service;

import com.iuh.dto.request.UserAddressRequest;
import com.iuh.dto.response.PageResponse;
import com.iuh.dto.response.UserAddressResponse;

public interface UserAddressService {
    UserAddressResponse save(UserAddressRequest request);

    PageResponse<Object> findAll(int pageNo, int pageSize, String sortBy, String search);

    PageResponse<Object> findAllByUserId(String userId, int pageNo, int pageSize, String sortBy, String search);

    UserAddressResponse findById(String id);

    UserAddressResponse update(String id, UserAddressRequest request);

    void delete(String id);
}
