package com.iuh.mapper;

import com.iuh.dto.request.BookImageRequest;
import com.iuh.dto.response.BookImageResponse;
import com.iuh.entity.BookImage;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface BookImageMapper {
    BookImage toEntity(BookImageRequest request);

    BookImageResponse toResponse(BookImage author);

    void toUpdateEntity(@MappingTarget BookImage category, BookImageRequest request);
}
