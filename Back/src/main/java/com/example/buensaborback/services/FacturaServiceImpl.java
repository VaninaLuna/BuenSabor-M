package com.example.buensaborback.services;

import com.example.buensaborback.domain.entities.Cliente;
import com.example.buensaborback.domain.entities.Factura;
import com.example.buensaborback.domain.entities.PedidoDetalle;
import com.example.buensaborback.repositories.ClienteRepository;
import com.example.buensaborback.repositories.FacturaRepository;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class FacturaServiceImpl extends BaseServiceImpl<Factura, Long> implements FacturaService {

    private final FacturaRepository facturaRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    public FacturaServiceImpl(FacturaRepository facturaRepository) {
        super(facturaRepository);
        this.facturaRepository = facturaRepository;
    }

    @Transactional
    public List<Factura> buscarFacturasByCliente(Long clienteId) throws Exception {
        try {
            return facturaRepository.buscarFacturasByCliente(clienteId);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    //Genera archivo PDF
    @Override
    public void printPDF(Long id, ByteArrayOutputStream outputStream) throws Exception {
        try {

            //Declarar fuentes personalizadas para el PDF
            final Font fTexto = new Font(Font.FontFamily.UNDEFINED, 10, Font.NORMAL);
            final Font fSubTitulo = new Font(Font.FontFamily.UNDEFINED, 13, Font.BOLD);
            final Font fSubTitulo2 = new Font(Font.FontFamily.UNDEFINED, 11, Font.BOLD);
            final Font fTitulo = new Font(Font.FontFamily.UNDEFINED, 15, Font.BOLD);
            final Font fEncabezados = new Font(Font.FontFamily.UNDEFINED, 10, Font.BOLD);


            //Obtener instrumento desde la BD
            Factura factura = facturaRepository.findById(id)
                    .orElseThrow(() -> new NoSuchElementException("No existe una factura con ese Id"));

            Document document = new Document(PageSize.A4, 30, 30, 5, 30);//float marginLeft, float marginRight, float marginTop, float marginBottom
            PdfWriter.getInstance(document, outputStream); // Code 2

            // Abrir el documento
            document.open();

            //Agregar metadatos
            addMetaData(document);

            // Crear un nuevo párrafo con el título y agregarlo al documento
            Paragraph title = new Paragraph("FACTURA", fTitulo);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);
            addDocumentEmptyLine(document, 1);

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            Paragraph fFecha = new Paragraph("Fecha de facturacion: " + factura.getFechaFacturacion().format(formatter), fEncabezados);
            document.add(fFecha);

            Paragraph fFormaPago = new Paragraph("Forma de pago: " + factura.getFormaPago(), fEncabezados);
            document.add(fFormaPago);
            addDocumentEmptyLine(document, 1);


            //Datos del Cliente
            Paragraph clienteSubtitle = new Paragraph("Informacion sobre el cliente", fSubTitulo);
            document.add(clienteSubtitle);

            //Obtener instrumento desde la BD
            Cliente cliente = clienteRepository.findById(factura.getPedido().getCliente().getId())
                    .orElseThrow(() -> new NoSuchElementException("No existe un cliente con ese Id"));

            Paragraph cNombre = new Paragraph("Nombre: " + cliente.getNombre(), fTexto);
            document.add(cNombre);

            Paragraph cApellido = new Paragraph("Apellido: " + cliente.getApellido(), fTexto);
            document.add(cApellido);

            Paragraph cMail = new Paragraph("Correo electronico: " + cliente.getEmail(), fTexto);
            document.add(cMail);

            Paragraph cTelefono = new Paragraph("Telefono: " + cliente.getTelefono(), fTexto);
            document.add(cTelefono);
            addDocumentEmptyLine(document, 1);

            //Domicilio
            Paragraph domicilioSubtitle = new Paragraph("Domicilio Cliente: ", fSubTitulo2);
            document.add(domicilioSubtitle);

            Paragraph dCalle = new Paragraph("Calle: " + cliente.getDomicilio().getCalle(), fTexto);
            document.add(dCalle);

            Paragraph dNumero = new Paragraph("Numero: " + cliente.getDomicilio().getNumero(), fTexto);
            document.add(dNumero);

            Paragraph dCodigoPostal = new Paragraph("Codigo Postal: " + cliente.getDomicilio().getCp(), fTexto);
            document.add(dCodigoPostal);

            addDocumentEmptyLine(document, 2);

            //Datos del Cliente
            Paragraph articuloSubtitle = new Paragraph("Articulos", fSubTitulo);
            document.add(articuloSubtitle);
            addDocumentEmptyLine(document,1);

            // Crear una nueva tabla con 4 columnas
            PdfPTable tableDetalle = new PdfPTable(4);
            tableDetalle.setWidthPercentage(100);

            // Ajustar los anchos de las columnas
            float[] columnWidthsDetalle = {1f, 1f, 1f, 1f};
            tableDetalle.setWidths(columnWidthsDetalle);

            // Crear un array con los encabezados de la tabla
            String[] headers = {"Articulo", "Cantidad", "Precio Unitario", "SubTotal"};

            // Recorrer el array y agregar cada encabezado a la tabla
            for (String header : headers) {
                PdfPCell headerCell = new PdfPCell(new Phrase(header, fEncabezados));
                headerCell.setBorder(Rectangle.BOTTOM);
                tableDetalle.addCell(headerCell);
            }


            // Agregar los detalles del pedido a la tabla
            for (PedidoDetalle detalle : factura.getPedido().getPedidoDetalles()) {
                PdfPCell cellArticulo = new PdfPCell(new Phrase(detalle.getArticulo().getDenominacion(), fTexto));
                cellArticulo.setBorder(Rectangle.BOTTOM);
                tableDetalle.addCell(cellArticulo);

                PdfPCell cellCantidad = new PdfPCell(new Phrase(String.valueOf(detalle.getCantidad()), fTexto));
                cellCantidad.setBorder(Rectangle.BOTTOM);
                tableDetalle.addCell(cellCantidad);

                PdfPCell cellPrecioUnitario = new PdfPCell(new Phrase(String.valueOf(detalle.getArticulo().getPrecioVenta()), fTexto));
                cellPrecioUnitario.setBorder(Rectangle.BOTTOM);
                tableDetalle.addCell(cellPrecioUnitario);

                PdfPCell cellSubTotal = new PdfPCell(new Phrase(String.valueOf(detalle.getSubTotal()), fTexto));
                cellSubTotal.setBorder(Rectangle.BOTTOM);
                tableDetalle.addCell(cellSubTotal);
            }

            // Agregar la tabla al documento
            document.add(tableDetalle);

            addDocumentEmptyLine(document, 2);

            Paragraph fDescuento = new Paragraph("Monto de descuento: $" + factura.getMontoDescuento(), fTexto);
            document.add(fDescuento);

            Paragraph fTotal = new Paragraph("Total de la factura: $" + factura.getTotalVenta(), fEncabezados);
            document.add(fTotal);

            //Cerrar el documento
            document.close();


        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }


    private void addMetaData(Document document) {
        document.addTitle("Detalles de la compra");
        document.addSubject("Ejemplo PDF");
        document.addKeywords("PDF");
        document.addAuthor("NullPointerException");
        document.addCreator("NullPointerException");
    }

    public static void addDocumentEmptyLine(Document document, int number) {
        try {
            Paragraph espacio = new Paragraph();
            for (int i = 0; i < number; i++) {
                espacio.add(new Paragraph(" "));
            }
            document.add(espacio);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void addTableEmptyLine(PdfPCell celda, int cantEspacios) {
        try {
            Paragraph espacio = new Paragraph();
            for (int i = 0; i < cantEspacios; i++) {
                espacio.add(new Paragraph(" "));
            }
            celda.addElement(espacio);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
