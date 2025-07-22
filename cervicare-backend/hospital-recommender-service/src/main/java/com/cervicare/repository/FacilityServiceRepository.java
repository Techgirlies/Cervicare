package com.cervicare.repository;

import com.cervicare.entity.FacilityService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface FacilityServiceRepository extends JpaRepository<FacilityService, Long> {

    @Query("SELECT s FROM FacilityService s WHERE " +
            "(:region IS NULL OR LOWER(s.region) = LOWER(:region)) AND " +
            "((LOWER(s.service) LIKE %:query%) OR (LOWER(s.category) LIKE %:query%)) AND " +
            "(:budget IS NULL OR s.baseCost <= :budget) AND " +
            "(:insurance IS NULL OR s.nhifCovered = :insurance)")
    List<FacilityService> findSmartServices(String query, String region, Double budget, Boolean insurance);
}
