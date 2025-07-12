package com.cervicare.hospitalrecommender.dto;

import com.cervicare.entity.FacilityItem;
import java.util.List;
import java.util.Map;

public class RecommendationResponse {
    private String region;
    private Map<String, Double> averageMedicationPrices;
    private Map<String, Double> averageServicePrices;
    private List<FacilityItem> availableStock;

    public RecommendationResponse() {
        // Default constructor needed for JSON deserialization
    }

    public RecommendationResponse(String region, Map<String, Double> avgMeds,
                                  Map<String, Double> avgServices, List<FacilityItem> stock) {
        this.region = region;
        this.averageMedicationPrices = avgMeds;
        this.averageServicePrices = avgServices;
        this.availableStock = stock;
    }

    // ✅ Getters
    public String getRegion() {
        return region;
    }

    public Map<String, Double> getAverageMedicationPrices() {
        return averageMedicationPrices;
    }

    public Map<String, Double> getAverageServicePrices() {
        return averageServicePrices;
    }

    public List<FacilityItem> getAvailableStock() {
        return availableStock;
    }

    // ✅ Setters
    public void setRegion(String region) {
        this.region = region;
    }

    public void setAverageMedicationPrices(Map<String, Double> averageMedicationPrices) {
        this.averageMedicationPrices = averageMedicationPrices;
    }

    public void setAverageServicePrices(Map<String, Double> averageServicePrices) {
        this.averageServicePrices = averageServicePrices;
    }

    public void setAvailableStock(List<FacilityItem> availableStock) {
        this.availableStock = availableStock;
    }
}
