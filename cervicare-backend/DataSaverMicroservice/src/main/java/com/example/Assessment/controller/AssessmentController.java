package com.example.Assessment.controller;

import com.example.Assessment.entity.Assessment;
import com.example.Assessment.service.AssessmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class AssessmentController {

    @Autowired
    private AssessmentService assessmentService;

    @PostMapping("/save-assessment")
    public ResponseEntity<Assessment> saveAssessment(@Valid @RequestBody Assessment assessment) {
        Assessment savedAssessment = assessmentService.saveAssessment(assessment);
        return ResponseEntity.ok(savedAssessment);
    }
}
