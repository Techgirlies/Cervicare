package com.cervicare.risk.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class RiskAssessmentService {

    @Value("${ml.api.risk-url}")  // e.g. http://localhost:8086/api/predict-biopsy
    private String biopsyRiskUrl;

    @Value("${ml.api.recommendation-url}")  // e.g. http://localhost:8086/api/predict-recommendation
    private String recommendationUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public Map<String, Object> getRiskAndRecommendation(Map<String, Object> features) {
        Map<String, Object> result = new HashMap<>();

        try {
            // === 1. Call Biopsy Risk Prediction API ===
            Map<String, Object> biopsyResponse = restTemplate.postForObject(biopsyRiskUrl, features, Map.class);

            if (biopsyResponse != null && biopsyResponse.containsKey("probability_percent")) {
                double probability = Double.parseDouble(biopsyResponse.get("probability_percent").toString());
                String riskLevel = getRiskLevel(probability);

                result.put("biopsy_prediction", biopsyResponse.get("prediction"));
                result.put("biopsy_probability_percent", probability);
                result.put("risk_level", riskLevel);
            } else {
                result.put("risk_error", "Failed to get biopsy prediction");
            }

            // === 2. Call Recommendation API ===
            Map<String, Object> recommendationResponse = restTemplate.postForObject(recommendationUrl, features, Map.class);

            if (recommendationResponse != null && recommendationResponse.containsKey("recommended_action")) {
                result.put("recommended_action", recommendationResponse.get("recommended_action"));
                result.put("confidence", recommendationResponse.get("confidence"));
            } else {
                result.put("recommendation_error", "Failed to get screening recommendation");
            }

        } catch (Exception e) {
            result.put("error", "Exception occurred: " + e.getMessage());
        }

        return result;
    }

    private String getRiskLevel(double probability) {
        if (probability >= 70.0) return "High Risk";
        else if (probability >= 40.0) return "Moderate Risk";
        else return "Low Risk";
    }
}
