package com.iuh.configuration;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
@ConfigurationProperties(prefix = "brevo")
public class BrevoConfig {
    private String apiKey;
    private Sender sender = new Sender();

    @Data
    public static class Sender {
        private String name;
        private String email;
    }
}