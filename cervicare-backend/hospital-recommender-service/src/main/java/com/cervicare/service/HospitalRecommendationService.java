package com.cervicare.service;
import com.cervicare.entity.FacilityItem;
import com.cervicare.entity.FacilityService;
import com.cervicare.repository.FacilityItemRepository;
import com.cervicare.repository.FacilityServiceRepository;
import org.springframework.stereotype.Service;
import com.cervicare.dto.FacilityResourceDto;
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
        return itemRepo.findAll().stream()
                .filter(i -> (i.getItem() != null && i.getItem().toLowerCase().contains(query.toLowerCase())) ||
                             (i.getFacilityName() != null && i.getFacilityName().toLowerCase().contains(query.toLowerCase())))
                .filter(i -> region == null || i.getRegion().equalsIgnoreCase(region))
                .filter(i -> budget == null || (i.getCost() != null && i.getCost() <= budget))
                .collect(Collectors.toList());
    }

    public List<FacilityService> smartRecommendServices(String query, String region, Double budget, Boolean insurance) {
        return serviceRepo.findAll().stream()
                .filter(s -> (s.getService() != null && s.getService().toLowerCase().contains(query.toLowerCase())) ||
                             (s.getCategory() != null && s.getCategory().toLowerCase().contains(query.toLowerCase())))
                .filter(s -> region == null || s.getRegion().equalsIgnoreCase(region))
                .filter(s -> budget == null || (s.getBaseCost() != null && s.getBaseCost() <= budget))
                .filter(s -> insurance == null || (s.getNhifCovered() != null && s.getNhifCovered().equals(insurance)))
                .collect(Collectors.toList());
    }
    public List<FacilityItem> recommendByRegionAndItem(String region, String item, Boolean insurance, Double budget) {
        String query = item.toLowerCase();
        return itemRepo.findAll().stream()
                .filter(i -> i.getRegion() != null && i.getRegion().equalsIgnoreCase(region))
                .filter(i ->
                        (i.getItem() != null && i.getItem().toLowerCase().contains(query)) ||
                                (i.getCategory() != null && i.getCategory().toLowerCase().contains(query))
                )
                .filter(i -> insurance == null || (i.getInsurance() != null && i.getInsurance().equals(insurance)))
                .filter(i -> budget == null || (i.getCost() != null && i.getCost() <= budget))
                .collect(Collectors.toList());
    }

    public List<FacilityItem> searchStockByRegionAndItem(String region, String item) {
        return itemRepo.findAll().stream()
                .filter(i -> i.getRegion() != null && i.getRegion().equalsIgnoreCase(region))
                .filter(i -> i.getItem() != null && i.getItem().equalsIgnoreCase(item))
                .collect(Collectors.toList());
    }
    public List<FacilityResourceDto> getUnifiedStockData(String region, String item) {
        return itemRepo.findAll().stream()
                .filter(i -> i.getRegion() != null && i.getRegion().equalsIgnoreCase(region))
                .filter(i -> i.getItem() != null && i.getItem().equalsIgnoreCase(item))
                .map(i -> new FacilityResourceDto(
                        i.getItem(),
                        null,  // category not applicable for items
                        i.getFacilityName(),
                        i.getRegion(),
                        i.getCost(),
                        i.getInsurance()
                ))
                .collect(Collectors.toList());
    }

}