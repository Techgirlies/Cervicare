package com.example.appointment.microservice.repository;

import com.example.appointment.microservice.entity.Appointment;

//public class AppointmentRepository {
//    package com.cervicare.appointmentservice.repository;

import com.example.appointment.microservice.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

    public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    }

//}
