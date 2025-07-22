package com.cervicare.controller;

import com.cervicare.entity.FacilityItem;
import com.cervicare.entity.FacilityService;
import com.cervicare.service.HospitalRecommendationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class HospitalRecommendationController {

    private final HospitalRecommendationService service;

    public HospitalRecommendationController(HospitalRecommendationService service) {
        this.service = service;
    }

    @GetMapping("/inventory")
    public ResponseEntity<List<FacilityItem>> getAllInventory() {
        return ResponseEntity.ok(service.getAllInventory());
    }

    @GetMapping("/inventory/search")
    public ResponseEntity<List<FacilityItem>> searchItem(@RequestParam String query) {
        return ResponseEntity.ok(service.searchItem(query));
    }

    @PostMapping("/inventory")
    public ResponseEntity<FacilityItem> addItem(@RequestBody FacilityItem item) {
        return ResponseEntity.ok(service.addItem(item));
    }

    @PutMapping("/inventory/{id}")
    public ResponseEntity<FacilityItem> updateItem(@PathVariable Long id, @RequestBody FacilityItem updated) {
        return ResponseEntity.ok(service.updateItem(id, updated));
    }

    @DeleteMapping("/inventory/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        service.deleteItem(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/recommendations")
    public ResponseEntity<List<FacilityItem>> recommendItems(
            @RequestParam String query,
            @RequestParam(required = false) String region,
            @RequestParam(required = false) Double budget) {
        return ResponseEntity.ok(service.smartRecommendItems(query, region, budget));
    }

    @GetMapping("/recommendations/services")
    public ResponseEntity<List<FacilityService>> recommendServices(
            @RequestParam String query,
            @RequestParam(required = false) String region,
            @RequestParam(required = false) Double budget,
            @RequestParam(required = false) Boolean insurance) {
        return ResponseEntity.ok(service.smartRecommendServices(query, region, budget, insurance));
    }
}