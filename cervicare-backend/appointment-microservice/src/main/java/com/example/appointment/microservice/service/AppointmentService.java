package com.example.appointment.microservice.service;

import com.example.appointment.microservice.entity.Appointment;
import com.example.appointment.microservice.repository.AppointmentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AppointmentService {

        private final AppointmentRepository repository;

        public AppointmentService(AppointmentRepository repository) {
                this.repository = repository;
        }

        public Appointment bookAppointment(String patientName, String location, String treatmentType, Double estimatedCost) {
                Appointment appt = new Appointment();
                appt.setPatientName(patientName);
                appt.setLocation(location);
                appt.setTreatmentType(treatmentType);
                appt.setEstimatedCost(estimatedCost);
                appt.setAppointmentTime(LocalDateTime.now().plusDays(1)); // auto schedule tomorrow
                return repository.save(appt);
        }

        public Iterable<Appointment> getAllAppointments() {
                return repository.findAll();
        }
}
