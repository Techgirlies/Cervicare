package com.yourpackage.controller;

import com.yourpackage.model.Assessment;
import com.yourpackage.service.AssessmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
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
