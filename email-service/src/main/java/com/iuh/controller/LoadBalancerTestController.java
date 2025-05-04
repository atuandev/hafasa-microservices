package com.iuh.controller;

import com.iuh.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Tag(name = "Load Balancer Test Controller")
@RestController
@RequestMapping("/lb-test")
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@Slf4j
public class LoadBalancerTestController {
    
    // Generate a unique ID for this instance
    final String instanceId = UUID.randomUUID().toString().substring(0, 8);
    
    @Value("${server.port}")
    String serverPort;
    
    @Value("${spring.application.name}")
    String applicationName;
    
    @Operation(summary = "Test load balancing")
    @GetMapping
    public ApiResponse<Map<String, String>> testLoadBalancer() {
        String hostname;
        try {
            hostname = InetAddress.getLocalHost().getHostName();
        } catch (UnknownHostException e) {
            hostname = "unknown";
        }
        
        log.info("Load balancer test called on [{}:{}], instance: {}, hostname: {}", 
                applicationName, serverPort, instanceId, hostname);
        
        Map<String, String> instanceInfo = new HashMap<>();
        instanceInfo.put("service", applicationName);
        instanceInfo.put("port", serverPort);
        instanceInfo.put("instanceId", instanceId);
        instanceInfo.put("hostname", hostname);
        
        return ApiResponse.<Map<String, String>>builder()
                .message("Load balancer test successful")
                .result(instanceInfo)
                .build();
    }
}