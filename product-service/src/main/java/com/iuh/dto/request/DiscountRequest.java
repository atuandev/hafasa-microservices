package com.iuh.dto.request;

import com.iuh.validation.ValidDateRange;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@ValidDateRange
public class DiscountRequest {

    @Size(min = 1, message = "INVALID_DISCOUNT_NAME")
    String name;

    @Pattern(regexp = "^[A-Z0-9]*$", message = "INVALID_DISCOUNT_CODE")
    @Size(min = 1, max = 50, message = "INVALID_DISCOUNT_CODE")
    String code;

    @Min(value = 1, message = "INVALID_DISCOUNT_PERCENT_MIN")
    @Max(value = 100, message = "INVALID_DISCOUNT_PERCENT_MAX")
    Integer percent;

    LocalDate startDate;

    LocalDate endDate;
}
