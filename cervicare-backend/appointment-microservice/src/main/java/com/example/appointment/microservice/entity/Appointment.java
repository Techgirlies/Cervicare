package com.example.appointment.microservice.entity;

 import lombok.Data;

//public class Appointment {
//    package com.cervicare.appointmentservice.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

    @Entity
    @Data
    public class Appointment {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private String patientName;
        private String location;
        private String treatmentType;
        private Double estimatedCost;
        private LocalDateTime appointmentTime;

        // Constructors, getters, setters
    }

//}
