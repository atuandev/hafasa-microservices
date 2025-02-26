package com.iuh.enums;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum BookStatus {
    @JsonProperty("DRAFT")
    DRAFT,
    @JsonProperty("ACTIVE")
    ACTIVE,
    @JsonProperty("DISABLED")
    DISABLED
}
