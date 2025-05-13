package com.iuh.service.impl;

import com.iuh.document.OrderDocument;
import com.iuh.entity.Order;
import com.iuh.mapper.OrderDocumentMapper;
import com.iuh.repository.OrderDocumentRepository;
import com.iuh.repository.OrderRepository;
import com.iuh.service.ElasticsearchService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class ElasticsearchServiceImpl implements ElasticsearchService {
    
    OrderDocumentRepository orderDocumentRepository;
    OrderRepository orderRepository;
    OrderDocumentMapper orderDocumentMapper;

    @Override
    public void saveOrder(OrderDocument orderDocument) {
        log.debug("Saving order to Elasticsearch: id={}", orderDocument.getId());
        try {
            orderDocumentRepository.save(orderDocument);
            log.debug("Order successfully saved to Elasticsearch: id={}", orderDocument.getId());
        } catch (Exception e) {
            log.error("Error saving order to Elasticsearch: id={}, error={}", orderDocument.getId(), e.getMessage(), e);
            // Don't propagate the exception - we don't want to fail the entire operation if Elasticsearch indexing fails
        }
    }

    @Override
    public void deleteOrder(String id) {
        log.debug("Deleting order from Elasticsearch: id={}", id);
        try {
            orderDocumentRepository.deleteById(id);
            log.debug("Order successfully deleted from Elasticsearch: id={}", id);
        } catch (Exception e) {
            log.error("Error deleting order from Elasticsearch: id={}, error={}", id, e.getMessage(), e);
            // Don't propagate the exception
        }
    }

    @Override
    public OrderDocument findById(String id) {
        log.debug("Finding order in Elasticsearch: id={}", id);
        try {
            Optional<OrderDocument> orderDocument = orderDocumentRepository.findById(id);
            if (orderDocument.isPresent()) {
                log.debug("Order found in Elasticsearch: id={}", id);
                return orderDocument.get();
            } else {
                log.debug("Order not found in Elasticsearch: id={}", id);
                return null;
            }
        } catch (Exception e) {
            log.error("Error finding order in Elasticsearch: id={}, error={}", id, e.getMessage(), e);
            return null;
        }
    }

    @Override
    public void syncAllOrdersWithElasticsearch() {
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
                log.debug("Deleted existing order documents from Elasticsearch");
            } catch (Exception e) {
                log.warn("Could not delete existing order documents: {}", e.getMessage());
                // Continue with save operation
            }
            
            // Save all documents
            orderDocumentRepository.saveAll(documents);
            log.info("Successfully reindexed {} orders to Elasticsearch", documents.size());
        } catch (Exception e) {
            log.error("Error during full reindex of orders to Elasticsearch: {}", e.getMessage(), e);
            // Don't propagate exception, just log it
        }
    }
}
