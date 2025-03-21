package com.iuh.configuration;

import feign.RequestInterceptor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

@Slf4j
@Configuration
public class AuthenticationRequestInterceptor {
    @Bean
    RequestInterceptor requestInterceptor() {
        return requestTemplate -> {
            if (SecurityContextHolder.getContext().getAuthentication() instanceof JwtAuthenticationToken token) {
                requestTemplate.header("Authorization", "Bearer " + token.getToken().getTokenValue());
            }
        };
    }
}
