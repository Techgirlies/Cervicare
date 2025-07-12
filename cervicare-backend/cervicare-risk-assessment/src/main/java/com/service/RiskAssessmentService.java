package com.cervicare.risk.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class RiskAssessmentService {

    @Value("${ml.api.risk-url}")
    private String biopsyRiskUrl;

    @Value("${ml.api.recommendation-url}")
    private String recommendationUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public Map<String, Object> getRiskAndRecommendation(Map<String, Object> input) {
        Map<String, Object> result = new HashMap<>();

        try {
            // === 1. Call Biopsy Model ===
            Map<String, Object> biopsyResponse = restTemplate.postForObject(biopsyRiskUrl, input, Map.class);

            if (biopsyResponse != null && biopsyResponse.containsKey("probability_percent")) {
                double probability = Double.parseDouble(biopsyResponse.get("probability_percent").toString());
                result.put("biopsy_prediction", biopsyResponse.get("prediction"));
                result.put("biopsy_probability_percent", probability);
            } else {
                result.put("risk_error", "Biopsy prediction failed");
            }

            // === 2. Convert Biopsy input to Recommendation format ===
            Map<String, Object> mappedInput = mapToRecommendationFormat(input);

            // === 3. Call Recommendation Model ===
            Map<String, Object> recResponse = restTemplate.postForObject(recommendationUrl, mappedInput, Map.class);

            if (recResponse != null && recResponse.containsKey("recommended_action")) {
                result.put("recommended_action", recResponse.get("recommended_action"));
            } else {
                result.put("recommendation_error", "Recommendation prediction failed");
            }

        } catch (Exception e) {
            result.put("error", "Exception: " + e.getMessage());
        }

        return result;
    }
    private Map<String, Object> mapToRecommendationFormat(Map<String, Object> input) {
        Map<String, Object> recommendationInput = new HashMap<>();

        recommendationInput.put("Age", input.get("Age"));
        recommendationInput.put("Sexual_Partners", input.get("Number of sexual partners"));
        recommendationInput.put("First_Sexual_Activity_Age", input.get("First sexual intercourse"));

        recommendationInput.put("HPV_Test_Result", convertToYesNoOrNegative(input.get("HPV_Test_Result")));
        recommendationInput.put("Pap_Smear_Result", convertToYesNoOrNegative(input.get("Pap_Smear_Result")));
        recommendationInput.put("Smoking_Status", convertToYesNoOrNegative(input.get("Smoking_Status")));
        recommendationInput.put("STDs_History", convertToYesNoOrNegative(input.get("STDs_History")));
        recommendationInput.put("Screening_Type_Last", input.get("Screening_Type_Last"));

        return recommendationInput;
    }

    private String convertToYesNoOrNegative(Object value) {
        if (value == null) return "No";  // default safe fallback
        if (value instanceof Integer) {
            return ((Integer) value) == 1 ? "Yes" : "No";
        }
        if (value instanceof String) {
            String str = ((String) value).toLowerCase();
            if (str.equals("1") || str.equals("yes") || str.equals("positive")) return "Yes";
            if (str.equals("0") || str.equals("no") || str.equals("negative")) return "No";
            return str.substring(0, 1).toUpperCase() + str.substring(1); // Title case
        }
        return value.toString();
    }
}
