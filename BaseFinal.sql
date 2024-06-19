/*
SQLyog Ultimate v9.02 
MySQL - 5.5.5-10.4.28-MariaDB : Database - buensabor
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`buensabor` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci */;

USE `buensabor`;

/*Table structure for table `articulo` */

DROP TABLE IF EXISTS `articulo`;

CREATE TABLE `articulo` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `denominacion` varchar(255) DEFAULT NULL,
  `precio_venta` double DEFAULT NULL,
  `categoria_id` bigint(20) DEFAULT NULL,
  `unidad_medida_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK35xlp590328eybh2pf5ublsne` (`categoria_id`),
  KEY `FKlf2hbqm1r4qx36lkr0b4mix6b` (`unidad_medida_id`),
  CONSTRAINT `FK35xlp590328eybh2pf5ublsne` FOREIGN KEY (`categoria_id`) REFERENCES `categoria` (`id`),
  CONSTRAINT `FKlf2hbqm1r4qx36lkr0b4mix6b` FOREIGN KEY (`unidad_medida_id`) REFERENCES `unidad_medida` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

/*Data for the table `articulo` */

insert  into `articulo`(`id`,`denominacion`,`precio_venta`,`categoria_id`,`unidad_medida_id`) values (1,'Pan de Hamburguesa',15,5,3),(2,'Medallon de carne vacuno',18,6,3),(3,'Queso Cheddar',8,10,3),(4,'Papas',8,4,2),(5,'Pollo',15,7,2),(6,'Harina',8,8,2),(7,'Queso Mozzarella',8,10,2),(8,'Salsa de tomate',5,5,5),(9,'Tomate',5,4,2),(10,'Lechuga',5,4,2),(11,'Rebozador',3,4,2),(12,'Panceta',8,5,3),(13,'Agua Mineral sin Gas',20,2,3),(14,'Cerveza Corona',15,3,3),(15,'Gaseosa Coca Cola',15,2,3),(16,'Pizza Mozzarella',100,5,3),(17,'Hamburguesa con Queso',100,17,3),(18,'Papas fritas',70,18,2),(19,'Pollo Crispy',120,18,2),(20,'Papas Especiales',150,18,2),(21,'Ensalada Buen Sabor',200,13,2),(22,'Hamburguesa doble',220,17,3);

/*Table structure for table `articulo_insumo` */

DROP TABLE IF EXISTS `articulo_insumo`;

