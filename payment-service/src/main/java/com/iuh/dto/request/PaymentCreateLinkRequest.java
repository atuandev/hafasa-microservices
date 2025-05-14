package com.iuh.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class PaymentCreateLinkRequest {
//    String orderId;
    int price;
    String returnUrl;
    String cancelUrl;
}
