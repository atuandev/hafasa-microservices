package com.iuh.service;

import com.iuh.dto.request.CancelPaymentLinkRequest;
import com.iuh.dto.request.PaymentCreateLinkRequest;
import com.iuh.dto.response.PaymentCreateLinkResponse;
import vn.payos.type.PaymentLinkData;

public interface CheckoutService {
    PaymentCreateLinkResponse createPaymentLink(PaymentCreateLinkRequest request);
    PaymentLinkData cancelPaymentLink(CancelPaymentLinkRequest request);
    PaymentCreateLinkResponse getPaymentInfoById(Long orderCode);
}
