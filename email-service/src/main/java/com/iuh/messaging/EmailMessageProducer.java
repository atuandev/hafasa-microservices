package com.iuh.messaging;

import com.iuh.configuration.RabbitMQConfig;
import com.iuh.dto.request.OrderEmailRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class EmailMessageProducer {

    private final RabbitTemplate rabbitTemplate;

    /**
     * Sends an order confirmation email request to the RabbitMQ queue
     * 
     * @param request The order email request containing order details
     */
    public void sendOrderConfirmationEmail(OrderEmailRequest request) {
        log.info("Sending order confirmation email request to queue for order: {}", request.getOrderId());
        rabbitTemplate.convertAndSend(
            RabbitMQConfig.EMAIL_EXCHANGE,
            RabbitMQConfig.ORDER_CONFIRMATION_ROUTING_KEY,
            request
        );
        log.info("Order confirmation email request sent to queue for order: {}", request.getOrderId());
    }

    /**
     * Sends an email rating to the RabbitMQ queue
     * 
     * @param messageId The ID of the email message
     * @param rating The rating given to the email (1-5)
     */
    public void sendEmailRating(String messageId, int rating) {
        log.info("Sending email rating to queue for message: {}, rating: {}", messageId, rating);
        EmailRatingMessage ratingMessage = new EmailRatingMessage(messageId, rating);
        rabbitTemplate.convertAndSend(
            RabbitMQConfig.EMAIL_EXCHANGE,
            RabbitMQConfig.EMAIL_RATING_ROUTING_KEY,
            ratingMessage
        );
        log.info("Email rating sent to queue for message: {}", messageId);
    }
}