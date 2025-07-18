package com.cervicare.appointment.repository;

import com.cervicare.appointment.model.Region;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegionRepository extends JpaRepository<Region, Long> {
}
