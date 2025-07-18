package com.cervicare.appointment.repository;

import com.cervicare.appointment.model.Hospital;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HospitalRepository extends JpaRepository<Hospital, Long> {
}
