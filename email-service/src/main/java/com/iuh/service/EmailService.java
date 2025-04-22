package com.iuh.service;

import com.iuh.dto.request.EmailRequest;
import com.iuh.dto.request.SendEmailRequest;
import com.iuh.dto.request.Sender;
import com.iuh.dto.response.EmailResponse;
import com.iuh.exception.AppException;
import com.iuh.exception.ErrorCode;
import com.iuh.repository.httpclient.EmailClient;
import feign.FeignException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class EmailService {
    EmailClient emailClient;

    String apiKey = "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";

    public EmailResponse sendEmail(SendEmailRequest request) {
        EmailRequest emailRequest = EmailRequest.builder()
                .sender(Sender.builder()
                        .name("Hafasa Bookstore")
                        .email("truong29042003@gmail.com")
                        .build())
                .to(List.of(request.getTo()))
                .subject(request.getSubject())
                .htmlContent(request.getHtmlContent())
                .build();
        try {
            return emailClient.sendEmail(apiKey, emailRequest);
        } catch (FeignException e){
            throw new AppException(ErrorCode.CANNOT_SEND_EMAIL);
        }
    }
}
