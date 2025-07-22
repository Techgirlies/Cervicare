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
}
