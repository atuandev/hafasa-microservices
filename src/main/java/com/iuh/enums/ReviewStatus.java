package com.iuh.enums;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum ReviewStatus {
    @JsonProperty("PENDING")
    PENDING,
    @JsonProperty("ACTIVE")
    ACTIVE,
    @JsonProperty("DISABLED")
    DISABLED
}
