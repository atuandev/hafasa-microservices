package com.iuh.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.iuh.constant.AppConstant;
import com.iuh.constant.PredefinedRole;
import com.iuh.constant.RedisKey;
import com.iuh.dto.request.UserCreationRequest;
import com.iuh.dto.request.UserUpdateAvatarRequest;
import com.iuh.dto.request.UserUpdatePasswordRequest;
import com.iuh.dto.request.UserUpdateRequest;
import com.iuh.dto.response.PageResponse;
import com.iuh.dto.response.UserResponse;
import com.iuh.entity.Role;
import com.iuh.entity.User;
import com.iuh.enums.UserStatus;
import com.iuh.exception.AppException;
import com.iuh.exception.ErrorCode;
import com.iuh.mapper.UserMapper;
import com.iuh.repository.RoleRepository;
import com.iuh.repository.UserRepository;
import com.iuh.repository.specification.UserSpecificationsBuilder;
import com.iuh.service.RedisService;
import com.iuh.service.UserService;
import com.iuh.util.PageUtil;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class UserServiceImpl implements UserService {

    UserRepository userRepository;
    RoleRepository roleRepository;
    UserMapper userMapper;
    PasswordEncoder passwordEncoder;
    RedisService<String, String, String> redisService;
    ObjectMapper redisObjectMapper;

    @Override
    @Transactional
    public UserResponse save(UserCreationRequest request) {
        log.info("Saving new user: {}", request.getUsername());

        User user = userMapper.toEntity(request);
        log.debug("Mapped User entity: {}", user);

        String avatarName = user.getName().replace(" ", "+");
        String avatarUrl = "https://ui-avatars.com/api/?background=random&rounded=true&bold=true&name=" + avatarName;
        user.setAvatar(avatarUrl);
        log.debug("Generated avatar URL: {}", avatarUrl);

        String encodedPassword = passwordEncoder.encode(request.getPassword());
        user.setPassword(encodedPassword);
        log.debug("Encoded password set for user");

        user.setAddresses(new HashSet<>());
        log.debug("Initialized empty address set for user");

        var roles = new HashSet<Role>();
        roleRepository.findById(PredefinedRole.USER_ROLE).ifPresent(roles::add);
        user.setRoles(roles);
        log.debug("Assigned roles: {}", roles);

        try {
            user = userRepository.save(user);
            log.info("User {} saved successfully", request.getUsername());
        } catch (DataIntegrityViolationException e) {
            log.error("User {} already exists", request.getUsername(), e);
            throw new AppException(ErrorCode.USER_EXISTS);
        }

        return userMapper.toResponse(user);
    }


    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public UserResponse findById(String id) {
        log.info("Finding user by ID: {}", id);
<<<<<<< HEAD

=======
>>>>>>> b5fd7fa531fea39bf45f6fc85a439eb0afd663ec
        User user = getUserById(id);
        log.debug("Retrieved user entity: {}", user);

        updateCacheUser(user, 1);
        log.debug("Updated cache for user with ID: {}", id);

        return userMapper.toResponse(user);
    }

    @Override
    public UserResponse getMyInfo() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        log.info("Fetching info for current user: {}", username);

        String userJson = redisService.hashGet(RedisKey.USER_INFO, username);
        log.debug("Fetched raw JSON from Redis for {}: {}", username, userJson);

        if (StringUtils.isNotEmpty(userJson)) {
            try {
                User cachedUser = redisObjectMapper.readValue(userJson, User.class);
                log.info("Loaded user info from cache for: {}", username);
<<<<<<< HEAD
                log.debug("Parsed cached user entity: {}", cachedUser);
=======
>>>>>>> b5fd7fa531fea39bf45f6fc85a439eb0afd663ec
                return userMapper.toResponse(cachedUser);
            } catch (JsonProcessingException e) {
                log.error("Error parsing cached user info for: {}", username, e);
                throw new AppException(ErrorCode.JSON_PROCESSING_ERROR);
            }
        }


        log.debug("No cache found. Querying database for user: {}", username);
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        log.debug("Fetched user from DB: {}", user);

        updateCacheUser(user, 1);
        log.debug("Updated cache for current user: {}", username);
=======
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
>>>>>>> b5fd7fa531fea39bf45f6fc85a439eb0afd663ec

        updateCacheUser(user, 1);
        return userMapper.toResponse(user);
    }


    @Override
    @Transactional
    @PostAuthorize("returnObject.username == authentication.name")
    public UserResponse update(String id, UserUpdateRequest request) {
        log.info("Updating user ID: {}", id);
        User user = getUserById(id);
        userMapper.updateUser(user, request);
        User updatedUser = userRepository.save(user);
        updateCacheUser(updatedUser, 2);
        log.info("Updated user ID: {}", id);
        return userMapper.toResponse(updatedUser);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(String id) {
        log.info("Deleting user ID: {}", id);
        User user = getUserById(id);
        userRepository.deleteById(id);
        deleteCacheUser(user.getUsername());
        log.info("Deleted user ID: {}", id);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public PageResponse<Object> findAll(int pageNo, int pageSize, String sortBy, String search) {
        log.info("Finding all users: pageNo={}, pageSize={}, sortBy={}, search={}", pageNo, pageSize, sortBy, search);
        Pageable pageable = PageUtil.getPageable(pageNo, pageSize, sortBy);
        Page<User> users = userRepository.findAllAndSearch(search, search, search, search, pageable);
        List<UserResponse> items = users.map(userMapper::toResponse).getContent();
        return PageUtil.getPageResponse(pageable, users, items);
    }


    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public PageResponse<Object> findAllWithSpecifications(int pageNo, int pageSize, String sortBy, String[] users) {
        log.info("Finding all users with specifications: pageNo={}, pageSize={}, sortBy={}", pageNo, pageSize, sortBy);

        if (users == null || users.length == 0) {
            log.debug("User specification array is empty or null. Using default findAll()");
            return findAll(pageNo, pageSize, sortBy, "");
        }

        UserSpecificationsBuilder builder = new UserSpecificationsBuilder();
        Pattern pattern = Pattern.compile(AppConstant.SEARCH_SPEC_OPERATOR);

        for (String s : users) {
            log.debug("Processing user filter string: {}", s);
            Matcher matcher = pattern.matcher(s);
            if (matcher.find()){
                log.debug("Matched filter -> field: {}, operator: {}, value: {}", matcher.group(1), matcher.group(2), matcher.group(3));
                builder.with(matcher.group(1), matcher.group(2), matcher.group(3), matcher.group(4), matcher.group(5));
        }}

        Pageable pageable = PageUtil.getPageable(pageNo, pageSize, sortBy);
        Page<User> usersPage = userRepository.findAll(builder.build(), pageable);
        List<UserResponse> items = usersPage.map(userMapper::toResponse).getContent();
        log.debug("Number of users found: {}", usersPage.getTotalElements());

        return PageUtil.getPageResponse(pageable, usersPage, items);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public void updateStatus(String id, UserStatus status) {
        log.info("Updating status for user ID {} to {}", id, status);
        User user = getUserById(id);
        user.setStatus(status);
        userRepository.save(user);
        updateCacheUser(user, 1);
    }

    @Override
    public void updatePassword(String id, UserUpdatePasswordRequest request) {
        log.info("Updating password for user ID: {}", id);
        User user = getUserById(id);

        if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
            log.warn("Incorrect old password for user ID: {}", id);
            throw new AppException(ErrorCode.INCORRECT_OLD_PASSWORD);
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
        updateCacheUser(user, 1);
        log.info("Password updated for user ID: {}", id);
    }

    @Override
    public void updateAvatar(String id, UserUpdateAvatarRequest request) {
        log.info("Updating avatar for user ID: {}", id);
        User user = getUserById(id);
        user.setAvatar(request.getAvatar());
        userRepository.save(user);
        updateCacheUser(user, 1);
        log.info("Avatar updated for user ID: {}", id);
    }

    private User getUserById(String id) {
        return userRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("User not found with ID: {}", id);
                    return new AppException(ErrorCode.USER_NOT_FOUND);
                });
    }

    private void updateCacheUser(User user, int expireHours) {
        try {
            String userJson = redisObjectMapper.writeValueAsString(user);
            redisService.hashSet(RedisKey.USER_INFO, user.getUsername(), userJson);
            redisService.setExpireHours(RedisKey.USER_INFO, expireHours);
            log.info("Updated cache for user: {}", user.getUsername());
        } catch (JsonProcessingException e) {
            log.error("Error while caching user data: {}", user.getUsername(), e);
            throw new AppException(ErrorCode.JSON_PROCESSING_ERROR);
        }
    }

    private void deleteCacheUser(String username) {
        redisService.delete(RedisKey.USER_INFO, username);
        log.info("Deleted user cache: {}", username);
    }
}
