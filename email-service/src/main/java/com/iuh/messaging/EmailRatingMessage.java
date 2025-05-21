package com.iuh.messaging;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * Message class for email ratings
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmailRatingMessage implements Serializable {
    
    private String messageId;
    private int rating;
}