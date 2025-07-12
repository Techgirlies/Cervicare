package com.cervicare.hospitalrecommender.controller;
import com.cervicare.entity.FacilityItem;
import com.cervicare.entity.FacilityService;
import com.cervicare.hospitalrecommender.dto.RecommendationResponse;
import com.cervicare.hospitalrecommender.service.HospitalRecommendationService;
import org.springframework.http.ResponseEntity;
import java.util.Map;
import java.util.HashMap;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/hospitals")
@CrossOrigin(origins = "*")
public class HospitalRecommendationController {

    private final HospitalRecommendationService service;

    public HospitalRecommendationController(HospitalRecommendationService service) {
        this.service = service;
    }

    // ---------- RECOMMENDATION ENDPOINTS ----------
    @GetMapping("/recommendations/region/{region}")
    public RecommendationResponse getRecommendations(@PathVariable String region) {
        return service.getRecommendationsByRegion(region);
    }

    @GetMapping("/recommendations/region/{region}/item/{itemName}")
    public List<FacilityItem> getRecommendationsForItem(
            @PathVariable String region,
            @PathVariable String itemName) {
        return service.recommendHospitals(region, itemName);
    }

    // ---------- CRUD FOR FacilityItem ----------
    @GetMapping("/items")
    public List<FacilityItem> getAllFacilityItems() {
        return service.getAllFacilityItems();
    }

    @PostMapping("/items")
    public FacilityItem createFacilityItem(@RequestBody FacilityItem item) {
        return service.saveFacilityItem(item);
    }

    @PutMapping("/items/{id}")
    public FacilityItem updateFacilityItem(@PathVariable Long id, @RequestBody FacilityItem item) {
        return service.updateFacilityItem(id, item);
    }

    @DeleteMapping("/items/{id}")
    public void deleteFacilityItem(@PathVariable Long id) {
        service.deleteFacilityItem(id);
    }

    // ---------- CRUD FOR FacilityService ----------
    @GetMapping("/services")
    public List<FacilityService> getAllFacilityServices() {
        return service.getAllFacilityServices();
    }

    @PostMapping("/services")
    public FacilityService createFacilityService(@RequestBody FacilityService serviceData) {
        return service.saveFacilityService(serviceData);
    }

    @PutMapping("/services/{id}")
    public FacilityService updateFacilityService(@PathVariable Long id, @RequestBody FacilityService serviceData) {
        return service.updateFacilityService(id, serviceData);
    }
    @GetMapping("/overview/region/{region}")
    public ResponseEntity<Map<String, Object>> getPatientOverview(@PathVariable String region) {
        return ResponseEntity.ok(service.getPatientOverviewByRegion(region));
    }
    @GetMapping("/stock/region/{region}/item/{itemName}")
    public ResponseEntity<Map<String, Object>> getItemStockDetails(
            @PathVariable String region,
            @PathVariable String itemName) {
        return ResponseEntity.ok(service.getItemStockByRegion(region, itemName));
    }


    @DeleteMapping("/services/{id}")
    public void deleteFacilityService(@PathVariable Long id) {
        service.deleteFacilityService(id);
    }
}
