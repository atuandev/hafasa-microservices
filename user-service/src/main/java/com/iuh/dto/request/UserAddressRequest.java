package com.iuh.dto.request;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class UserAddressRequest {

    @Size(min = 1, message = "INVALID_NAME")
    String receiverName;

    @Pattern(regexp = "^(0\\d{9}$)", message = "INVALID_PHONE")
    String receiverPhone;

    @Size(min = 1, message = "INVALID_ADDRESS")
    String address;

    @Size(min = 1, message = "INVALID_USER_ID")
    String userId;
}
