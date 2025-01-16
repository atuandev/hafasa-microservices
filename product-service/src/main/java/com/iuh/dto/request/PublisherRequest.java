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
public class PublisherRequest {

    @Size(min = 1, message = "INVALID_NAME")
    String name;

    String slug;

    String description;

    String image;

    String address;

    @Builder.Default
    Boolean status = true;
}
