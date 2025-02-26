package com.iuh.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "categories")
@ToString(callSuper = true)
public class Category extends AbstractEntity {
    @Column(unique = true)
    String name;

    @Column(unique = true)
    String slug;

    @Column(columnDefinition = "TEXT")
    String description;
}
