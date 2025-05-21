package com.iuh.service;

import com.iuh.configuration.BrevoConfig;
import com.iuh.dto.request.EmailRequest;
import com.iuh.dto.request.OrderEmailRequest;
import com.iuh.dto.request.OtpRequest;
import com.iuh.dto.request.OtpVerificationRequest;
import com.iuh.dto.request.Recipient;
import com.iuh.dto.request.SendEmailRequest;
import com.iuh.dto.request.Sender;
import com.iuh.dto.response.EmailResponse;
import com.iuh.dto.response.OtpResponse;
import com.iuh.exception.AppException;
import com.iuh.exception.ErrorCode;
import com.iuh.repository.httpclient.EmailClient;
import com.iuh.util.OtpUtil;
import feign.FeignException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.text.NumberFormat;
import java.util.List;
import java.util.Locale;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class EmailService {
    EmailClient emailClient;
    BrevoConfig brevoConfig;
    OtpUtil otpUtil;

    public EmailResponse sendEmail(SendEmailRequest request) {
        log.info("Sending email to: {}", request.getTo().getEmail());

        EmailRequest emailRequest = EmailRequest.builder()
                .sender(Sender.builder()
                        .name(brevoConfig.getSender().getName())
                        .email(brevoConfig.getSender().getEmail())
                        .build())
                .to(List.of(request.getTo()))
                .subject(request.getSubject())
                .htmlContent(request.getHtmlContent())
                .build();
        try {
            log.debug("Email request: {}", emailRequest);
            EmailResponse response = emailClient.sendEmail(brevoConfig.getApiKey(), emailRequest);
            log.info("Email sent successfully with messageId: {}", response.getMessageId());
            return response;
        } catch (FeignException e){
            log.error("Failed to send email: {}", e.getMessage(), e);
            throw new AppException(ErrorCode.CANNOT_SEND_EMAIL);
        }
    }

    public EmailResponse sendOrderConfirmationEmail(OrderEmailRequest request) {
        log.info("Sending order confirmation email to: {}", request.getReceiverEmail());

        Recipient recipient = Recipient.builder()
                .name(request.getReceiverName())
                .email(request.getReceiverEmail())
                .build();

        // Format currency values using Vietnamese locale
        NumberFormat currencyFormatter = NumberFormat.getCurrencyInstance(new Locale("vi", "VN"));

        // Build HTML email content
        StringBuilder htmlContent = new StringBuilder();
        htmlContent.append("<div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;'>");

        // Header
        htmlContent.append("<div style='background-color: #f8f9fa; padding: 20px; text-align: center;'>");
        htmlContent.append("<h1 style='color: #0066cc;'>Hafasa Bookstore</h1>");
        htmlContent.append("</div>");

        // Greeting
        htmlContent.append("<div style='padding: 20px;'>");
        htmlContent.append("<p>Xin chào <strong>").append(request.getReceiverName()).append("</strong>,</p>");
        htmlContent.append("<p>Cảm ơn bạn đã đặt hàng tại Hafasa Bookstore. Đơn hàng của bạn đã được xác nhận.</p>");

        // Order details
        htmlContent.append("<h2>Chi tiết đơn hàng #").append(request.getOrderId()).append("</h2>");
        htmlContent.append("<p><strong>Phương thức thanh toán:</strong> ").append(request.getPaymentMethod()).append("</p>");
        htmlContent.append("<p><strong>Địa chỉ giao hàng:</strong> ").append(request.getAddress()).append("</p>");
        htmlContent.append("<p><strong>Số điện thoại:</strong> ").append(request.getReceiverPhone()).append("</p>");

        // Products table
        htmlContent.append("<table style='width: 100%; border-collapse: collapse; margin-top: 20px;'>");
        htmlContent.append("<tr style='background-color: #f8f9fa;'>");
        htmlContent.append("<th style='padding: 10px; text-align: left; border-bottom: 1px solid #ddd;'>Sản phẩm</th>");
        htmlContent.append("<th style='padding: 10px; text-align: center; border-bottom: 1px solid #ddd;'>Số lượng</th>");
        htmlContent.append("<th style='padding: 10px; text-align: right; border-bottom: 1px solid #ddd;'>Đơn giá</th>");
        htmlContent.append("<th style='padding: 10px; text-align: right; border-bottom: 1px solid #ddd;'>Thành tiền</th>");
        htmlContent.append("</tr>");

        for (OrderEmailRequest.OrderDetailDTO item : request.getOrderDetails()) {
            String formattedPrice = currencyFormatter.format(item.getPrice());
            String formattedTotal = currencyFormatter.format(item.getPrice() * item.getQuantity());

            htmlContent.append("<tr>");
            htmlContent.append("<td style='padding: 10px; border-bottom: 1px solid #ddd;'>");
            htmlContent.append("<div style='display: flex; align-items: center;'>");
            if (item.getBookThumbnail() != null && !item.getBookThumbnail().isEmpty()) {
                htmlContent.append("<img src='").append(item.getBookThumbnail()).append("' alt='").append(item.getBookTitle()).append("' style='width: 50px; margin-right: 10px;'>");
            }
            htmlContent.append("<div>").append(item.getBookTitle()).append("</div>");
            htmlContent.append("</div>");
            htmlContent.append("</td>");
            htmlContent.append("<td style='padding: 10px; text-align: center; border-bottom: 1px solid #ddd;'>").append(item.getQuantity()).append("</td>");
            htmlContent.append("<td style='padding: 10px; text-align: right; border-bottom: 1px solid #ddd;'>").append(formattedPrice).append("</td>");
            htmlContent.append("<td style='padding: 10px; text-align: right; border-bottom: 1px solid #ddd;'>").append(formattedTotal).append("</td>");
            htmlContent.append("</tr>");
        }

        // Order total
        htmlContent.append("<tr>");
        htmlContent.append("<td colspan='3' style='padding: 10px; text-align: right; font-weight: bold;'>Tổng cộng:</td>");
        htmlContent.append("<td style='padding: 10px; text-align: right; font-weight: bold;'>").append(currencyFormatter.format(request.getTotal())).append("</td>");
        htmlContent.append("</tr>");
        htmlContent.append("</table>");

        // Footer
        htmlContent.append("<p style='margin-top: 20px;'>Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua email hoặc số điện thoại.</p>");
        htmlContent.append("<p>Trân trọng,<br>Đội ngũ Hafasa Bookstore</p>");
        htmlContent.append("</div>");

        // Footer
        htmlContent.append("<div style='background-color: #f8f9fa; padding: 20px; text-align: center;'>");
        htmlContent.append("<p>© 2023 Hafasa Bookstore. All rights reserved.</p>");
        htmlContent.append("</div>");

        htmlContent.append("</div>");

        // Create and send email
        SendEmailRequest emailRequest = SendEmailRequest.builder()
                .to(recipient)
                .subject("Xác nhận đơn hàng #" + request.getOrderId() + " - Hafasa Bookstore")
                .htmlContent(htmlContent.toString())
                .build();

        return sendEmail(emailRequest);
    }

    /**
     * Sends an OTP email to the specified recipient
     * @param request the OTP request containing the recipient's email and name
     * @return the OTP response containing the token and expiry time
     */
    public OtpResponse sendOtpEmail(OtpRequest request) {
        log.info("Sending OTP email to: {}", request.getEmail());

        // Generate OTP
        String otp = otpUtil.generateOtp();

        // Create token
        String token = otpUtil.createToken(request.getEmail(), otp);

        // Get expiry time
        long expiryTime = otpUtil.getExpiryTimeFromToken(token);

        // Create recipient
        Recipient recipient = Recipient.builder()
                .name(request.getName())
                .email(request.getEmail())
                .build();

        // Build HTML email content
        StringBuilder htmlContent = new StringBuilder();
        htmlContent.append("<div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;'>");

        // Header
        htmlContent.append("<div style='background-color: #f8f9fa; padding: 20px; text-align: center;'>");
        htmlContent.append("<h1 style='color: #0066cc;'>Hafasa Bookstore</h1>");
        htmlContent.append("</div>");

        // Content
        htmlContent.append("<div style='padding: 20px;'>");
        htmlContent.append("<p>Xin chào <strong>").append(request.getName()).append("</strong>,</p>");
        htmlContent.append("<p>Mã xác thực OTP của bạn là:</p>");
        htmlContent.append("<div style='text-align: center; margin: 30px 0;'>");
        htmlContent.append("<div style='font-size: 32px; font-weight: bold; letter-spacing: 5px; background-color: #f0f0f0; padding: 15px; border-radius: 5px;'>").append(otp).append("</div>");
        htmlContent.append("</div>");
        htmlContent.append("<p>Mã này sẽ hết hạn sau 5 phút.</p>");
        htmlContent.append("<p>Nếu bạn không yêu cầu mã này, vui lòng bỏ qua email này.</p>");
        htmlContent.append("<p>Trân trọng,<br>Đội ngũ Hafasa Bookstore</p>");
        htmlContent.append("</div>");

        // Footer
        htmlContent.append("<div style='background-color: #f8f9fa; padding: 20px; text-align: center;'>");
        htmlContent.append("<p>© 2023 Hafasa Bookstore. All rights reserved.</p>");
        htmlContent.append("</div>");

        htmlContent.append("</div>");

        // Create and send email
        SendEmailRequest emailRequest = SendEmailRequest.builder()
                .to(recipient)
                .subject("Mã xác thực OTP - Hafasa Bookstore")
                .htmlContent(htmlContent.toString())
                .build();

        try {
            EmailResponse emailResponse = sendEmail(emailRequest);
            log.info("OTP email sent successfully with messageId: {}", emailResponse.getMessageId());

            return OtpResponse.builder()
                    .token(token)
                    .expiryTime(expiryTime)
                    .message("OTP sent successfully")
                    .build();
        } catch (Exception e) {
            log.error("Failed to send OTP email: {}", e.getMessage(), e);
            throw new AppException(ErrorCode.CANNOT_SEND_EMAIL);
        }
    }

    /**
     * Verifies an OTP against a token
     * @param request the OTP verification request containing the email, OTP, and token
     * @return true if the OTP is valid, false otherwise
     */
    public boolean verifyOtp(OtpVerificationRequest request) {
        log.info("Verifying OTP for email: {}", request.getEmail());
        return otpUtil.verifyOtp(request.getEmail(), request.getOtp(), request.getToken());
    }
}
