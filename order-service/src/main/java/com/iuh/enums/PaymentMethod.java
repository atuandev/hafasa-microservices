package com.iuh.enums;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum PaymentMethod {
    @JsonProperty("COD")
    COD,
    @JsonProperty("PAYOS")
    PAYOS
}
