package com.iuh.mapper;

import com.iuh.document.OrderDocument;
import com.iuh.entity.Order;
import com.iuh.entity.OrderDetail;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class OrderDocumentMapper {

    public OrderDocument toDocument(Order order) {
        if (order == null) {
            return null;
        }
        
        List<OrderDocument.OrderDetailDocument> orderDetailDocuments = 
            order.getOrderDetails() != null ? 
            order.getOrderDetails().stream()
                .map(this::toOrderDetailDocument)
                .collect(Collectors.toList()) : 
            new ArrayList<>();
        
        return OrderDocument.builder()
                .id(order.getId())
                .receiverName(order.getReceiverName())
                .receiverPhone(order.getReceiverPhone())
                .address(order.getAddress())
                .paymentMethod(order.getPaymentMethod().name())
                .orderStatus(order.getOrderStatus().name())
                .total(order.getTotal())
                .userId(order.getUserId())
                .createdAt(order.getCreatedAt())
                .updatedAt(order.getUpdatedAt())
                .orderDetails(orderDetailDocuments)
                .build();
    }
    
    private OrderDocument.OrderDetailDocument toOrderDetailDocument(OrderDetail orderDetail) {
        if (orderDetail == null) {
            return null;
        }
        
        return OrderDocument.OrderDetailDocument.builder()
                .quantity(orderDetail.getQuantity())
                .price(orderDetail.getPrice())
                .bookId(orderDetail.getBookId())
                .build();
    }

    public Order toEntity(OrderDocument document) {
        if (document == null) {
            return null;
        }
        
        Order order = new Order();
        order.setId(document.getId());
        order.setReceiverName(document.getReceiverName());
        order.setReceiverPhone(document.getReceiverPhone());
        order.setAddress(document.getAddress());
        order.setPaymentMethod(com.iuh.enums.PaymentMethod.valueOf(document.getPaymentMethod()));
        order.setOrderStatus(com.iuh.enums.OrderStatus.valueOf(document.getOrderStatus()));
        order.setTotal(document.getTotal());
        order.setUserId(document.getUserId());
        order.setCreatedAt(document.getCreatedAt());
        order.setUpdatedAt(document.getUpdatedAt());
        
        if (document.getOrderDetails() != null) {
            document.getOrderDetails().forEach(detailDoc -> {
                OrderDetail detail = new OrderDetail();
                detail.setBookId(detailDoc.getBookId());
                detail.setPrice(detailDoc.getPrice());
                detail.setQuantity(detailDoc.getQuantity());
                order.addOrderDetail(detail);
            });
        }
        
        return order;
    }
}
