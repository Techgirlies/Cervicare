package com.cervicare.appointment.service;

import com.cervicare.appointment.model.Appointment;
import com.cervicare.appointment.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {

        @Autowired
        private AppointmentRepository appointmentRepository;

        public Appointment create(Appointment appointment) {
                return appointmentRepository.save(appointment);
        }

        public List<Appointment> getAll() {
                return appointmentRepository.findAll();
        }

        public Optional<Appointment> getById(Long id) {
                return appointmentRepository.findById(id);
        }

        public Appointment update(Long id, Appointment updated) {
                updated.setId(id);
                return appointmentRepository.save(updated);
        }

        public void delete(Long id) {
                appointmentRepository.deleteById(id);
        }

        public List<Appointment> getAppointmentsByEmail(String email) {
                return appointmentRepository.findByEmail(email);
        }
}
