package com.example.Assessment.service;

import com.example.Assessment.entity.Assessment;
import com.example.Assessment.repository.AssessmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AssessmentService {

        @Autowired
        private AssessmentRepository assessmentRepository;

        public Assessment saveAssessment(Assessment assessment) {
                return assessmentRepository.save(assessment);
        }
}
