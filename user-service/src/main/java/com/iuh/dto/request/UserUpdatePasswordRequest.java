package com.iuh.dto.request;

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
public class UserUpdatePasswordRequest {

    @Size(min = 6, message = "INVALID_PASSWORD")
    String oldPassword;

    @Size(min = 6, message = "INVALID_PASSWORD")
    String newPassword;
}
