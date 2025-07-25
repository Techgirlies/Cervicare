package com.cervicare.appointment.controller;

import com.cervicare.appointment.model.Appointment;
import com.cervicare.appointment.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService service;

    @PostMapping
    public Appointment create(@RequestBody Appointment appointment) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null) {
            throw new IllegalStateException("No authentication found in security context");
        }

        String userEmail = authentication.getName(); // Expecting email

        if (userEmail == null || userEmail.isBlank()) {
            throw new IllegalStateException("Authenticated user's email is null or empty");
        }

        System.out.println("Setting appointment email to: " + userEmail);
        appointment.setEmail(userEmail);

        return service.create(appointment);
    }


    @GetMapping
    public List<Appointment> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Appointment> getById(@PathVariable Long id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public Appointment update(@PathVariable Long id, @RequestBody Appointment appointment) {
        return service.update(id, appointment);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @GetMapping("/user")
    public ResponseEntity<List<Appointment>> getAppointmentsByLoggedInUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName(); // Ensure this returns the user's email

        List<Appointment> appointments = service.getAppointmentsByEmail(email);
        return ResponseEntity.ok(appointments);
    }
}
