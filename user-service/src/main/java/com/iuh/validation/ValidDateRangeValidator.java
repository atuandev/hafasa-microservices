package com.iuh.validation;

import com.iuh.dto.request.DiscountRequest;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class ValidDateRangeValidator implements ConstraintValidator<ValidDateRange, DiscountRequest> {

    @Override
    public boolean isValid(DiscountRequest request, ConstraintValidatorContext context) {
        if (request.getStartDate() == null || request.getEndDate() == null) {
            return true; // null values are handled by other annotations
        }
        return request.getEndDate().isAfter(request.getStartDate());
    }
}