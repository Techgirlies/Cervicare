package com.cervicare.dto;

public class FacilityResourceDto {
    private String itemOrService;
    private String category;
    private String facilityName;
    private String region;
    private Double cost;
    private Boolean insurance;

    // Constructors
    public FacilityResourceDto() {}

    public FacilityResourceDto(String itemOrService, String category, String facilityName, String region, Double cost, Boolean insurance) {
        this.itemOrService = itemOrService;
        this.category = category;
        this.facilityName = facilityName;
        this.region = region;
        this.cost = cost;
        this.insurance = insurance;
    }

    // Getters and setters

    public String getItemOrService() {
        return itemOrService;
    }

    public void setItemOrService(String itemOrService) {
        this.itemOrService = itemOrService;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getFacilityName() {
        return facilityName;
    }

    public void setFacilityName(String facilityName) {
        this.facilityName = facilityName;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public Double getCost() {
        return cost;
    }

    public void setCost(Double cost) {
        this.cost = cost;
    }

    public Boolean getInsurance() {
        return insurance;
    }

    public void setInsurance(Boolean insurance) {
        this.insurance = insurance;
    }
}
