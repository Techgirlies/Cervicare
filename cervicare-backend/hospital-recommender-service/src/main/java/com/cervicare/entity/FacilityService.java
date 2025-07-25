package com.cervicare.entity;

import jakarta.persistence.*;

@Entity
public class FacilityService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String facility;
    private String region;
    private String category;
    private String service;

    @Column(nullable = true)
    private Double baseCost;

    @Column(nullable = true)
    private Boolean nhifCovered;

    @Column(nullable = true)
    private Double insuranceCopay;

    @Column(nullable = true)
    private Double outOfPocket;

    // === Getters ===
    public Long getId() {
        return id;
    }

    public String getFacility() {
        return facility;
    }

    public String getRegion() {
        return region;
    }

    public String getCategory() {
        return category;
    }

    public String getService() {
        return service;
    }

    public Double getBaseCost() {
        return baseCost;
    }

    public Boolean getNhifCovered() {
        return nhifCovered;
    }

    public Double getInsuranceCopay() {
        return insuranceCopay;
    }

    public Double getOutOfPocket() {
        return outOfPocket;
    }

    // === Setters (optional but useful for JPA) ===
    public void setId(Long id) {
        this.id = id;
    }

    public void setFacility(String facility) {
        this.facility = facility;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setService(String service) {
        this.service = service;
    }

    public void setBaseCost(Double baseCost) {
        this.baseCost = baseCost;
    }

    public void setNhifCovered(Boolean nhifCovered) {
        this.nhifCovered = nhifCovered;
    }

    public void setInsuranceCopay(Double insuranceCopay) {
        this.insuranceCopay = insuranceCopay;
    }

    public void setOutOfPocket(Double outOfPocket) {
        this.outOfPocket = outOfPocket;
    }
}
