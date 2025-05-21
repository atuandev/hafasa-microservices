package com.iuh.controller;

import com.iuh.dto.ApiResponse;
import com.iuh.dto.request.OrderEmailRequest;
import com.iuh.dto.request.OtpRequest;
import com.iuh.dto.request.OtpVerificationRequest;
import com.iuh.dto.request.SendEmailRequest;
import com.iuh.dto.response.EmailResponse;
import com.iuh.dto.response.OtpResponse;
import com.iuh.messaging.EmailMessageProducer;
import com.iuh.service.EmailService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class EmailController {
    EmailService emailService;
    EmailMessageProducer emailMessageProducer;

    @PostMapping("/email/send")
    ApiResponse<EmailResponse> sendEmail(@RequestBody SendEmailRequest request) {
        return ApiResponse.<EmailResponse>builder().result(emailService.sendEmail(request)).build();
    }

    @PostMapping("/email/order-confirmation")
    ApiResponse<String> sendOrderConfirmationEmail(@RequestBody OrderEmailRequest request) {
        log.info("Received order confirmation email request for order: {}", request.getOrderId());
        // Send the email request to RabbitMQ instead of processing it directly
        emailMessageProducer.sendOrderConfirmationEmail(request);
        return ApiResponse.<String>builder().result("Order confirmation email request queued for processing").build();
    }

    @PostMapping("/email/rating/{messageId}/{rating}")
    ApiResponse<String> rateEmail(@PathVariable String messageId, @PathVariable int rating) {
        log.info("Received email rating request for message: {}, rating: {}", messageId, rating);
        if (rating < 1 || rating > 5) {
            return ApiResponse.<String>builder().result("Rating must be between 1 and 5").build();
        }
        // Send the rating to RabbitMQ
        emailMessageProducer.sendEmailRating(messageId, rating);
        return ApiResponse.<String>builder().result("Email rating received").build();
    }

    @PostMapping("/email/otp/send")
    ApiResponse<OtpResponse> sendOtpEmail(@RequestBody OtpRequest request) {
        log.info("Received OTP email request for email: {}", request.getEmail());
        OtpResponse response = emailService.sendOtpEmail(request);
        return ApiResponse.<OtpResponse>builder().result(response).build();
    }

    @PostMapping("/email/otp/verify")
    ApiResponse<Boolean> verifyOtp(@RequestBody OtpVerificationRequest request) {
        log.info("Received OTP verification request for email: {}", request.getEmail());
        boolean isValid = emailService.verifyOtp(request);
        return ApiResponse.<Boolean>builder().result(isValid).build();
    }
}
