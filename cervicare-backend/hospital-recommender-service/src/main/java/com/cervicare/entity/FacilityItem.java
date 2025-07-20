package com.cervicare.entity;

import jakarta.persistence.*;
import lombok.*;
import jakarta.persistence.Table;

@Entity
@Table(name = "facility_item")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FacilityItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String region;
    private String ward;
    private String facilityName;
    private String kephLevel;
    private String owner;
    private String code;

    private String item;

    @Column(nullable = true)
    private Double cost;

    @Column(nullable = true)
    private Integer availableStock;

    @Column(nullable = true)
    private Double price;

    // Optional convenience methods
    public void setCategory(String itemCategory) {
        this.item = itemCategory;
    }

    public void setStock(int stock) {
        this.availableStock = stock;
    }
}
