package com.iuh.repository;

import com.iuh.document.OrderDocument;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderDocumentRepository extends ElasticsearchRepository<OrderDocument, String> {
    // You can add custom query methods here if needed
}
