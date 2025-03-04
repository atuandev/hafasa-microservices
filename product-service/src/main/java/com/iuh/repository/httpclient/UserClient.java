package com.iuh.repository.httpclient;

import com.iuh.dto.ApiResponse;
import com.iuh.dto.request.IntrospectRequest;
import com.iuh.dto.response.IntrospectResponse;
import feign.RequestInterceptor;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(
        name = "user-service",
        url = "${app.services.user-service}",
        configuration = { RequestInterceptor.class }
)
public interface UserClient {
    @PostMapping(value = "/auth/introspect", produces = MediaType.APPLICATION_JSON_VALUE)
    ApiResponse<IntrospectResponse> introspect(@RequestBody IntrospectRequest request);
}
