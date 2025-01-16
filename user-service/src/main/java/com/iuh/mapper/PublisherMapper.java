package com.iuh.mapper;

import com.iuh.dto.request.PublisherRequest;
import com.iuh.dto.response.PublisherResponse;
import com.iuh.entity.Publisher;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface PublisherMapper {
    Publisher toEntity(PublisherRequest request);

    PublisherResponse toResponse(Publisher publisher);

    void toUpdateEntity(@MappingTarget Publisher category, PublisherRequest request);
}
