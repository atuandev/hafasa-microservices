package com.iuh.repository.httpclient;

import com.iuh.dto.EmailApiResponse;
import com.iuh.dto.request.OtpRequest;
import com.iuh.dto.request.OtpVerificationRequest;
import com.iuh.dto.response.OtpResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(
        name = "email-service",
        path = "/email-service"
)
public interface EmailClient {
    @PostMapping("/email/otp/send")
    EmailApiResponse<OtpResponse> sendOtpEmail(@RequestBody OtpRequest request);

    @PostMapping("/email/otp/verify")
    EmailApiResponse<Boolean> verifyOtp(@RequestBody OtpVerificationRequest request);
}
