package com.iuh.controller;

import com.iuh.dto.ApiResponse;
import com.iuh.dto.request.CancelPaymentLinkRequest;
import com.iuh.dto.request.PaymentCreateLinkRequest;
import com.iuh.dto.response.PaymentCreateLinkResponse;
import com.iuh.service.CheckoutService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import vn.payos.type.PaymentLinkData;

@Tag(name = "Payment Controller")
@RestController
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)

public class CheckoutController {
    CheckoutService checkoutService;

    @PostMapping(
            value = "/create-payment-link",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ApiResponse<PaymentCreateLinkResponse> checkout(@RequestBody PaymentCreateLinkRequest body) {
        return ApiResponse.<PaymentCreateLinkResponse>builder()
                .message("Payment link created successfully")
                .data(checkoutService.createPaymentLink(body))
                .build();
    }
    @PostMapping(
            value = "/cancel-payment-link",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ApiResponse<PaymentLinkData> cancelPaymentLink(@RequestBody CancelPaymentLinkRequest body) {
        return ApiResponse.<PaymentLinkData>builder()
                .message("Payment link cancelled successfully")
                .data(checkoutService.cancelPaymentLink(body))
                .build();
    }

}