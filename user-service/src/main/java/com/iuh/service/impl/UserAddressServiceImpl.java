package com.iuh.service.impl;

import com.iuh.dto.request.UserAddressRequest;
import com.iuh.dto.response.PageResponse;
import com.iuh.dto.response.UserAddressResponse;
import com.iuh.entity.User;
import com.iuh.entity.UserAddress;
import com.iuh.exception.AppException;
import com.iuh.exception.ErrorCode;
import com.iuh.mapper.UserAddressMapper;
import com.iuh.repository.UserAddressRepository;
import com.iuh.repository.UserRepository;
import com.iuh.service.UserAddressService;
import com.iuh.util.PageUtil;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class UserAddressServiceImpl implements UserAddressService {
    UserRepository userRepository;
    UserAddressRepository userAddressRepository;
    UserAddressMapper userAddressMapper;

    @Override
    @Transactional
    public UserAddressResponse save(UserAddressRequest request) {
        UserAddress userAddress = userAddressMapper.toEntity(request);
        User user = userRepository.findById(request.getUserId()).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        userAddress.setUser(user);
        return userAddressMapper.toResponse(userAddressRepository.save(userAddress));
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public PageResponse<Object> findAll(int pageNo, int pageSize, String sortBy, String search) {
        Pageable pageable = PageUtil.getPageable(pageNo, pageSize, sortBy);

        Page<UserAddress> addresses = userAddressRepository.findAll(search, search, search, pageable);

        List<UserAddressResponse> items = addresses.map(userAddressMapper::toResponse).getContent();

        return PageUtil.getPageResponse(pageable, addresses, items);
    }

    @Override
    public PageResponse<Object> findAllByUserId(String userId, int pageNo, int pageSize, String sortBy, String search) {
        Pageable pageable = PageUtil.getPageable(pageNo, pageSize, sortBy);

        Page<UserAddress> addresses = userAddressRepository.findAllByUserId(userId, search, search, search, pageable);

        List<UserAddressResponse> items = addresses.map(userAddressMapper::toResponse).getContent();

        return PageUtil.getPageResponse(pageable, addresses, items);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Override
    public UserAddressResponse findById(String id) {
        var userAddress = getAddressById(id);
        return userAddressMapper.toResponse(userAddress);
    }

    @Override
    @Transactional
    public UserAddressResponse update(String id, UserAddressRequest request) {
        var userAddress = getAddressById(id);
        userAddressMapper.toUpdate(userAddress, request);
        return userAddressMapper.toResponse(userAddressRepository.save(userAddress));
    }

    @Override
    @Transactional
    public void delete(String id) {
        var userAddress = getAddressById(id);
        userAddressRepository.deleteUserAddressById(userAddress.getId());
    }

    private UserAddress getAddressById(String id) {
        return userAddressRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.USER_ADDRESS_NOT_FOUND));
    }
}
