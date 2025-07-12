package com.example.appointment.microservice.service;

//public class ExcelUpdateService {
//    package com.cervicare.appointmentservice.service;

import jakarta.annotation.PostConstruct;
import org.apache.poi.ss.usermodel.*;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;

    @Service
    public class ExcelUpdateService {

        @PostConstruct
        @Scheduled(fixedRate = 3600000) // every hour
        public void updateFromExcel() {
            try {
                FileInputStream fis = new FileInputStream(new File("/mnt/data/Treatment Costs Sheet.xlsx"));
                Workbook workbook = WorkbookFactory.create(fis);
                Sheet sheet = workbook.getSheetAt(0);
                for (Row row : sheet) {
                    Cell treatment = row.getCell(0);
                    Cell cost = row.getCell(1);
                    if (treatment != null && cost != null) {
                        System.out.println("Treatment: " + treatment.getStringCellValue() +
                                ", Cost: " + cost.getNumericCellValue());
                        // TODO: update DB accordingly
                    }
                }
                workbook.close();
                fis.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
//new FileInputStream(new File("/mnt/data/Treatment Costs Sheet.xlsx")
//}
