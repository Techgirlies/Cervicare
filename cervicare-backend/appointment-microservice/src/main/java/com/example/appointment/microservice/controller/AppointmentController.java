package com.example.appointment.microservice.controller;

import com.example.appointment.microservice.entity.Appointment;
import com.example.appointment.microservice.service.AppointmentService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    private final AppointmentService service;

    public AppointmentController(AppointmentService service) {
        this.service = service;
    }

    @PostMapping("/book")
    public Appointment book(@RequestParam String patientName,
                            @RequestParam String location,
                            @RequestParam String treatmentType,
                            @RequestParam Double estimatedCost) {
        return service.bookAppointment(patientName, location, treatmentType, estimatedCost);
    }

    @GetMapping
    public Iterable<Appointment> list() {
        return service.getAllAppointments();
    }
}
