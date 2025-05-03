package com.iuh.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
public class LoadBalancerTestController {

    private final String instanceId = UUID.randomUUID().toString().substring(0, 8);
    
    @Value("${server.port}")
    private String serverPort;

    @GetMapping("/lb-test")
    public Map<String, String> testLoadBalancer() {
        Map<String, String> response = new HashMap<>();
        
        String hostname;
        try {
            hostname = InetAddress.getLocalHost().getHostName();
        } catch (UnknownHostException e) {
            hostname = "unknown";
        }
        
        response.put("message", "Response from payment-service instance");
        response.put("port", serverPort);
        response.put("hostname", hostname);
        response.put("instanceId", instanceId);
        
        System.out.println("Request received at payment-service on port: " + serverPort + ", instance: " + instanceId);
        return response;
    }
}