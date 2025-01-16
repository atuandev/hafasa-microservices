package com.iuh.mapper;

import com.iuh.dto.request.ReviewCreationRequest;
import com.iuh.dto.request.ReviewUpdateRequest;
import com.iuh.dto.response.ReviewResponse;
import com.iuh.entity.Review;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ReviewMapper {

    Review toEntity(ReviewCreationRequest request);

    @Mapping(target = "username", source = "user.username")
    @Mapping(target = "bookTitle", source = "book.title")
    @Mapping(target = "bookSlug", source = "book.slug")
    @Mapping(target = "thumbnail", source = "book.thumbnail")
    ReviewResponse toResponse(Review review);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    void toUpdateEntity(@MappingTarget Review review, ReviewUpdateRequest request);

}
