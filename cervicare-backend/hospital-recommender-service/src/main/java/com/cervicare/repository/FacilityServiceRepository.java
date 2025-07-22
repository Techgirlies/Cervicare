package com.cervicare.repository;

import com.cervicare.entity.FacilityService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FacilityServiceRepository extends JpaRepository<FacilityService, Long> {
    List<FacilityService> findByServiceContainingIgnoreCase(String service);
    List<FacilityService> findByRegionIgnoreCase(String region);
    List<FacilityService> findByServiceContainingIgnoreCaseAndRegionIgnoreCase(String service, String region);
    List<FacilityService> findByNhifCoveredTrueAndRegionIgnoreCase(String region);
}