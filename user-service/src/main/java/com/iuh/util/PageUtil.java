package com.iuh.util;

import com.iuh.dto.response.PageResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class PageUtil {
    private PageUtil() {
    }

    /**
     * Get pageable object for pagination, sorting(field:direction)
     *
     * @param pageNo   int
     * @param pageSize int
     * @param sortBy   String
     * @return Pageable
     */
    public static Pageable getPageable(int pageNo, int pageSize, String sortBy) {
        int page = pageNo > 0 ? pageNo - 1 : 0;
        List<Sort.Order> sorts = new ArrayList<>();

        if (StringUtils.hasLength(sortBy)) {
            Pattern pattern = Pattern.compile("(\\w+?)(:)(asc|desc)");
            Matcher matcher = pattern.matcher(sortBy);
            if (matcher.find()) {
                if (matcher.group(3).equalsIgnoreCase("asc")) {
                    sorts.add(new Sort.Order(Sort.Direction.ASC, matcher.group(1)));
                } else {
                    sorts.add(new Sort.Order(Sort.Direction.DESC, matcher.group(1)));
                }
            }
        }

        return PageRequest.of(page, pageSize, Sort.by(sorts));
    }

    /**
     * Get PageResponse object for pagination
     *
     * @param pageable Pageable
     * @param page     Page<T>
     * @param items    List<E>
     * @param <T>      T
     * @param <E>      E
     * @return PageResponse<Object>
     */
    public static <T, E> PageResponse<Object> getPageResponse(Pageable pageable, Page<T> page, List<E> items) {
        return PageResponse.builder()
                .pageNo(pageable.getPageNumber() + 1)
                .pageSize(pageable.getPageSize())
                .totalPages(page.getTotalPages())
                .totalElements(page.getTotalElements())
                .items(items)
                .build();
    }
}
