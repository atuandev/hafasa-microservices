package com.iuh.document;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Document(indexName = "orders")
public class OrderDocument {

    @Id
    String id;

    @Field(type = FieldType.Text, name = "receiverName")
    String receiverName;

    @Field(type = FieldType.Text, name = "receiverPhone")
    String receiverPhone;

    @Field(type = FieldType.Text, name = "address")
    String address;

    @Field(type = FieldType.Keyword, name = "paymentMethod")
    String paymentMethod;

    @Field(type = FieldType.Keyword, name = "orderStatus")
    String orderStatus;

    @Field(type = FieldType.Double, name = "total")
    Double total;

    @Field(type = FieldType.Keyword, name = "userId")
    String userId;
    
    @Field(type = FieldType.Date, name = "createdAt")
    LocalDateTime createdAt;
    
    @Field(type = FieldType.Date, name = "updatedAt")
    LocalDateTime updatedAt;
    
    @Field(type = FieldType.Nested, name = "orderDetails")
    List<OrderDetailDocument> orderDetails;
    
    @Setter
    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @FieldDefaults(level = AccessLevel.PRIVATE)
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class OrderDetailDocument {
        
        @Field(type = FieldType.Integer, name = "quantity")
        Integer quantity;
        
        @Field(type = FieldType.Double, name = "price")
        Double price;
        
        @Field(type = FieldType.Keyword, name = "bookId")
        String bookId;
    }
}
