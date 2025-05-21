package com.iuh.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
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
@JsonInclude(JsonInclude.Include.NON_NULL)
public class EmailApiResponse<T> {
    @Builder.Default
    int code = 1000;

    String message;
    T result;
    
    /**
     * Get the result field (used for compatibility with email-service)
     * @return the result
     */
    public T getData() {
        return result;
    }
}