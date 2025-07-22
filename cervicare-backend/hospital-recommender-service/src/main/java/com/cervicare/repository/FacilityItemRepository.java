package com.cervicare.repository;

import com.cervicare.entity.FacilityItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface FacilityItemRepository extends JpaRepository<FacilityItem, Long> {

    List<FacilityItem> findByItemContainingIgnoreCase(String item);

    List<FacilityItem> findByRegionIgnoreCaseAndItemContainingIgnoreCase(String region, String item);

    @Query("SELECT i FROM FacilityItem i WHERE " +
            "(:region IS NULL OR LOWER(i.region) = LOWER(:region)) AND " +
            "((LOWER(i.item) LIKE %:query%) OR (LOWER(i.facilityName) LIKE %:query%)) AND " +
            "(:budget IS NULL OR i.cost <= :budget)")
    List<FacilityItem> findSmartRecommendations(String query, String region, Double budget);
}
