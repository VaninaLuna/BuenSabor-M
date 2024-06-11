package com.example.buensaborback.services;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.time.LocalDate;

public interface ExcelReportService {
    ByteArrayInputStream generateExcelReport(LocalDate fechaDesde, LocalDate fechaHasta) throws IOException;
}