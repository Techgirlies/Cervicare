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
        private AppointmentRepository repository;

        public Appointment create(Appointment appointment) {
                return repository.save(appointment);
        }

        public List<Appointment> getAll() {
                return repository.findAll();
        }

        public Optional<Appointment> getById(Long id) {
                return repository.findById(id);
        }

        public Appointment update(Long id, Appointment updated) {
                updated.setId(id);
                return repository.save(updated);
        }

        public void delete(Long id) {
                repository.deleteById(id);
        }
}