CREATE TABLE `articulo_insumo` (
  `eliminado` bit(1) NOT NULL,
  `es_para_elaborar` bit(1) NOT NULL,
  `precio_compra` double DEFAULT NULL,
  `stock_actual` int(11) DEFAULT NULL,
  `stock_maximo` int(11) DEFAULT NULL,
  `id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `FK5yoloai8ewly5lkbi3wl5904y` FOREIGN KEY (`id`) REFERENCES `articulo` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

/*Data for the table `articulo_insumo` */

insert  into `articulo_insumo`(`eliminado`,`es_para_elaborar`,`precio_compra`,`stock_actual`,`stock_maximo`,`id`) values ('\0','',10,199,500,1),('\0','',12,399,800,2),('\0','',5,398,800,3),('\0','',5,9600,20000,4),('\0','',10,20000,40000,5),('\0','',5,19400,40000,6),('\0','',5,14400,30000,7),('\0','',3,9600,20000,8),('\0','',3,20000,30000,9),('\0','',3,20000,30000,10),('\0','',2,20000,30000,11),('\0','',5,400,800,12),('\0','\0',10,400,800,13),('\0','\0',10,199,400,14),('\0','\0',10,197,400,15);

/*Table structure for table `articulo_manufacturado` */

DROP TABLE IF EXISTS `articulo_manufacturado`;

CREATE TABLE `articulo_manufacturado` (
  `descripcion` varchar(255) DEFAULT NULL,
  `eliminado` bit(1) NOT NULL,
  `preparacion` varchar(255) DEFAULT NULL,
  `tiempo_estimado_minutos` int(11) DEFAULT NULL,
  `id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `FK9t82oibyduo62wci8y6gfpllx` FOREIGN KEY (`id`) REFERENCES `articulo` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

/*Data for the table `articulo_manufacturado` */

insert  into `articulo_manufacturado`(`descripcion`,`eliminado`,`preparacion`,`tiempo_estimado_minutos`,`id`) values ('Pizza a la piedra con mozzarella','\0','Se prepara la masa, se la deja leudar unos minutos, se la estira y se la coloca en el piso del horno de barro. Una vez cocida se le coloca la salsa y el queso. Vuelve al horno una vez que este fundido el queso. Esta lista para comer',15,16),('Hamburguesa de carne a la parrilla, con queso cheddar fundido y pan brioch','\0','Se colocan los medallones de carne a la parrilla, una vez en su punto justo se le colocan 2 fetas de cheddar y se dejan fundir siendo uno. Se coloca el medallon de carne y queso dentro del pan para lograr sabores unicos',15,17),('Papas fritas condimentadas','\0','Se pelan las papas, se fríen a la temperatura correcta para lograr el punto perfecto',15,18),('Pechuga de pollo rebozada','\0','Se corta el pollo, se lo reboza con cereales especialmente seleccionados y se los fríe. Logrando el mejor sabor',20,19),('Papas, con chedda y bacon','\0','Se pelan las papas, se fríen a la temperatura correcta para lograr el punto perfecto, se les coloca cheddar y bacon crocante',20,20),('Contiene tomate, lechuga y pollo','\0','Se cortan lo vegetales y el pollo. Se mezclan los ingredientes y condimentan para lograr un sabor único',15,21),('Hamburguesa doble carne y queso','\0','Se colocan los medallones de carne a la parrilla, una vez en su punto justo se le colocan 2 fetas de cheddar y se dejan fundir siendo uno. Se coloca el medallon de carne y queso dentro del pan para lograr sabores unicos',20,22);

/*Table structure for table `articulo_manufacturado_detalle` */

DROP TABLE IF EXISTS `articulo_manufacturado_detalle`;

CREATE TABLE `articulo_manufacturado_detalle` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `cantidad` int(11) DEFAULT NULL,
  `articulo_insumo_id` bigint(20) DEFAULT NULL,
  `articulo_manufacturado_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKee8sad16ogk7in2nlh0vc3y9b` (`articulo_insumo_id`),
  KEY `FKcwnptwtrvdenu9tetlffab6dp` (`articulo_manufacturado_id`),
  CONSTRAINT `FKcwnptwtrvdenu9tetlffab6dp` FOREIGN KEY (`articulo_manufacturado_id`) REFERENCES `articulo_manufacturado` (`id`),
  CONSTRAINT `FKee8sad16ogk7in2nlh0vc3y9b` FOREIGN KEY (`articulo_insumo_id`) REFERENCES `articulo_insumo` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

/*Data for the table `articulo_manufacturado_detalle` */

insert  into `articulo_manufacturado_detalle`(`id`,`cantidad`,`articulo_insumo_id`,`articulo_manufacturado_id`) values (1,300,6,16),(2,300,7,16),(3,200,8,16),(4,1,1,17),(5,1,2,17),(6,2,3,17),(7,400,4,18),(8,200,5,19),(9,400,11,19),(10,300,4,20),(11,10,3,20),(12,5,12,20),(13,200,9,21),(14,200,10,21),(15,200,5,21),(16,1,1,22),(17,2,2,22),(18,4,3,22),(19,4,12,22);

/*Table structure for table `categoria` */

DROP TABLE IF EXISTS `categoria`;

CREATE TABLE `categoria` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(255) DEFAULT NULL,
  `denominacion` varchar(255) DEFAULT NULL,
  `eliminado` bit(1) NOT NULL,
  `categoria_padre_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKif4f273okqr2edqkm0xqxjlyk` (`categoria_padre_id`),
  CONSTRAINT `FKif4f273okqr2edqkm0xqxjlyk` FOREIGN KEY (`categoria_padre_id`) REFERENCES `categoria` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

/*Data for the table `categoria` */

insert  into `categoria`(`id`,`codigo`,`denominacion`,`eliminado`,`categoria_padre_id`) values (1,'1','Bebidas','\0',NULL),(2,'1.1','Sin Alcohol','\0',1),(3,'1.2','Con ALcohol','\0',1),(4,'2','Materia Prima','\0',NULL),(5,'3','Alimentos','\0',NULL),(6,'3.1','Carne Vacuna','\0',5),(7,'3.2','Pollo','\0',5),(8,'2.1','Harina','\0',4),(9,'4','Lacteos','\0',NULL),(10,'4.1','Queso','\0',9),(11,'4.2','Leche','\0',9),(12,'5','Vegetales','\0',NULL),(13,'6','Ensaladas','\0',NULL),(14,'5.1','Tuberculos','\0',12),(15,'8','Sandwich','\0',NULL),(16,'8.1','Lomo','\0',15),(17,'8.2','Hamburguesa','\0',15),(18,'9','Frituras','\0',NULL),(27,'9.1','Papas','',18),(31,'9.2','Pollo','',18),(33,'2.2','Harina Integral','\0',4);

/*Table structure for table `cliente` */

DROP TABLE IF EXISTS `cliente`;

CREATE TABLE `cliente` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `apellido` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `usuario_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_id7jmosqg8hkqiqw4vf50xipm` (`usuario_id`),
  CONSTRAINT `FK9wu56im8hnincjveq4kw4ectv` FOREIGN KEY (`usuario_id`) REFERENCES `usuario_cliente` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

/*Data for the table `cliente` */

insert  into `cliente`(`id`,`apellido`,`email`,`fecha_nacimiento`,`nombre`,`telefono`,`usuario_id`) values (1,NULL,'cocinero@buensa.com',NULL,'cocinero','',4),(2,'luna','vani.lunaa@gmail.com','1991-08-15','vanina','2616514342',5),(3,'Garcia','cliente@buensa.com','1987-04-20','cliente','11 5236 98541',6),(4,NULL,'cajero@buensa.com',NULL,'cajero','',7);

/*Table structure for table `domicilio` */

DROP TABLE IF EXISTS `domicilio`;

CREATE TABLE `domicilio` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `calle` varchar(255) DEFAULT NULL,
  `cp` int(11) DEFAULT NULL,
  `numero` int(11) DEFAULT NULL,
  `cliente_id` bigint(20) DEFAULT NULL,
  `localidad_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_tfdexlgr6qnviymgsa0q8rum4` (`cliente_id`),
  KEY `FK8t63gx4v022qapv45vdwld71j` (`localidad_id`),
  CONSTRAINT `FK8t63gx4v022qapv45vdwld71j` FOREIGN KEY (`localidad_id`) REFERENCES `localidad` (`id`),
  CONSTRAINT `FKpj1i9rvwxyyjsdwcest6lxdn0` FOREIGN KEY (`cliente_id`) REFERENCES `cliente` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

/*Data for the table `domicilio` */

insert  into `domicilio`(`id`,`calle`,`cp`,`numero`,`cliente_id`,`localidad_id`) values (1,'Las Palmeras',5521,3510,2,1),(2,'Lisandro Moyano',5539,2010,3,2);

/*Table structure for table `empresa` */

DROP TABLE IF EXISTS `empresa`;

CREATE TABLE `empresa` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `cuil` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `razon_social` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

/*Data for the table `empresa` */

/*Table structure for table `factura` */

DROP TABLE IF EXISTS `factura`;

CREATE TABLE `factura` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_facturacion` date DEFAULT NULL,
  `forma_pago` varchar(255) DEFAULT NULL,
  `monto_descuento` double NOT NULL,
  `mp_preference_id` varchar(255) DEFAULT NULL,
  `total_costo` double DEFAULT NULL,
  `total_venta` double DEFAULT NULL,
  `pedido_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_ngujt6d9ti8crahqfrfb4p9d8` (`pedido_id`),
  CONSTRAINT `FKn6q9mbkc0n4g1uux57clh2bq0` FOREIGN KEY (`pedido_id`) REFERENCES `pedido` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

/*Data for the table `factura` */

insert  into `factura`(`id`,`fecha_facturacion`,`forma_pago`,`monto_descuento`,`mp_preference_id`,`total_costo`,`total_venta`,`pedido_id`) values (1,'2024-06-19','Efectivo',11.5,'',3610,103.5,1),(2,'2024-06-19','MercadoPago',18.5,'',2042,166.5,2),(3,'2024-06-19','MercadoPago',0,'',10,15,3),(4,'2024-06-19','Efectivo',11.5,'',3610,103.5,4);

/*Table structure for table `imagen` */

DROP TABLE IF EXISTS `imagen`;

CREATE TABLE `imagen` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) DEFAULT NULL,
  `articulo_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKnlwl1vdnd0vsn7m8bhkvs85dh` (`articulo_id`),
  CONSTRAINT `FKnlwl1vdnd0vsn7m8bhkvs85dh` FOREIGN KEY (`articulo_id`) REFERENCES `articulo` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

/*Data for the table `imagen` */

insert  into `imagen`(`id`,`url`,`articulo_id`) values (1,'https://cdn.recetasderechupete.com/wp-content/uploads/2017/05/Pan-de-hamburguesa.jpg',1),(2,'https://www.carnave.com.ar/wp-content/uploads/2021/03/Medallones-de-Carne-Vacuna-x2.jpg',2),(3,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdLd6x1SooBkaY3CuHfWSOWOEB57dlR-EQdQ&s',3),(4,'https://elpoderdelconsumidor.org/wp-content/uploads/2015/11/Papas.jpg',4),(5,'https://i.blogs.es/8ceb02/pollo_entero/1366_2000.jpg',5),(6,'https://images.ecestaticos.com/WBp24vmd9x9S722ZiqGWgPaf0w0=/0x109:2119x1301/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F6be%2F87b%2F448%2F6be87b448c2cf27ea55a994c163556d6.jpg',6),(7,'https://www.lavanguardia.com/files/article_main_microformat/uploads/2019/01/14/5e997adde64f0.jpeg',7),(8,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIH9IOLYHGD-CPb8MFtKb352AL5Tx0eiQzYw&s',8),(9,'https://www.hola.com/imagenes/estar-bien/20230727236387/tomate-propiedades-saludables-dieta/1-286-101/tomate-t.jpg?im=Resize=(680)',9),(10,'https://s2.abcstatics.com/media/bienestar/2020/09/01/lechuga-kSlD--1248x698@abc.jpg',10),(11,'https://www.mandy.com.ar/images/img_rebozadores-1.jpg',11),(13,'https://enriquetomas.com/cdn/shop/articles/diferencia-entre-tocino-y-panceta.jpg?v=1690363223',12),(14,'https://statics.dinoonline.com.ar/imagenes/full_600x600_ma/3040004_f.jpg',13),(16,'https://dcdn.mitiendanube.com/stores/001/151/835/products/77908950009971-d6396175b7ca20416b15890784336194-640-0.jpg',15),(17,'https://media.f2h.shop/media/catalog/product/cache/ab45d104292f1bb63d093e6be8310c97/c/o/corona_710_ml.png',14),(18,'https://saborargento.com.ar/wp-content/uploads/2023/09/Receta-de-Pizza-Muzzarella.jpg',16),(19,'https://sabor.eluniverso.com/wp-content/uploads/2023/09/1hqq-scaled.jpg',17),(20,'https://scm-assets.constant.co/scm/unilever/86c9fcb727c4d90deffba18b2593a9cf/84b57886-fee2-4f98-8920-027f8afd654c.png',18),(21,'https://clubhouseve.com/wp-content/uploads/2018/06/pollo-crispy.jpeg',19),(22,'https://www.comedera.com/wp-content/uploads/2022/11/papas-fritas-con-queso-cheddar-PG_PFCQCY30320002.jpg',20),(23,'https://www.comedera.com/wp-content/uploads/2015/10/ensalada-de-pollo.jpg',21),(24,'https://media-cdn.tripadvisor.com/media/photo-s/18/92/e1/98/hamburguesa-la-neta-doble.jpg',22);

/*Table structure for table `imagen_promocion` */

DROP TABLE IF EXISTS `imagen_promocion`;

CREATE TABLE `imagen_promocion` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `imagen` longblob DEFAULT NULL,
  `imagen_path` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

/*Data for the table `imagen_promocion` */

/*Table structure for table `localidad` */

DROP TABLE IF EXISTS `localidad`;

CREATE TABLE `localidad` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `provincia_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK37mbpxuicwnbo878s9djjgr39` (`provincia_id`),
  CONSTRAINT `FK37mbpxuicwnbo878s9djjgr39` FOREIGN KEY (`provincia_id`) REFERENCES `provincia` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

/*Data for the table `localidad` */

insert  into `localidad`(`id`,`nombre`,`provincia_id`) values (1,'Guaymallen',8),(2,'Las Heras',8),(3,'San Martin',8),(4,'Godoy Cruz',8),(5,'Maipu',8),(6,'Uspallata',8),(7,'Tunuyan',8),(8,'Tupungato',8),(9,'Malargue',8),(10,'Rodeo del Medio',8),(11,'Rodeo de la Cruz',8),(12,'Beltran',8),(13,'Rivadavia',8),(14,'Junin',8),(15,'La Consulta',8),(16,'Lulunta',8),(17,'La Puntilla',8),(18,'Chacras de Coria',8);

/*Table structure for table `pais` */

DROP TABLE IF EXISTS `pais`;

CREATE TABLE `pais` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

/*Data for the table `pais` */

insert  into `pais`(`id`,`nombre`) values (1,'Argentina');

/*Table structure for table `pedido` */

DROP TABLE IF EXISTS `pedido`;

CREATE TABLE `pedido` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `estado` varchar(255) DEFAULT NULL,
  `fecha_pedido` date DEFAULT NULL,
  `hora_estimada_finalizacion` time(6) DEFAULT NULL,
  `total` double NOT NULL,
  `total_costo` double NOT NULL,
  `cliente_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK30s8j2ktpay6of18lbyqn3632` (`cliente_id`),
  CONSTRAINT `FK30s8j2ktpay6of18lbyqn3632` FOREIGN KEY (`cliente_id`) REFERENCES `cliente` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

/*Data for the table `pedido` */

insert  into `pedido`(`id`,`estado`,`fecha_pedido`,`hora_estimada_finalizacion`,`total`,`total_costo`,`cliente_id`) values (1,'Aprobado','2024-06-19','13:43:57.000000',103.5,3610,2),(2,'Recibido','2024-06-19','13:59:18.000000',166.5,2042,2),(3,'Recibido','2024-06-19','13:48:31.000000',15,10,2),(4,'Recibido','2024-06-19','14:06:07.000000',103.5,3610,3);

/*Table structure for table `pedido_detalle` */

DROP TABLE IF EXISTS `pedido_detalle`;

CREATE TABLE `pedido_detalle` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `cantidad` int(11) NOT NULL,
  `sub_total` double NOT NULL,
  `id_articulo` bigint(20) DEFAULT NULL,
  `id_pedido` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK8aese3d9j24apl1varc12tp7c` (`id_articulo`),
  KEY `FKaxtxfsueb7pagpev7p4r4mbin` (`id_pedido`),
  CONSTRAINT `FK8aese3d9j24apl1varc12tp7c` FOREIGN KEY (`id_articulo`) REFERENCES `articulo` (`id`),
  CONSTRAINT `FKaxtxfsueb7pagpev7p4r4mbin` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

/*Data for the table `pedido_detalle` */

insert  into `pedido_detalle`(`id`,`cantidad`,`sub_total`,`id_articulo`,`id_pedido`) values (1,1,15,15,1),(2,1,100,16,1),(3,1,100,17,2),(4,1,70,18,2),(5,1,15,14,2),(6,1,15,15,3),(7,1,15,15,4),(8,1,100,16,4);

/*Table structure for table `provincia` */

DROP TABLE IF EXISTS `provincia`;

CREATE TABLE `provincia` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `pais_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKm4s599988w0v1q1nw6dyo5t2m` (`pais_id`),
  CONSTRAINT `FKm4s599988w0v1q1nw6dyo5t2m` FOREIGN KEY (`pais_id`) REFERENCES `pais` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

/*Data for the table `provincia` */

insert  into `provincia`(`id`,`nombre`,`pais_id`) values (1,'Ciudad Autónoma de Buenos Aires (CABA)',1),(2,'Buenos Aires',1),(3,'Catamarca',1),(4,'Córdoba',1),(5,'Corrientes',1),(6,'Entre Ríos',1),(7,'Jujuy',1),(8,'Mendoza',1),(9,'La Rioja',1),(10,'Salta',1),(11,'San Juan',1),(12,'San Luis',1),(13,'Santa Fe',1),(14,'Santiago del Estero',1),(15,'Tucumán',1),(16,'Chaco',1),(17,'Chubut',1),(18,'Formosa',1),(19,'Misiones',1),(20,'Neuquén',1),(21,'La Pampa',1),(22,'Río Negro',1),(23,'Santa Cruz',1),(24,'Tierra del Fuego',1);

/*Table structure for table `rol` */

DROP TABLE IF EXISTS `rol`;

CREATE TABLE `rol` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `rol_name` enum('ADMIN','CLIENTE','CAJERO','COCINERO','DELIVERY') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

/*Data for the table `rol` */

insert  into `rol`(`id`,`rol_name`) values (1,'ADMIN'),(2,'CLIENTE'),(3,'CAJERO'),(4,'COCINERO'),(5,'DELIVERY');

/*Table structure for table `sucursal` */

DROP TABLE IF EXISTS `sucursal`;

CREATE TABLE `sucursal` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `casa_matriz` bit(1) DEFAULT NULL,
  `horario_apertura` time(6) DEFAULT NULL,
  `horario_cierre` time(6) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `domicilio_id` bigint(20) DEFAULT NULL,
  `empresa_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_34hifwa9nn1cgdbjgkosx0wy2` (`domicilio_id`),
  KEY `FK3w56rbjykxbp2e79cdq0xsghd` (`empresa_id`),
  CONSTRAINT `FK3w56rbjykxbp2e79cdq0xsghd` FOREIGN KEY (`empresa_id`) REFERENCES `empresa` (`id`),
  CONSTRAINT `FKpxac8l3j9mwcwolj5dyctwpxo` FOREIGN KEY (`domicilio_id`) REFERENCES `domicilio` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

/*Data for the table `sucursal` */

/*Table structure for table `unidad_medida` */

DROP TABLE IF EXISTS `unidad_medida`;

CREATE TABLE `unidad_medida` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `denominacion` varchar(255) DEFAULT NULL,
  `eliminado` bit(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

/*Data for the table `unidad_medida` */

insert  into `unidad_medida`(`id`,`denominacion`,`eliminado`) values (1,'Kilos','\0'),(2,'Gramos','\0'),(3,'Unidades','\0'),(4,'Litros','\0'),(5,'Mililitros','\0'),(6,'Cm3',''),(7,'Toneladas','');

/*Table structure for table `usuario_cliente` */

DROP TABLE IF EXISTS `usuario_cliente`;

CREATE TABLE `usuario_cliente` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre_usuario` varchar(255) DEFAULT NULL,
  `id_rol` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKcyi0x2avh4ix3ivhbcrq67dpq` (`id_rol`),
  CONSTRAINT `FKcyi0x2avh4ix3ivhbcrq67dpq` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

/*Data for the table `usuario_cliente` */

insert  into `usuario_cliente`(`id`,`nombre_usuario`,`id_rol`) values (4,'cocinero',4),(5,'vani.lunaa',1),(6,'cliente',2),(7,'cajero',3);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
