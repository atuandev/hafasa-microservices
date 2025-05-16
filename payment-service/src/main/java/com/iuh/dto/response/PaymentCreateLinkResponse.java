package com.iuh.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class PaymentCreateLinkResponse {
    long orderCode;
//    String orderId;
    int price;
    String checkoutUrl;
    String returnUrl;
    String cancelUrl;
    String status;
}