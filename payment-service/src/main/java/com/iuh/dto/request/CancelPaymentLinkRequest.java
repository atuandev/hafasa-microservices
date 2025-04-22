package com.iuh.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class CancelPaymentLinkRequest {
    private Long orderCode; // orderId cua pay
}
