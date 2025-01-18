package com.iuh.dto.request;

import java.util.List;

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
public class OrderCreationRequest {
    String userId;
    String receiverName;
    String receiverPhone;
    String address;
    String paymentMethod;
    Double total;
    List<OrderDetailRequest> orderDetails;
}
