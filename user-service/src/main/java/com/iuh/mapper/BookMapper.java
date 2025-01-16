package com.iuh.mapper;

import com.iuh.dto.request.BookCreationRequest;
import com.iuh.dto.request.BookUpdateRequest;
import com.iuh.dto.response.BookResponse;
import com.iuh.dto.response.BookResponseAdmin;
import com.iuh.entity.Book;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface BookMapper {
    @Mapping(target = "bookImages", ignore = true)
    Book toEntity(BookCreationRequest request);

    @Mapping(target = "discountPrice", ignore = true)
    BookResponse toResponse(Book book);

    @Mapping(target = "discountPrice", ignore = true)
    BookResponseAdmin toResponseAdmin(Book book);

    @Mapping(target = "category", ignore = true)
    @Mapping(target = "publisher", ignore = true)
    @Mapping(target = "discount", ignore = true)
    @Mapping(target = "bookImages", ignore = true)
    void toUpdateEntity(@MappingTarget Book category, BookUpdateRequest request);

    @AfterMapping
    default void setDiscountPrice(@MappingTarget BookResponse response, Book book) {
        response.setDiscountPrice(book.getDiscountPrice());
    }

    @AfterMapping
    default void setDiscountPrice(@MappingTarget BookResponseAdmin response, Book book) {
        response.setDiscountPrice(book.getDiscountPrice());
    }
}
