package com.iuh.controller;

import com.iuh.dto.ApiResponse;
import com.iuh.dto.request.OrderEmailRequest;
import com.iuh.dto.request.SendEmailRequest;
import com.iuh.dto.response.EmailResponse;
import com.iuh.service.EmailService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class EmailController {
    EmailService emailService;

    @PostMapping("/email/send")
    ApiResponse<EmailResponse> sendEmail(@RequestBody SendEmailRequest request) {
        return ApiResponse.<EmailResponse>builder().result(emailService.sendEmail(request)).build();
    }

    @PostMapping("/email/order-confirmation")
    ApiResponse<EmailResponse> sendOrderConfirmationEmail(@RequestBody OrderEmailRequest request) {
        log.info("Received order confirmation email request for order: {}", request.getOrderId());
        return ApiResponse.<EmailResponse>builder().result(emailService.sendOrderConfirmationEmail(request)).build();
    }
}
