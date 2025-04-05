package com.springboot.app.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class PaymentCreateLinkRequest { // orderId cua pay
    private String orderId;   // orderId sẽ được nhận từ RequestBody
    private int price;
}
