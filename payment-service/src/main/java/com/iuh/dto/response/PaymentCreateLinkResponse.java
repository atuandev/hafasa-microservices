package com.springboot.app.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class PaymentCreateLinkResponse {
  private long orderIdOS;   // orderId cua pay
  private String orderId;   // orderId sẽ được nhận từ RequestBody
  private int price;
  private String checkoutUrl;

}