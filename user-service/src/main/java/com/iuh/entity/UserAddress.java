package com.iuh.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "addresses")
public class UserAddress extends AbstractEntity {

    String receiverName;

    String receiverPhone;

    String address;

    @ManyToOne()
    @JoinColumn(name = "user_id")
    User user;
}
