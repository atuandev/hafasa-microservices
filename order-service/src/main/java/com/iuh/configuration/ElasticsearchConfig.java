package com.iuh.configuration;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.json.jackson.JacksonJsonpMapper;
import co.elastic.clients.transport.ElasticsearchTransport;
import co.elastic.clients.transport.rest_client.RestClientTransport;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpHost;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.conn.ssl.NoopHostnameVerifier;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.elasticsearch.client.ClientConfiguration;
import org.springframework.data.elasticsearch.client.elc.ElasticsearchClients;
import org.springframework.data.elasticsearch.client.elc.ElasticsearchConfiguration;
import org.springframework.data.elasticsearch.client.elc.ElasticsearchTemplate;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.convert.ElasticsearchConverter;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;

@Slf4j
@Configuration
@EnableElasticsearchRepositories(basePackages = "com.iuh.repository")
public class ElasticsearchConfig extends ElasticsearchConfiguration {
    
    @Value("${spring.elasticsearch.uris}")
    private String elasticsearchUrl;

    @Override
    public ClientConfiguration clientConfiguration() {
        try {
            String hostAndPort = elasticsearchUrl.replace("http://", "");
            log.info("Configuring Elasticsearch client with URL: {}", hostAndPort);
            
            return ClientConfiguration.builder()
                    .connectedTo(hostAndPort)
                    .withConnectTimeout(5000)
                    .withSocketTimeout(30000)
                    .build();
            
        } catch (Exception e) {
            log.error("Error configuring Elasticsearch client", e);
            throw new RuntimeException("Failed to configure Elasticsearch client", e);
        }
    }

    // Override the operations to add more error handling
    @Bean
    @Override
    public ElasticsearchOperations elasticsearchOperations(ElasticsearchConverter elasticsearchConverter, 
                                                          ElasticsearchClient elasticsearchClient) {
        try {
            log.info("Creating ElasticsearchOperations with client: {}", elasticsearchClient);
            return new ElasticsearchTemplate(elasticsearchClient, elasticsearchConverter);
        } catch (Exception e) {
            log.error("Error creating ElasticsearchOperations", e);
            throw new RuntimeException("Failed to create ElasticsearchOperations", e);
        }
    }

    /**
     * Create a bean named 'elasticsearchTemplate' for backward compatibility
     * This is needed because some older Spring Data Elasticsearch code might be 
     * looking for a bean with this specific name.
     */
    @Bean(name = "elasticsearchTemplate")
    public ElasticsearchOperations elasticsearchTemplate(ElasticsearchConverter converter, 
                                                        ElasticsearchClient client) {
        try {
            log.info("Creating elasticsearchTemplate bean for backward compatibility");
            return new ElasticsearchTemplate(client, converter);
        } catch (Exception e) {
            log.error("Error creating elasticsearchTemplate bean", e);
            throw new RuntimeException("Failed to create elasticsearchTemplate bean", e);
        }
    }
}
