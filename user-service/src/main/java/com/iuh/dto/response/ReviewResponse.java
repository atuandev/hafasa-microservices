package com.iuh.dto.response;

import com.iuh.enums.ReviewStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class ReviewResponse {
    String id;
    String username;
    String bookTitle;
    String bookSlug;
    String thumbnail;
    Integer rating;
    String comment;
    ReviewStatus status;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
}
