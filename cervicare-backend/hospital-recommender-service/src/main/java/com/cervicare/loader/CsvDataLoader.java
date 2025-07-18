package com.cervicare.loader;
import com.cervicare.repository.FacilityItemRepository;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import com.cervicare.entity.FacilityItem;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.logging.Logger;

@Component
public class CsvDataLoader {

    private static final Logger logger = Logger.getLogger(CsvDataLoader.class.getName());

    @Autowired
    private FacilityItemRepository facilityItemRepository;

    @PostConstruct
    public void loadData() {
        try (CSVReader reader = new CSVReader(new InputStreamReader(new ClassPathResource("data/facility_items.csv").getInputStream()))) {
            String[] line;
            boolean isFirstLine = true;

            while ((line = reader.readNext()) != null) {
                if (isFirstLine) {
                    isFirstLine = false; // Skip header
                    continue;
                }

                if (line.length < 10) {
                    logger.warning("Skipping line due to insufficient columns: " + String.join(",", line));
                    continue;
                }

                try {
                    FacilityItem item = new FacilityItem();
                    item.setRegion(line[0].trim());
                    item.setWard(line[1].trim());
                    item.setFacilityName(line[2].trim());
                    item.setOwner(line[3].trim());
                    item.setKephLevel(line[4].trim());
                    item.setItem(line[5].trim());

                    try {
                        item.setAvailableStock(parseIntSafe(line[6]));
                    } catch (NumberFormatException e) {
                        logger.warning("Invalid available stock: " + line[6]);
                        item.setAvailableStock(null);
                    }

                    item.setCode(line[7].trim());

                    try {
                        item.setPrice(parseDoubleSafe(line[8]));
                    } catch (NumberFormatException e) {
                        logger.warning("Invalid price: " + line[8]);
                        item.setPrice(null);
                    }

                    try {
                        item.setCost(parseDoubleSafe(line[9]));
                    } catch (NumberFormatException e) {
                        logger.warning("Invalid cost: " + line[9]);
                        item.setCost(null);
                    }

                    facilityItemRepository.save(item);
                } catch (Exception e) {
                    logger.warning("Skipping row due to unexpected error: " + e.getMessage());
                }
            }

            logger.info("Facility items loaded successfully.");

        } catch (IOException | CsvValidationException e) {
            logger.severe("Error reading CSV file: " + e.getMessage());
        }
    }

    private Integer parseIntSafe(String value) {
        value = value.trim();
        return value.isEmpty() ? null : Integer.parseInt(value);
    }

    private Double parseDoubleSafe(String value) {
        value = value.trim().replaceAll("[^0-9.]", ""); // Remove non-numeric characters
        return value.isEmpty() ? null : Double.parseDouble(value);
    }
}
