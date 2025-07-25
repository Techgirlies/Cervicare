package com.cervicare.appointment.model;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import java.time.LocalDateTime;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import lombok.Data;

@Entity
@Table(name = "appointment_data")
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String patientName;
    private String contactInfo;
    private LocalDateTime appointmentDateTime;
    private String purpose;
    private String region;
    private String hospital;
    @Column(nullable = false)
    private String email;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPatientName() {
        return patientName;
    }

    public void setPatientName(String patientName) {
        this.patientName = patientName;
    }

    public String getContactInfo() {
        return contactInfo;
    }

    public void setContactInfo(String contactInfo) {
        this.contactInfo = contactInfo;
    }

    public LocalDateTime getAppointmentDateTime() {
        return appointmentDateTime;
    }

    public void setAppointmentDateTime(LocalDateTime appointmentDateTime) {
        this.appointmentDateTime = appointmentDateTime;
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getHospital() {
        return hospital;
    }

    public void setHospital(String hospital) {
        this.hospital = hospital;
    }
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

}
