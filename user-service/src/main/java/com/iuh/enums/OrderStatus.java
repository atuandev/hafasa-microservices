package com.iuh.enums;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum OrderStatus {
    @JsonProperty("PENDING")
    PENDING,
    @JsonProperty("CONFIRMED")
    CONFIRMED,
    @JsonProperty("SHIPPING")
    SHIPPING,
    @JsonProperty("DELIVERED")
    DELIVERED,
    @JsonProperty("CANCELLED")
    CANCELLED
}
