package com.cervicare.hospitalrecommender.util;
import com.cervicare.entity.FacilityItem;
import com.cervicare.entity.FacilityService;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
public class AggregationUtils {
    public static Map<String, Double> computeAverageItemPrices(List<FacilityItem> items) {
        return items.stream()
                .collect(Collectors.groupingBy(
                        FacilityItem::getItem,
                        Collectors.averagingDouble(FacilityItem::getCost)
                ));
    }

    public static Map<String, Double> computeAverageServicePrices(List<FacilityService> services) {
        return services.stream()
                .collect(Collectors.groupingBy(
                        FacilityService::getService,
                        Collectors.averagingDouble(FacilityService::getBaseCost)
                ));
    }
}