package com.iuh.dto.response;

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
public class PageResponse<T> {
    Integer pageNo;
    Integer pageSize;
    Integer totalPages;
    Long totalElements;
    T items;
}
