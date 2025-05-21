package com.iuh.document;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Document(indexName = "books")
public class BookDocument {

    @Id
    String id;

    @Field(type = FieldType.Text, name = "title", analyzer = "standard")
    String title;

    @Field(type = FieldType.Keyword, name = "slug")
    String slug;

    @Field(type = FieldType.Text, name = "thumbnail")
    String thumbnail;

    @Field(type = FieldType.Text, name = "description", analyzer = "standard")
    String description;

    @Field(type = FieldType.Text, name = "author", analyzer = "standard")
    String author;

    @Field(type = FieldType.Text, name = "size")
    String size;

    @Field(type = FieldType.Integer, name = "pages")
    Integer pages;

    @Field(type = FieldType.Integer, name = "weight")
    Integer weight;

    @Field(type = FieldType.Integer, name = "publishYear")
    Integer publishYear;

    @Field(type = FieldType.Double, name = "importPrice")
    Double importPrice;

    @Field(type = FieldType.Double, name = "price")
    Double price;

    @Field(type = FieldType.Integer, name = "stock")
    Integer stock;

    @Field(type = FieldType.Integer, name = "sold")
    Integer sold;

    @Field(type = FieldType.Integer, name = "reviewCount")
    Integer reviewCount;

    @Field(type = FieldType.Double, name = "reviewStar")
    Double reviewStar;

    @Field(type = FieldType.Boolean, name = "isNew")
    Boolean isNew;

    @Field(type = FieldType.Boolean, name = "isFeatured")
    Boolean isFeatured;

    @Field(type = FieldType.Keyword, name = "status")
    String status;
    
    @Field(type = FieldType.Keyword, name = "category")
    String category;
    
    @Field(type = FieldType.Keyword, name = "publisher")
    String publisher;
}
