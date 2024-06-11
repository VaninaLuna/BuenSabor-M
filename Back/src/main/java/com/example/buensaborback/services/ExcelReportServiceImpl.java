package com.example.buensaborback.services;

import com.example.buensaborback.domain.entities.Pedido;
import com.example.buensaborback.domain.entities.PedidoDetalle;
import com.example.buensaborback.repositories.PedidoRepository;
import lombok.AllArgsConstructor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@Service
@AllArgsConstructor
public class ExcelReportServiceImpl implements ExcelReportService{
    @Autowired
    private PedidoRepository pedidoRepository;

    @Override
    public ByteArrayInputStream generateExcelReport(LocalDate fechaDesde, LocalDate fechaHasta) throws IOException {
        List<Pedido> pedidos = pedidoRepository.findByFechaPedidoBetween(fechaDesde, fechaHasta);

        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Reporte de Pedidos");

            Row headerRow = sheet.createRow(0);
            String[] columns = {"Pedido nro", "Fecha Pedido", "Articulo", "Cantidad", "SubTotal", "TotalPedido"};
            for (int i = 0; i < columns.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(columns[i]);
            }

            int rowIdx = 1;
            for (Pedido pedido : pedidos) {
                for (PedidoDetalle detalle : pedido.getPedidoDetalles()) {
                    Row row = sheet.createRow(rowIdx++);

                    row.createCell(0).setCellValue(pedido.getId());
                    row.createCell(1).setCellValue(pedido.getFechaPedido().toString());
                    row.createCell(2).setCellValue(detalle.getArticulo().getDenominacion());
                    row.createCell(3).setCellValue(detalle.getCantidad());
                    row.createCell(4).setCellValue(detalle.getSubTotal());
                    row.createCell(5).setCellValue(pedido.getTotal());
                }
            }

            ByteArrayOutputStream out = new ByteArrayOutputStream();
            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());
        }
    }

}