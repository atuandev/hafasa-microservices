package com.iuh.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class OrderEmailRequest {
    String orderId;
    String userId;
    String receiverName;
    String receiverEmail;
    String receiverPhone;
    String address;
    String paymentMethod;
    Double total;
    List<OrderDetailDTO> orderDetails;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @FieldDefaults(level = lombok.AccessLevel.PRIVATE)
    public static class OrderDetailDTO {
        String bookId;
        String bookTitle;
        String bookThumbnail;
        Integer quantity;
        Double price;
    }
}