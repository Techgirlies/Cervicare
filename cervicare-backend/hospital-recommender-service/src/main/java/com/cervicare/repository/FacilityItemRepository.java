package com.cervicare.repository;

import com.cervicare.entity.FacilityItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FacilityItemRepository extends JpaRepository<FacilityItem, Long> {
    List<FacilityItem> findByRegionIgnoreCase(String region);  // ✅ Add this line
}
