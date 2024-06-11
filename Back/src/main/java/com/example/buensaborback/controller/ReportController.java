package com.example.buensaborback.controller;

import com.example.buensaborback.services.ExcelReportService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.time.LocalDate;

@RestController
@RequestMapping("/report")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class ReportController {
    @Autowired
    private ExcelReportService excelReportService;

    @GetMapping("/excel")
    public ResponseEntity<byte[]> getExcelReport(@RequestParam("fechaDesde") String fechaDesde,
                                                 @RequestParam("fechaHasta") String fechaHasta) {
        try {
            LocalDate fromDate = LocalDate.parse(fechaDesde);
            LocalDate toDate = LocalDate.parse(fechaHasta);
            ByteArrayInputStream bis = excelReportService.generateExcelReport(fromDate, toDate);

            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Disposition", "attachment; filename=reporte_pedidos_" + fechaDesde + "_" + fechaHasta + ".xlsx");

            return ResponseEntity.ok().headers(headers).body(bis.readAllBytes());
        } catch (IOException e) {
            return ResponseEntity.status(500).build();
        }
    }
}