package com.iuh.filter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.cloud.gateway.route.Route;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.util.Collections;
import java.util.Set;

import static org.springframework.cloud.gateway.support.ServerWebExchangeUtils.GATEWAY_ORIGINAL_REQUEST_URL_ATTR;
import static org.springframework.cloud.gateway.support.ServerWebExchangeUtils.GATEWAY_REQUEST_URL_ATTR;
import static org.springframework.cloud.gateway.support.ServerWebExchangeUtils.GATEWAY_ROUTE_ATTR;

@Component
public class RouteLoggingFilter implements GlobalFilter {

    private static final Logger log = LoggerFactory.getLogger(RouteLoggingFilter.class);

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        // Log request before routing
        Set<URI> originalUris = exchange.getAttributeOrDefault(GATEWAY_ORIGINAL_REQUEST_URL_ATTR, Collections.emptySet());
        String originalUri = originalUris.isEmpty() ? "Unknown" : originalUris.iterator().next().toString();
        
        Route route = exchange.getAttribute(GATEWAY_ROUTE_ATTR);
        URI targetUri = exchange.getAttribute(GATEWAY_REQUEST_URL_ATTR);
        
        log.info("API Gateway routing request: {} -> {}, routeId: {}", 
                originalUri, 
                targetUri, 
                route != null ? route.getId() : "Unknown");
        
        return chain.filter(exchange)
            .then(Mono.fromRunnable(() -> {
                // Log after routing is complete (response)
                log.info("API Gateway completed routing: {} -> {}, status: {}", 
                    originalUri, 
                    targetUri, 
                    exchange.getResponse().getStatusCode());
            }));
    }
}