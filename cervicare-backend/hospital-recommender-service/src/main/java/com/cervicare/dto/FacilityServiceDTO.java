package com.cervicare.dto;

import lombok.Data;

@Data
public class FacilityServiceDTO {
    private String service;
    private String facility;
    private Double baseCost;
    private String region;
}
