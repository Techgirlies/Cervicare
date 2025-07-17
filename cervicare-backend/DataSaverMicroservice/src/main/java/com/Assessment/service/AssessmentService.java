package com.yourpackage.service;

import com.yourpackage.model.Assessment;
import com.yourpackage.repository.AssessmentRepository;
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
