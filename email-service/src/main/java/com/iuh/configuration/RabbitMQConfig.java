package com.iuh.configuration;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    // Queue names
    public static final String ORDER_CONFIRMATION_QUEUE = "order-confirmation-queue";
    public static final String EMAIL_RATING_QUEUE = "email-rating-queue";
    
    // Exchange names
    public static final String EMAIL_EXCHANGE = "email-exchange";
    
    // Routing keys
    public static final String ORDER_CONFIRMATION_ROUTING_KEY = "order.confirmation";
    public static final String EMAIL_RATING_ROUTING_KEY = "email.rating";

    @Bean
    public Queue orderConfirmationQueue() {
        return new Queue(ORDER_CONFIRMATION_QUEUE, true);
    }

    @Bean
    public Queue emailRatingQueue() {
        return new Queue(EMAIL_RATING_QUEUE, true);
    }

    @Bean
    public DirectExchange emailExchange() {
        return new DirectExchange(EMAIL_EXCHANGE);
    }

    @Bean
    public Binding orderConfirmationBinding(Queue orderConfirmationQueue, DirectExchange emailExchange) {
        return BindingBuilder.bind(orderConfirmationQueue)
                .to(emailExchange)
                .with(ORDER_CONFIRMATION_ROUTING_KEY);
    }

    @Bean
    public Binding emailRatingBinding(Queue emailRatingQueue, DirectExchange emailExchange) {
        return BindingBuilder.bind(emailRatingQueue)
                .to(emailExchange)
                .with(EMAIL_RATING_ROUTING_KEY);
    }

    @Bean
    public MessageConverter jsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(jsonMessageConverter());
        return rabbitTemplate;
    }
}