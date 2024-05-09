package com.example.buensaborback;

import com.example.buensaborback.domain.entities.*;
import com.example.buensaborback.repositories.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@SpringBootApplication
public class BuenSaborBackApplication {
    private static final Logger logger = LoggerFactory.getLogger(BuenSaborBackApplication.class);
    @Autowired
    private ArticuloManufacturadoDetalleRepository articuloManufacturadoDetalleRepository;

    @Autowired
    private UnidadMedidaRepository unidadMedidaRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private ArticuloInsumoRepository articuloInsumoRepository;

    @Autowired
    private ArticuloManufacturadoRepository articuloManufacturadoRepository;

    @Autowired
    private ImagenRepository imagenRepository;

    public static void main(String[] args) {
        SpringApplication.run(BuenSaborBackApplication.class, args);
    }

    @Bean
    CommandLineRunner init(ArticuloInsumoRepository articuloInsumoRepository,
                            ArticuloManufacturadoRepository articuloManufacturadoRepository,
                           ArticuloManufacturadoDetalleRepository articuloManufacturadoDetalleRepository,
                           CategoriaRepository categoriaRepository,
                           ImagenRepository imagenRepository,
                           UnidadMedidaRepository unidadMedidaRepository) {
        return args -> {
            logger.info("----------------ESTOY----FUNCIONANDO---------------------");

            logger.info("----------------Crear categoria---------------------");
            Categoria categoriaInsumos = Categoria.builder()
                    .denominacion("Insumos").
                    build();
            categoriaRepository.save(categoriaInsumos);

            Categoria frituras = Categoria.builder()
                    .denominacion("Frituras")
                    .build();
            categoriaRepository.save(frituras);

            logger.info("----------------Crear unidad de medida---------------------");
            UnidadMedida unidadMedidaKilos = UnidadMedida.builder().
                    denominacion("Kilos").
                    build();

            UnidadMedida unidadMedidaUnidad = UnidadMedida.builder().
                    denominacion("Unidades").
                    build();

            unidadMedidaRepository.save(unidadMedidaKilos);
            unidadMedidaRepository.save(unidadMedidaUnidad);

            logger.info("----------------Crear articulo insumo---------------------");
            ArticuloInsumo papasFritas = ArticuloInsumo.builder().
                    denominacion("Papas Fritas")
                    .unidadMedida(unidadMedidaUnidad)
                    .esParaElaborar(true)
                    .stockActual(2)
                    .stockMaximo(10)
                    .precioCompra(10.5)
                    .precioVenta(22.5)
                    .categoria(frituras) // categoria en insumo
                    .build();
            articuloInsumoRepository.save(papasFritas);

            ArticuloInsumo hamburguesa = ArticuloInsumo.builder().
                    denominacion("Hamburguesa")
                    .unidadMedida(unidadMedidaKilos)
                    .esParaElaborar(true)
                    .stockActual(2)
                    .stockMaximo(10)
                    .precioCompra(10.5)
                    .precioVenta(22.5)
                    .categoria(frituras) // categoria en insumo
                    .build();
            articuloInsumoRepository.save(hamburguesa);

            logger.info("----------------Crear imagen para articulo insumo---------------------");
            Imagen imagenPapas = Imagen.builder()
                    .url("https://mandolina.co/wp-content/uploads/2023/03/648366622-1024x683.jpg")
                    .articulo(papasFritas)
                    .build();
            imagenRepository.save(imagenPapas);

            logger.info("----------------Crear articulo manufacturado---------------------");
            ArticuloManufacturado hamburguesasConPapas = ArticuloManufacturado.builder()
                    .denominacion("Hamburguesa con papas")
                    .descripcion("La mejor del pais")
                    .unidadMedida(unidadMedidaUnidad)
                    .precioVenta(130.0)
                    .tiempoEstimadoMinutos(10)
                    .preparacion("Poner el queso sobre la carne")
                    .categoria(frituras) // categoria en articulo manufacturado
                    .build();
            articuloManufacturadoRepository.save(hamburguesasConPapas);

            logger.info("----------------Crear imagen para articulo manufacturado---------------------");
            Imagen imagenBurguer = Imagen.builder()
                    .url("https://mandolina.co/wp-content/uploads/2023/03/648366622-1024x683.jpg")
                    .articulo(hamburguesasConPapas) // imagen del articulo
                    .build();
            imagenRepository.save(imagenBurguer);

            logger.info("----------------Crear articulo manufacturado detalle---------------------");
            ArticuloManufacturadoDetalle detalle1 = ArticuloManufacturadoDetalle.builder()
                    .articuloInsumo(papasFritas)
                    .articuloManufacturado(hamburguesasConPapas)
                    .cantidad(100)
                    .build();
            articuloManufacturadoDetalleRepository.save(detalle1);

            ArticuloManufacturadoDetalle detalle2 = ArticuloManufacturadoDetalle.builder()
                    .articuloInsumo(hamburguesa)
                    .articuloManufacturado(hamburguesasConPapas)
                    .cantidad(10)
                    .build();
            articuloManufacturadoDetalleRepository.save(detalle2);

        };
    }
}


