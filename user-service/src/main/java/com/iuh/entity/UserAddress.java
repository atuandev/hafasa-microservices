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

    @Column(name = "receiver_name")
    String receiverName;

    @Column(name = "receiver_phone")
    String receiverPhone;

    @Column(name = "address")
    String address;

    @ManyToOne()
    @JoinColumn(name = "user_id")
    User user;
}
