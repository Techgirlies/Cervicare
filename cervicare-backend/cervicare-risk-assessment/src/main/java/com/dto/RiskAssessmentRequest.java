package com.cervicare.risk.dto;

import java.util.Map;

public class RiskAssessmentRequest {
    private Map<String, Object> features;

    public Map<String, Object> getFeatures() {
        return features;
    }

    public void setFeatures(Map<String, Object> features) {
        this.features = features;
    }
}
