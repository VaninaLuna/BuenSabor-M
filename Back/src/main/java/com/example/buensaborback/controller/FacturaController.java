package com.example.buensaborback.controller;

import com.example.buensaborback.domain.entities.Factura;
import com.example.buensaborback.services.ClienteService;
import com.example.buensaborback.services.EmailService;
import com.example.buensaborback.services.FacturaService;
import com.example.buensaborback.services.FacturaServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;

@RestController
@AllArgsConstructor
@RequestMapping("/factura")
@CrossOrigin(origins = "*")
public class FacturaController extends BaseControllerImpl<Factura, FacturaServiceImpl> {

    private final FacturaService facturaService;
    private final EmailService emailService; // Inyecta el servicio de correo electrónico

    @GetMapping("/byCliente/{clienteId}")
    public ResponseEntity<?> getFacturasByCliente(@PathVariable Long clienteId) {
        try {
            return ResponseEntity.ok(facturaService.buscarFacturasByCliente(clienteId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\":\"Error. Por favor intente luego\"}");
        }
    }

    //Generar un pdf de la factura y descarcarlo
    @GetMapping("/download_pdf_factura/{id}")
    public ResponseEntity<byte[]> downloadPdf(@PathVariable Long id) {

        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {

            // Crear un nuevo documento
            facturaService.printPDF(id, outputStream);

            // Establecer las cabeceras de la respuesta
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.parseMediaType("application/pdf"));
            headers.setContentDispositionFormData("attachment", "documento.pdf");
            headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");

            // Devolver el archivo PDF como parte de la respuesta HTTP
            return new ResponseEntity<>(outputStream.toByteArray(), headers, HttpStatus.OK);

        } catch (Exception e) {
            System.err.println(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //Generar un pdf de la factura y enviarlo por correo
    @GetMapping("/send_pdf_factura/{id}/{email}")
    public ResponseEntity<String> sendPdf(@PathVariable Long id, @PathVariable String email) {

        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {

            // Crear un nuevo documento
            facturaService.printPDF(id, outputStream);

            // Enviar el correo electrónico con el PDF adjunto
            emailService.sendEmailWithAttachment(
                    email,
                    "Aquí está tu factura",
                    "Por favor, encuentra adjunta tu factura.",
                    outputStream.toByteArray()
            );

            // Devolver un mensaje de confirmación
            return new ResponseEntity<>("El correo electrónico ha sido enviado con éxito.", HttpStatus.OK);

        } catch (Exception e) {
            System.err.println(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
