package com.iuh.service.impl;

import com.iuh.document.OrderDocument;
import com.iuh.dto.request.BookUpdateStockRequest;
import com.iuh.dto.request.OrderCreationRequest;
import com.iuh.dto.request.OrderDetailRequest;
import com.iuh.dto.response.BookResponseAdmin;
import com.iuh.dto.response.OrderResponse;
import com.iuh.dto.response.PageResponse;
import com.iuh.entity.Order;
import com.iuh.entity.OrderDetail;
import com.iuh.enums.OrderStatus;
import com.iuh.exception.AppException;
import com.iuh.exception.ErrorCode;
import com.iuh.mapper.OrderDocumentMapper;
import com.iuh.mapper.OrderMapper;
import com.iuh.repository.OrderDocumentRepository;
import com.iuh.repository.OrderRepository;
import com.iuh.repository.httpclient.BookClient;
import com.iuh.service.OrderService;
import com.iuh.util.PageUtil;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class OrderServiceImpl implements OrderService {
    OrderRepository orderRepository;
    OrderDocumentRepository orderDocumentRepository;
    OrderMapper orderMapper;
    BookClient bookClient;
    OrderDocumentMapper orderDocumentMapper;

    @Override
    @Transactional
    public OrderResponse save(OrderCreationRequest request) {
        log.info("Creating new order for user: {}", request.getUserId());
        log.debug("OrderCreationRequest details: {}", request);

        Order order = orderMapper.toOrder(request);

        try {
            List<BookUpdateStockRequest> updateRequests = request.getOrderDetails().stream()
                    .map(detail -> BookUpdateStockRequest.builder()
                            .bookId(detail.getBookId())
                            .quantity(detail.getQuantity())
                            .build())
                    .toList();

            log.debug("Sending book stock update requests: {}", updateRequests);

            List<BookResponseAdmin> updatedBooks = bookClient.updateBooks(updateRequests).getData();

            log.debug("Received updated book responses: {}", updatedBooks);

            for (int i = 0; i < updatedBooks.size(); i++) {
                BookResponseAdmin book = updatedBooks.get(i);
                OrderDetailRequest detailRequest = request.getOrderDetails().get(i);

                order.addOrderDetail(OrderDetail.builder()
                        .bookId(book.getId())
                        .price(detailRequest.getPrice())
                        .quantity(detailRequest.getQuantity())
                        .build());
            }            Order savedOrder = orderRepository.save(order);
            log.info("Order saved successfully with ID: {}", savedOrder.getId());
            findAllOrders(0, 10, "createdAt:desc");
            // Save to Elasticsearch
            try {
                OrderDocument orderDocument = orderDocumentMapper.toDocument(savedOrder);
                orderDocumentRepository.save(orderDocument);
                log.debug("Order indexed successfully in Elasticsearch: {}", savedOrder.getId());
            } catch (Exception e) {
                log.error("Error indexing order in Elasticsearch: {}", e.getMessage(), e);
                // Continue anyway - we don't want to fail the operation if Elasticsearch indexing fails
            }

            return orderMapper.toOrderResponse(savedOrder);
        } catch (Exception e) {
            log.error("Error creating order for user: {}", request.getUserId(), e);
            throw new AppException(ErrorCode.ORDER_CREATE_ERROR);
        }
    }

    @Override
    public OrderResponse findById(String id) {
        log.info("Fetching order with ID: {}", id);

        // Fallback to database
        Order order = getOrderById(id);
        log.debug("Found order in database: {}", order);
        
        return orderMapper.toOrderResponse(order);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public PageResponse<Object> findAllOrders(int pageNo, int pageSize, String sortBy) {
        log.info("Fetching all orders - pageNo: {}, pageSize: {}, sortBy: {}", pageNo, pageSize, sortBy);
        Pageable pageable = PageUtil.getPageable(pageNo, pageSize, sortBy);

        Page<Order> orders = orderRepository.findAll(pageable);
        log.debug("Fetched {} orders", orders.getTotalElements());

        // Synchronize with Elasticsearch if this is the first page and no filters
        if (pageNo == 0) {
            try {
                log.debug("Synchronizing orders with Elasticsearch");
                // Batch process orders to Elasticsearch
                List<OrderDocument> orderDocuments = orders.getContent().stream()
                        .map(orderDocumentMapper::toDocument)
                        .toList();
                
                // Save documents to Elasticsearch
                orderDocuments.forEach(orderDocumentRepository::save);
                log.debug("Successfully synchronized {} orders with Elasticsearch", orderDocuments.size());
            } catch (Exception e) {
                log.error("Error synchronizing orders with Elasticsearch: {}", e.getMessage(), e);
                // Continue anyway - we don't want to fail the operation if Elasticsearch indexing fails
            }
        }

        List<OrderResponse> items = orders.map(orderMapper::toOrderResponse).getContent();

        return PageUtil.getPageResponse(pageable, orders, items);
    }

    @Override
    public PageResponse<Object> findAllByUserId(String userId, int pageNo, int pageSize, String sortBy) {
        log.info("Fetching orders for user: {} - pageNo: {}, pageSize: {}, sortBy: {}", userId, pageNo, pageSize, sortBy);
        Pageable pageable = PageUtil.getPageable(pageNo, pageSize, sortBy);

        Page<Order> orders = orderRepository.findAllByUserId(userId, pageable);
        log.debug("Fetched {} orders for user: {}", orders.getTotalElements(), userId);

        // Optional: Sync these orders with Elasticsearch to ensure they are up to date
        if (pageNo == 0 && orders.getNumberOfElements() > 0) {
            try {
                log.debug("Synchronizing user's orders with Elasticsearch");
                List<OrderDocument> orderDocuments = orders.getContent().stream()
                        .map(orderDocumentMapper::toDocument)
                        .toList();
                
                // Save documents to Elasticsearch
                orderDocuments.forEach(orderDocumentRepository::save);
                log.debug("Successfully synchronized {} user orders with Elasticsearch", orderDocuments.size());
            } catch (Exception e) {
                log.error("Error synchronizing user orders with Elasticsearch: {}", e.getMessage(), e);
                // Continue anyway - we don't want to fail the operation if Elasticsearch indexing fails
            }
        }

        List<OrderResponse> items = orders.map(orderMapper::toOrderResponse).getContent();

        return PageUtil.getPageResponse(pageable, orders, items);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public void changeStatus(String id, OrderStatus status) {
        log.info("Changing order status - orderId: {}, newStatus: {}", id, status);
        Order order = getOrderById(id);
        order.setOrderStatus(status);
        orderRepository.save(order);
        
        // Update in Elasticsearch
        try {
            OrderDocument orderDocument = orderDocumentMapper.toDocument(order);
            orderDocumentRepository.save(orderDocument);
            log.debug("Order status updated successfully in Elasticsearch - orderId: {}", id);
        } catch (Exception e) {
            log.error("Error updating order status in Elasticsearch - orderId: {}, error: {}", id, e.getMessage(), e);
            // Continue anyway - we don't want to fail the operation if Elasticsearch indexing fails
        }
        
        log.info("Order status updated successfully - orderId: {}", id);
    }

    /**
     * Scheduled task to synchronize order data with Elasticsearch
     * Runs at midnight every day
     */
    @Scheduled(cron = "0 0 0 * * ?") // Runs at midnight every day
    public void syncOrdersWithElasticsearch() {
        try {
            log.info("Performing full reindex of all orders to Elasticsearch");
            // Get all orders from the database
            List<Order> allOrders = orderRepository.findAll();
            log.debug("Found {} orders in database for full reindex", allOrders.size());

            // Convert orders to documents
            List<OrderDocument> documents = allOrders.stream()
                    .map(orderDocumentMapper::toDocument)
                    .toList();

            // Delete existing index to ensure clean state
            try {
                orderDocumentRepository.deleteAll();
                log.debug("Deleted existing documents from Elasticsearch");
            } catch (Exception e) {
                log.warn("Could not delete existing documents: {}", e.getMessage());
                // Continue with save operation
            }

            // Save all documents
            orderDocumentRepository.saveAll(documents);
            log.info("Successfully reindexed {} orders to Elasticsearch", documents.size());
        } catch (Exception e) {
            log.error("Error during full reindex to Elasticsearch: {}", e.getMessage(), e);
            // Don't propagate exception, just log it
        }
    }

    private Order getOrderById(String id) {
        log.debug("Retrieving order by ID: {}", id);
        return orderRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("Order not found with ID: {}", id);
                    return new AppException(ErrorCode.ORDER_NOT_FOUND);
                });
    }
}
