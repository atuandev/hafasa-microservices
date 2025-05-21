package com.iuh.messaging;

import com.iuh.configuration.RabbitMQConfig;
import com.iuh.dto.request.OrderEmailRequest;
import com.iuh.service.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

/**
 * Consumer for email-related messages from RabbitMQ
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class EmailMessageConsumer {

    private final EmailService emailService;

    /**
     * Consumes order confirmation email requests from the queue
     * 
     * @param request The order email request containing order details
     */
    @RabbitListener(queues = RabbitMQConfig.ORDER_CONFIRMATION_QUEUE)
    public void consumeOrderConfirmationEmail(OrderEmailRequest request) {
        log.info("Received order confirmation email request from queue for order: {}", request.getOrderId());
        try {
            emailService.sendOrderConfirmationEmail(request);
            log.info("Successfully processed order confirmation email for order: {}", request.getOrderId());
        } catch (Exception e) {
            log.error("Error processing order confirmation email for order: {}", request.getOrderId(), e);
            // In a production environment, you might want to implement retry logic or dead letter queue
        }
    }

    /**
     * Consumes email rating messages from the queue
     * 
     * @param ratingMessage The email rating message
     */
    @RabbitListener(queues = RabbitMQConfig.EMAIL_RATING_QUEUE)
    public void consumeEmailRating(EmailRatingMessage ratingMessage) {
        log.info("Received email rating from queue for message: {}, rating: {}", 
                ratingMessage.getMessageId(), ratingMessage.getRating());
        
        // Here you would typically store the rating in a database
        // For now, we'll just log it
        log.info("Email rating recorded for message: {}, rating: {}", 
                ratingMessage.getMessageId(), ratingMessage.getRating());
    }
}