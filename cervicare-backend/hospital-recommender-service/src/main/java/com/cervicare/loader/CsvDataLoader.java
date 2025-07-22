package com.cervicare.loader;

import com.cervicare.entity.FacilityItem;
import com.cervicare.entity.FacilityService;
import com.cervicare.repository.FacilityItemRepository;
import com.cervicare.repository.FacilityServiceRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Objects;

@Component
@RequiredArgsConstructor
public class CsvDataLoader {

    private final FacilityItemRepository itemRepository;
    private final FacilityServiceRepository serviceRepository;

    @PostConstruct
    public void load() {
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(
                Objects.requireNonNull(getClass().getClassLoader().getResourceAsStream("facility_services.csv"))
        ))) {

            // Skip header
            String line = reader.readLine();

            while ((line = reader.readLine()) != null) {
                String[] tokens = line.split(",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)", -1);

                String facility = tokens[0].trim();
                String region = tokens[1].trim().toLowerCase();
                String category = tokens[2].trim().toLowerCase();
                String item = tokens[3].trim().toLowerCase();
                String baseCostStr = tokens[4].trim();
                String stockStr = tokens[5].trim();
                String service = tokens[6].trim().toLowerCase();
                String nhifCoveredStr = tokens[8].trim();
                String copayStr = tokens[9].trim();
                String outOfPocketStr = tokens[10].trim();

                boolean isService = !service.isEmpty();

                if (isService) {
                    // Map to FacilityService
                    FacilityService s = new FacilityService();
                    s.setFacility(facility);
                    s.setRegion(region);
                    s.setCategory(category);
                    s.setService(service);
                    s.setBaseCost(parseDouble(baseCostStr));
                    s.setNhifCovered("yes".equalsIgnoreCase(nhifCoveredStr));
                    s.setInsuranceCopay(parseDouble(copayStr));
                    s.setOutOfPocket(parseDouble(outOfPocketStr));

                    boolean exists = serviceRepository.findAll().stream().anyMatch(existing ->
                            Objects.equals(existing.getFacility(), s.getFacility()) &&
                                    Objects.equals(existing.getRegion(), s.getRegion()) &&
                                    Objects.equals(existing.getCategory(), s.getCategory()) &&
                                    Objects.equals(existing.getService(), s.getService()) &&
                                    Objects.equals(existing.getBaseCost(), s.getBaseCost())
                    );

                    if (!exists) {
                        serviceRepository.save(s);
                    }

                } else {
                    // Map to FacilityItem
                    FacilityItem i = new FacilityItem();
                    i.setFacilityName(facility);
                    i.setRegion(region);
                    i.setWard(region); // using region as ward if missing
                    i.setKephLevel(null); // or parse if available in CSV later
                    i.setOwner(null);     // same as above
                    i.setCode(null);      // same as above
                    i.setItem(item.isEmpty() ? category : item);
                    i.setCategory(category);
                    i.setCost(parseDouble(baseCostStr));
                    i.setAvailableStock(parseInt(stockStr));
                    i.setPrice(null);     // could be computed or separate column
                    i.setInsurance("yes".equalsIgnoreCase(nhifCoveredStr));

                    boolean exists = itemRepository.findAll().stream().anyMatch(existing ->
                            Objects.equals(existing.getFacilityName(), i.getFacilityName()) &&
                                    Objects.equals(existing.getRegion(), i.getRegion()) &&
                                    Objects.equals(existing.getItem(), i.getItem()) &&
                                    Objects.equals(existing.getCategory(), i.getCategory()) &&
                                    Objects.equals(existing.getCost(), i.getCost())
                    );

                    if (!exists) {
                        itemRepository.save(i);
                    }
                }
            }

            System.out.println("✅ CSV data loaded successfully.");

        } catch (Exception e) {
            System.err.println("❌ Failed to load CSV data: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private Double parseDouble(String s) {
        try {
            return s.isEmpty() ? null : Double.parseDouble(s);
        } catch (NumberFormatException e) {
            return null;
        }
    }

    private Integer parseInt(String s) {
        try {
            return s.isEmpty() ? null : Integer.parseInt(s);
        } catch (NumberFormatException e) {
            return null;
        }
    }
}
