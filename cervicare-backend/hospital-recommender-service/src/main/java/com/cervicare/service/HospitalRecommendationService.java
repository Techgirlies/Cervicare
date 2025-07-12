package com.cervicare.hospitalrecommender.service;
import com.cervicare.hospitalrecommender.dto.RecommendationResponse;
import com.cervicare.entity.FacilityItem;
import com.cervicare.entity.FacilityService;
import com.cervicare.repository.FacilityItemRepository;
import com.cervicare.repository.FacilityServiceRepository;
import com.cervicare.hospitalrecommender.util.AggregationUtils;
import org.springframework.stereotype.Service;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class HospitalRecommendationService {

    private final FacilityItemRepository itemRepo;
    private final FacilityServiceRepository serviceRepo;

    public HospitalRecommendationService(FacilityItemRepository itemRepo, FacilityServiceRepository serviceRepo) {
        this.itemRepo = itemRepo;
        this.serviceRepo = serviceRepo;
    }

    /**
     * Get aggregated recommendation data by region
     */
    public RecommendationResponse getRecommendationsByRegion(String region) {
        List<FacilityItem> items = itemRepo.findByRegionIgnoreCase(region);
        List<FacilityService> services = serviceRepo.findByRegionIgnoreCase(region);

        Map<String, Double> avgItemPrices = AggregationUtils.computeAverageItemPrices(items);
        Map<String, Double> avgServicePrices = AggregationUtils.computeAverageServicePrices(services);

        return new RecommendationResponse(region, avgItemPrices, avgServicePrices, items);
    }

    /**
     * Recommend hospitals in a region that provide a specific item, sorted by cost and availability.
     */
    public List<FacilityItem> recommendHospitals(String region, String itemName) {
        List<FacilityItem> items = itemRepo.findByRegionIgnoreCase(region);

        return items.stream()
                .filter(item -> item.getItem().equalsIgnoreCase(itemName) && item.getAvailableStock() > 0)
                .sorted(Comparator.comparingDouble(FacilityItem::getCost))
                .collect(Collectors.toList());
    }
    // FacilityItem CRUD
    public FacilityItem saveFacilityItem(FacilityItem item) {
        return itemRepo.save(item);
    }

    public List<FacilityItem> getAllFacilityItems() {
        return itemRepo.findAll();
    }

    public FacilityItem getFacilityItemById(Long id) {
        return itemRepo.findById(id).orElse(null);
    }

    public FacilityItem updateFacilityItem(Long id, FacilityItem updated) {
        FacilityItem existing = itemRepo.findById(id).orElse(null);
        if (existing != null) {
            updated.setId(id);
            return itemRepo.save(updated);
        }
        return null;
    }

    public void deleteFacilityItem(Long id) {
        itemRepo.deleteById(id);
    }

    // FacilityService CRUD
    public FacilityService saveFacilityService(FacilityService service) {
        return serviceRepo.save(service);
    }

    public List<FacilityService> getAllFacilityServices() {
        return serviceRepo.findAll();
    }

    public FacilityService getFacilityServiceById(Long id) {
        return serviceRepo.findById(id).orElse(null);
    }

    public FacilityService updateFacilityService(Long id, FacilityService updated) {
        FacilityService existing = serviceRepo.findById(id).orElse(null);
        if (existing != null) {
            updated.setId(id);
            return serviceRepo.save(updated);
        }
        return null;
    }

    public void deleteFacilityService(Long id) {
        serviceRepo.deleteById(id);
    }
}
