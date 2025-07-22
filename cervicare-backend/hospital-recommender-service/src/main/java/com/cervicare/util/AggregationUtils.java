package com.cervicare.util;

import com.cervicare.entity.FacilityItem;
import com.cervicare.entity.FacilityService;
import java.util.List;

public class AggregationUtils {
    public static double calculateTotalCost(List<FacilityItem> items) {
        return items.stream().mapToDouble(i -> i.getCost() != null ? i.getCost() : 0).sum();
    }

    public static double calculateAverageServiceCost(List<FacilityService> services) {
        return services.stream().mapToDouble(s -> s.getBaseCost() != null ? s.getBaseCost() : 0).average().orElse(0);
    }
}
