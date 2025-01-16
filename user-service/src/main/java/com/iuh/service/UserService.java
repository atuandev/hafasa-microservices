package com.iuh.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.iuh.dto.request.UserCreationRequest;
import com.iuh.dto.request.UserUpdateAvatarRequest;
import com.iuh.dto.request.UserUpdatePasswordRequest;
import com.iuh.dto.request.UserUpdateRequest;
import com.iuh.dto.response.PageResponse;
import com.iuh.dto.response.UserResponse;
import com.iuh.enums.UserStatus;

public interface UserService {
    UserResponse save(UserCreationRequest request);

    UserResponse findById(String id);

    UserResponse getMyInfo() throws JsonProcessingException;

    UserResponse update(String id, UserUpdateRequest request) throws JsonProcessingException;

    void delete(String id);

    PageResponse<Object> findAll(int pageNo, int pageSize, String sortBy, String search);

    PageResponse<Object> findAllWithSpecifications(int pageNo, int pageSize, String sortBy, String[] users);

    void updateStatus(String id, UserStatus status) throws JsonProcessingException;

    void updatePassword(String id, UserUpdatePasswordRequest request) throws JsonProcessingException;

    void updateAvatar(String id, UserUpdateAvatarRequest request) throws JsonProcessingException;
}
