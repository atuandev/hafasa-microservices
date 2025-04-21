package com.iuh.service.impl;

import com.iuh.dto.ApiResponse;
import com.iuh.dto.request.CancelPaymentLinkRequest;
import com.iuh.dto.request.PaymentCreateLinkRequest;
import com.iuh.dto.response.PaymentCreateLinkResponse;
import com.iuh.service.CheckoutService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import vn.payos.PayOS;
import vn.payos.type.CheckoutResponseData;
import vn.payos.type.PaymentData;
import vn.payos.type.PaymentLinkData;

import java.util.Date;
import java.util.UUID;
@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class CheckoutServiceImpl implements CheckoutService {
    PayOS payOS;

    @Override
    public PaymentCreateLinkResponse createPaymentLink(PaymentCreateLinkRequest request) {
        try {
            String currentTimeString = String.valueOf(new Date().getTime());
//            long orderIdOS = Math.abs(UUID.randomUUID().getMostSignificantBits());
            long orderIdOS = Long.parseLong(currentTimeString.substring(currentTimeString.length() - 6));
            String orderId = request.getOrderId();
            String shortOrderId = orderId.length() > 25 ? orderId.substring(0, 25) : orderId;

            PaymentData paymentData = PaymentData.builder()
                    .orderCode(orderIdOS)
                    .amount(request.getPrice())
                    .description(shortOrderId)
                    .cancelUrl(request.getCancelUrl())
                    .returnUrl(request.getReturnUrl())
                    .build();

            CheckoutResponseData responseData = payOS.createPaymentLink(paymentData);

            return PaymentCreateLinkResponse.builder()
                    .orderCode(orderIdOS)
                    .orderId(orderId)
                    .price(request.getPrice())
                    .checkoutUrl(responseData.getCheckoutUrl())
                    .returnUrl(request.getReturnUrl())
                    .cancelUrl(request.getCancelUrl())
                    .build();
        } catch (Exception e) {
            throw new RuntimeException("Error while creating payment link", e);
        }
    }


    @Override
    public PaymentLinkData cancelPaymentLink(CancelPaymentLinkRequest request) {
        try {
            // Gọi PayOS API để hủy link thanh toán
            PaymentLinkData cancelledLink = payOS.cancelPaymentLink(request.getOrderCode(), "cancellationReason");

            // Kiểm tra kết quả trả về
            if (cancelledLink != null && "CANCELLED".equalsIgnoreCase(cancelledLink.getStatus())) {
                return cancelledLink;
            } else {
                throw new RuntimeException("Failed to cancel payment link.");
            }
        } catch (Exception e) {
            throw new RuntimeException("Error occurred while cancelling payment link.", e);
        }
    }

}
