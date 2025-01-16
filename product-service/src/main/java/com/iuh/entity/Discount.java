package com.iuh.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "discounts")
public class Discount extends AbstractEntity {

    String name;

    @Column(unique = true)
    String code;

    Integer percent;

    LocalDate startDate;

    LocalDate endDate;

    public boolean isValid() {
        LocalDate now = LocalDate.now();
        return (startDate == null || !now.isBefore(startDate)) && (endDate == null || !now.isAfter(endDate));
    }
}
