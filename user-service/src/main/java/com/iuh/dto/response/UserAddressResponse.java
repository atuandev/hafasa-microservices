package com.iuh.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class UserAddressResponse {
    String id;
    String userId;
    String receiverName;
    String receiverPhone;
    String address;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
}
