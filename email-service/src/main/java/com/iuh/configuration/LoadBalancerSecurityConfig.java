package com.iuh.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@Order(1) // Higher priority than the main security config
public class LoadBalancerSecurityConfig {

    @Bean
    SecurityFilterChain loadBalancerFilterChain(HttpSecurity http) throws Exception {
        http
            .securityMatcher("/lb-test/**") // Only apply this config to the load balancer test endpoint
            .authorizeHttpRequests(authorize -> authorize.anyRequest().permitAll())
            .csrf(AbstractHttpConfigurer::disable);
            
        return http.build();
    }
}