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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

/*Data for the table `articulo` */

insert  into `articulo`(`id`,`denominacion`,`precio_venta`,`categoria_id`,`unidad_medida_id`) values (1,'Vino',20,1,1),(2,'Harina',12,2,2),(3,'Pan',20,2,2),(4,'Pan de Hamburguesa',20,2,3),(5,'Medallon de carne vacuno',25,2,3),(6,'Queso Cheddar',8,2,3),(7,'Salsa de tomate',6,2,1),(8,'Queso Mozzarella',4,2,2),(9,'Hamburguesa con Queso',20,2,3),(10,'Pizza Mozzarella',25,2,3),(11,'Hamburguesa doble carne',30,2,3),(12,'Papas',7,2,2),(13,'Bacon',7,2,2),(14,'Papas fritas',6,2,2),(15,'Papas Fritas Buen Saborcito',25,2,2),(16,'Pollo',8,2,2),(17,'Cereales para rebozar',5,2,2),(18,'Pollo Crispy',25,2,3),(19,'Agua Mineral sin Gas',10,1,1),(20,'Gaseosa',15,1,1);

/*Table structure for table `articulo_insumo` */

DROP TABLE IF EXISTS `articulo_insumo`;

CREATE TABLE `articulo_insumo` (
  `es_para_elaborar` bit(1) NOT NULL,
  `precio_compra` double DEFAULT NULL,
  `stock_actual` int(11) DEFAULT NULL,
  `stock_maximo` int(11) DEFAULT NULL,
  `id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `FK5yoloai8ewly5lkbi3wl5904y` FOREIGN KEY (`id`) REFERENCES `articulo` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

/*Data for the table `articulo_insumo` */

insert  into `articulo_insumo`(`es_para_elaborar`,`precio_compra`,`stock_actual`,`stock_maximo`,`id`) values ('\0',10,2,20,1),('',12,2,112,2),('',10,100,200,4),('',15,100,200,5),('',5,100,200,6),('',3,50,70,7),('',2,20,50,8),('',5,40,50,12),('',4,40,50,13),('',5,100,200,16),('',3,100,200,17),('\0',5,100,200,19),('\0',10,100,200,20);

/*Table structure for table `articulo_manufacturado` */

DROP TABLE IF EXISTS `articulo_manufacturado`;

CREATE TABLE `articulo_manufacturado` (
  `descripcion` varchar(255) DEFAULT NULL,
  `preparacion` varchar(255) DEFAULT NULL,
  `tiempo_estimado_minutos` int(11) DEFAULT NULL,
  `id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `FK9t82oibyduo62wci8y6gfpllx` FOREIGN KEY (`id`) REFERENCES `articulo` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

/*Data for the table `articulo_manufacturado` */

insert  into `articulo_manufacturado`(`descripcion`,`preparacion`,`tiempo_estimado_minutos`,`id`) values ('pan','pan',5,3),('Hamburguesa de carne a la parrilla, con queso cheddar fundido y pan brioch','Se colocan los medallones de carne a la parrilla, una vez en su punto justo se le colocan 2 fetas de cheddar y se dejan fundir siendo uno. Se coloca el medallon de carne y queso dentro del pan para lograr sabores unicos',15,9),('Pizza a la piedra con mozzarella','Se prepara la masa, se la deja leudar unos minutos, se la estira y se la coloca en el piso del horno de barro. Una vez cocida se le coloca la salsa y el queso. Vuelve al horno una vez que este fundido el queso. Esta lista para comer',15,10),('Hamburguesa doble carne y queso','Se colocan los medallones de carne a la parrilla, una vez en su punto justo se le colocan 2 fetas de cheddar y se dejan fundir siendo uno. Se coloca el medallon de carne y queso dentro del pan para lograr sabores unicos',20,11),('Papas fritas','Se pelan las papas, se fríen a la temperatura correcta para lograr el punto perfecto',10,14),('Papas, con chedda y bacon','Se pelan las papas, se fríen a la temperatura correcta para lograr el punto perfecto, se les coloca cheddar y bacon crocante',15,15),('Pechuga de pollo rebozada','Se corta el pollo, se lo reboza con cereales especialmente seleccionados y se los fríe. Logrando el mejor sabor',15,18);

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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

/*Data for the table `articulo_manufacturado_detalle` */

insert  into `articulo_manufacturado_detalle`(`id`,`cantidad`,`articulo_insumo_id`,`articulo_manufacturado_id`) values (1,1,2,3),(2,-2,12,14),(3,1,4,9),(4,1,5,9),(5,2,6,9),(6,1,2,10),(7,1,8,10),(8,1,7,10),(9,1,4,11),(10,2,5,11),(11,4,6,11),(12,2,13,15),(13,1,12,15),(14,3,6,15),(15,10,16,18),(16,5,17,18);

/*Table structure for table `categoria` */

DROP TABLE IF EXISTS `categoria`;

CREATE TABLE `categoria` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `denominacion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

/*Data for the table `categoria` */

insert  into `categoria`(`id`,`denominacion`) values (1,'Bebidas'),(2,'Alimentos');

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

/*Data for the table `cliente` */

insert  into `cliente`(`id`,`apellido`,`email`,`fecha_nacimiento`,`nombre`,`telefono`,`usuario_id`) values (1,'Lattuca','lucas@buensa.com','1995-04-27','lucas','011 25387415',5),(2,'luna','vani.lunaa@gmail.com',NULL,'vanina','',6),(3,NULL,'cocinero@buensa.com',NULL,'cocinero','',7);

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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

/*Data for the table `domicilio` */

insert  into `domicilio`(`id`,`calle`,`cp`,`numero`,`cliente_id`,`localidad_id`) values (1,'Las Palmeras',5521,3510,1,1);

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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

/*Data for the table `factura` */

insert  into `factura`(`id`,`fecha_facturacion`,`forma_pago`,`monto_descuento`,`mp_preference_id`,`total_costo`,`total_venta`,`pedido_id`) values (1,'2024-06-11','Efectivo',2,'',10,18,1);

/*Table structure for table `imagen` */

DROP TABLE IF EXISTS `imagen`;

CREATE TABLE `imagen` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) DEFAULT NULL,
  `articulo_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKnlwl1vdnd0vsn7m8bhkvs85dh` (`articulo_id`),
  CONSTRAINT `FKnlwl1vdnd0vsn7m8bhkvs85dh` FOREIGN KEY (`articulo_id`) REFERENCES `articulo` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

/*Data for the table `imagen` */

insert  into `imagen`(`id`,`url`,`articulo_id`) values (6,'https://http2.mlstatic.com/D_NQ_NP_914235-MLA50160201502_062022-O.webp',1),(7,'https://images.ecestaticos.com/WBp24vmd9x9S722ZiqGWgPaf0w0=/0x109:2119x1301/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F6be%2F87b%2F448%2F6be87b448c2cf27ea55a994c163556d6.jpg',2),(8,'https://cuk-it.com/wp-content/uploads/2020/11/pan-hamburguesa.webp',3),(9,'https://cuk-it.com/wp-content/uploads/2020/11/pan-hamburguesa.webp',4),(10,'https://www.carnave.com.ar/wp-content/uploads/2021/03/Medallones-de-Carne-Vacuna-x2.jpg',5),(11,'https://comosefabrica.com/img/entradas/queso-cheddar.jpg',6),(12,'https://www.conasi.eu/blog/wp-content/uploads/2019/05/salsa-de-tomate-casera-des.jpg',7),(13,'https://pizzeriarurale.wordpress.com/wp-content/uploads/2017/05/tipos-de-queso-mozzarella-bufala-queso-mozzarella.jpg',8),(17,'https://elpoderdelconsumidor.org/wp-content/uploads/2015/11/Papas.jpg',12),(18,'https://images.immediate.co.uk/production/volatile/sites/30/2019/11/Bacon-rashers-in-a-pan-72c07f4.jpg?resize=700%2C366',13),(20,'https://sabor.eluniverso.com/wp-content/uploads/2023/09/1hqq-scaled.jpg',9),(21,'https://saborargento.com.ar/wp-content/uploads/2023/09/Receta-de-Pizza-Muzzarella.jpg',10),(22,'https://media-cdn.tripadvisor.com/media/photo-s/18/92/e1/89/hamburguesa-double-b.jpg',11),(24,'https://scm-assets.constant.co/scm/unilever/86c9fcb727c4d90deffba18b2593a9cf/84b57886-fee2-4f98-8920-027f8afd654c.png',14),(25,'https://www.comedera.com/wp-content/uploads/2022/11/papas-fritas-con-queso-cheddar-PG_PFCQCY30320002.jpg',15),(26,'https://canduran.com/wp/wp-content/uploads/2017/02/pimienta-alimentos-crudos-blanco-fresco_1203-5518.jpg',16),(27,'https://s1.elespanol.com/2018/11/06/ciencia/nutricion/cereales-nutricion-nutricion_351228002_104673600_1024x576.jpg',17),(28,'https://clubhouseve.com/wp-content/uploads/2018/06/pollo-crispy.jpeg',18),(29,'https://statics.dinoonline.com.ar/imagenes/full_600x600_ma/3040004_f.jpg',19),(30,'https://dcdn.mitiendanube.com/stores/001/151/835/products/77908950009971-d6396175b7ca20416b15890784336194-640-0.jpg',20);

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
  `fecha_pedido` date DEFAULT NULL,
  `hora_estimada_finalizacion` time(6) DEFAULT NULL,
  `total` double NOT NULL,
  `total_costo` double NOT NULL,
  `cliente_id` bigint(20) DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK30s8j2ktpay6of18lbyqn3632` (`cliente_id`),
  CONSTRAINT `FK30s8j2ktpay6of18lbyqn3632` FOREIGN KEY (`cliente_id`) REFERENCES `cliente` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

/*Data for the table `pedido` */

insert  into `pedido`(`id`,`fecha_pedido`,`hora_estimada_finalizacion`,`total`,`total_costo`,`cliente_id`,`estado`) values (1,'2024-06-11','22:51:57.000000',18,10,1,'Aprobado');

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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

/*Data for the table `pedido_detalle` */

insert  into `pedido_detalle`(`id`,`cantidad`,`sub_total`,`id_articulo`,`id_pedido`) values (1,1,20,1,1);

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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

/*Data for the table `unidad_medida` */

insert  into `unidad_medida`(`id`,`denominacion`) values (1,'Litros'),(2,'Kilos'),(3,'Unidad');

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

insert  into `usuario_cliente`(`id`,`nombre_usuario`,`id_rol`) values (5,'lucas',1),(6,'vani.lunaa',2),(7,'cocinero',4);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
