package com.cervicare.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FacilityService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String facilityCode;
    private String service;
    private String serviceCategory;

    @Column(nullable = true)
    private Double baseCost;

    private String facility;
    private String region;
    private String category;

    @Column(nullable = true)
    private Boolean nhifCovered;

    @Column(nullable = true)
    private Double insuranceCopay;

    @Column(nullable = true)
    private Double outOfPocket;

    // Optional convenience setters
    public void setFacility(String facility) { this.facility = facility; }
    public void setRegion(String region) { this.region = region; }
    public void setCategory(String category) { this.category = category; }
}
