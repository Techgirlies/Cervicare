package com.cervicare.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
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
    @Column(name = "category")
    private String category;

    @Column(nullable = true)
    private Double price;
    @Column(nullable = true)
    private Boolean insurance;

    // Optional convenience methods
    public void setCategory(String itemCategory) {
        this.item = itemCategory;
    }
    public String getCategory() {
        return category;
    }

    public void setStock(int stock) {
        this.availableStock = stock;
    }

    // ✅ Add the missing method
    public void setItemName(String itemName) {
        this.item = itemName;
    }

    public void setInsurance(Boolean insurance) {
        this.insurance = insurance;
    }

}
