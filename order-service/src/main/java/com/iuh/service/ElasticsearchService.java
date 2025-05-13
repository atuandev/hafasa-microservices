package com.iuh.service;

import com.iuh.document.OrderDocument;

/**
 * Service for handling Elasticsearch operations related to orders
 */
public interface ElasticsearchService {
    
    /**
     * Save an order document to Elasticsearch
     * 
     * @param orderDocument the order document to save
     */
    void saveOrder(OrderDocument orderDocument);
    
    /**
     * Delete an order document from Elasticsearch
     * 
     * @param id the ID of the order to delete
     */
    void deleteOrder(String id);
    
    /**
     * Find an order by ID in Elasticsearch
     * 
     * @param id the ID of the order to find
     * @return the order document if found, null otherwise
     */
    OrderDocument findById(String id);
    
    /**
     * Sync all orders from database to Elasticsearch
     */
    void syncAllOrdersWithElasticsearch();
}
