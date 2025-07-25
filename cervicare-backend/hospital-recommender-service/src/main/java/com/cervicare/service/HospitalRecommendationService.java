package com.cervicare.service;

import com.cervicare.entity.FacilityItem;
import com.cervicare.entity.FacilityService;
import com.cervicare.repository.FacilityItemRepository;
import com.cervicare.repository.FacilityServiceRepository;
import com.cervicare.dto.FacilityResourceDto;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class HospitalRecommendationService {

    private final FacilityItemRepository itemRepo;
    private final FacilityServiceRepository serviceRepo;

    public HospitalRecommendationService(FacilityItemRepository itemRepo, FacilityServiceRepository serviceRepo) {
        this.itemRepo = itemRepo;
        this.serviceRepo = serviceRepo;
    }

    public List<FacilityItem> getAllInventory() {
        return itemRepo.findAll();
    }

    public List<FacilityItem> searchItem(String query) {
        return itemRepo.findByItemContainingIgnoreCase(query);
    }

    public Optional<FacilityItem> getItemById(Long id) {
        return itemRepo.findById(id);
    }

    public FacilityItem addItem(FacilityItem item) {
        return itemRepo.save(item);
    }

    public FacilityItem updateItem(Long id, FacilityItem updated) {
        updated.setId(id);
        return itemRepo.save(updated);
    }

    public void deleteItem(Long id) {
        itemRepo.deleteById(id);
    }

    public List<FacilityItem> smartRecommendItems(String query, String region, Double budget) {
        return itemRepo.findSmartRecommendations(query.toLowerCase(), region.toLowerCase(), budget);
    }

    public List<FacilityService> smartRecommendServices(String query, String region, Double budget, Boolean insurance) {
        return serviceRepo.findSmartServices(query.toLowerCase(), region.toLowerCase(), budget, insurance);
    }

    public List<FacilityItem> recommendByRegionAndItem(String region, String item, Boolean insurance, Double budget) {
        String lowerQuery = item.toLowerCase();
        return itemRepo.findAll().stream()
                .filter(i -> i.getRegion() != null && i.getRegion().equalsIgnoreCase(region))
                .filter(i -> (i.getItem() != null && i.getItem().toLowerCase().contains(lowerQuery)) ||
                        (i.getCategory() != null && i.getCategory().toLowerCase().contains(lowerQuery)))
                .filter(i -> insurance == null || (i.getInsurance() != null && i.getInsurance().equals(insurance)))
                .filter(i -> budget == null || (i.getCost() != null && i.getCost() <= budget))
                .collect(Collectors.toList());
    }

    public List<FacilityItem> searchStockByRegionAndItem(String region, String item) {
        return itemRepo.findByRegionIgnoreCaseAndItemContainingIgnoreCase(region, item);
    }

    public List<FacilityResourceDto> getUnifiedStockData(String region, String item) {
        return itemRepo.findByRegionIgnoreCaseAndItemContainingIgnoreCase(region, item).stream()
                .map(i -> new FacilityResourceDto(
                        i.getItem(),
                        i.getCategory(),
                        i.getFacilityName(),
                        i.getRegion(),
                        i.getCost(),
                        i.getInsurance()
                ))
                .collect(Collectors.toList());
    }

    // ✅ Unified recommendation: item, service, category treated as one input
    public List<FacilityResourceDto> recommendHospitals(String query, String region, Double budget, Boolean insurance) {
        String loweredQuery = query.toLowerCase();

        // Search FacilityItem by item or category
        List<FacilityResourceDto> fromItems = itemRepo.findAll().stream()
                .filter(i -> region == null || (i.getRegion() != null && i.getRegion().equalsIgnoreCase(region)))
                .filter(i -> budget == null || (i.getCost() != null && i.getCost() <= budget))
                .filter(i ->
                        (i.getItem() != null && i.getItem().toLowerCase().contains(loweredQuery)) ||
                                (i.getCategory() != null && i.getCategory().toLowerCase().contains(loweredQuery))
                )
                .filter(i -> insurance == null || (i.getInsurance() != null && i.getInsurance().equals(insurance)))
                .map(i -> new FacilityResourceDto(
                        i.getItem(),
                        i.getCategory(),
                        i.getFacilityName(),
                        i.getRegion(),
                        i.getCost(),
                        i.getInsurance()
                ))
                .collect(Collectors.toList());

        // Search FacilityService by service or category
        List<FacilityResourceDto> fromServices = serviceRepo.findAll().stream()
                .filter(s -> region == null || (s.getRegion() != null && s.getRegion().equalsIgnoreCase(region)))
                .filter(s -> budget == null || (s.getBaseCost() != null && s.getBaseCost() <= budget))
                .filter(s ->
                        (s.getService() != null && s.getService().toLowerCase().contains(loweredQuery)) ||
                                (s.getCategory() != null && s.getCategory().toLowerCase().contains(loweredQuery))
                )
                .filter(s -> insurance == null || (s.getNhifCovered() != null && s.getNhifCovered().equals(insurance)))
                .map(s -> new FacilityResourceDto(
                        s.getService(),
                        s.getCategory(),
                        s.getFacility(),
                        s.getRegion(),
                        s.getBaseCost(),
                        s.getNhifCovered()
                ))
                .collect(Collectors.toList());

        // Combine and return
        List<FacilityResourceDto> results = new ArrayList<>();
        results.addAll(fromItems);
        results.addAll(fromServices);
        return results;
    }
}
