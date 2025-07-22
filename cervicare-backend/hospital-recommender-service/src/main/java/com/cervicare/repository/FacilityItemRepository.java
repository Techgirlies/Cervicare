package com.cervicare.repository;

import com.cervicare.entity.FacilityItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FacilityItemRepository extends JpaRepository<FacilityItem, Long> {
    List<FacilityItem> findByItemContainingIgnoreCase(String item);
    List<FacilityItem> findByRegionIgnoreCase(String region);
    List<FacilityItem> findByItemContainingIgnoreCaseAndRegionIgnoreCase(String item, String region);
    List<FacilityItem> findByItemContainingIgnoreCaseAndRegionIgnoreCaseAndInsuranceTrue(String item, String region);
}