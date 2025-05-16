package com.iuh.filter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.loadbalancer.LoadBalancerProperties;
import org.springframework.cloud.client.loadbalancer.Response;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.cloud.loadbalancer.support.LoadBalancerClientFactory;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.net.URI;

import static org.springframework.cloud.gateway.support.ServerWebExchangeUtils.GATEWAY_REQUEST_URL_ATTR;

@Component
public class LoadBalancerLoggingFilter implements GlobalFilter, Ordered {

    private static final Logger log = LoggerFactory.getLogger(LoadBalancerLoggingFilter.class);
    private final LoadBalancerClientFactory clientFactory;

    public LoadBalancerLoggingFilter(LoadBalancerClientFactory clientFactory) {
        this.clientFactory = clientFactory;
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        URI uri = exchange.getAttribute(GATEWAY_REQUEST_URL_ATTR);
        
        if (uri != null && "lb".equals(uri.getScheme())) {
            String serviceName = uri.getHost();
            log.info("Request being load balanced: {} to service: {}", 
                    exchange.getRequest().getPath(),
                    serviceName);
            
            // The actual instance details will be logged by the service itself
            // when it receives the request, with the port information
        }
        
        return chain.filter(exchange);
    }

    @Override
    public int getOrder() {
        // Run this filter before the NettyRoutingFilter but after the LoadBalancerClientFilter
        return Ordered.LOWEST_PRECEDENCE - 1;
    }
}