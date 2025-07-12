package com.cervicare.repository;

import java.util.List;
import com.cervicare.entity.FacilityService;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FacilityServiceRepository extends JpaRepository<FacilityService, Long> {
    List<FacilityService> findByRegionIgnoreCase(String region);
}
