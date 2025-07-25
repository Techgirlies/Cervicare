package com.cervicare.service;

import com.cervicare.entity.FacilityItem;
import com.cervicare.entity.FacilityService;
import com.cervicare.repository.FacilityItemRepository;
import com.cervicare.repository.FacilityServiceRepository;
import com.cervicare.dto.FacilityResourceDto;
import org.springframework.stereotype.Service;

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
    public List<FacilityResourceDto> recommendHospitals(String query, String region, Double budget, Boolean insurance) {
        List<FacilityItem> items = itemRepo.findSmartRecommendations(query.toLowerCase(), region, budget);
        List<FacilityService> services = serviceRepo.findSmartServices(query.toLowerCase(), region, budget, insurance);

        return items.stream().map(i -> new FacilityResourceDto(
                        i.getItem(),
                        i.getCategory(),
                        i.getFacilityName(),
                        i.getRegion(),
                        i.getCost(),
                        i.getInsurance()
                )).collect(Collectors.toList())
                .stream().collect(Collectors.toCollection(() -> {
                    List<FacilityResourceDto> combined = new java.util.ArrayList<>();
                    for (FacilityService s : services) {
                        combined.add(new FacilityResourceDto(
                                s.getService(),
                                s.getCategory(),
                                s.getFacility(),
                                s.getRegion(),
                                s.getBaseCost(),
                                s.getNhifCovered()
                        ));
                    }
                    return combined;
                }));
    }

}
