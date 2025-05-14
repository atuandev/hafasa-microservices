package com.iuh.configuration;

import com.iuh.document.OrderDocument;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class ElasticsearchConnectionChecker implements CommandLineRunner {

    private final ElasticsearchOperations elasticsearchOperations;

    public ElasticsearchConnectionChecker(ElasticsearchOperations elasticsearchOperations) {
        this.elasticsearchOperations = elasticsearchOperations;
    }

    @Override
    public void run(String... args) throws Exception {
        try {
            log.info("Testing Elasticsearch connection...");
            
            // Check if Elasticsearch is up by checking the cluster health
            boolean isConnected = elasticsearchOperations.indexOps(OrderDocument.class).exists();
            
            log.info("Elasticsearch connection test result: {}", 
                    isConnected ? "CONNECTED" : "CONNECTION FAILED");
            
        } catch (Exception e) {
            log.error("Failed to connect to Elasticsearch", e);
            // Don't fail application startup if Elasticsearch is unavailable
            // Just log the error
        }
    }
}
