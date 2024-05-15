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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

/*Data for the table `articulo` */

insert  into `articulo`(`id`,`denominacion`,`precio_venta`,`categoria_id`,`unidad_medida_id`) values (1,'Papas',22.54,2,1),(2,'Harina',22.5,1,2),(3,'Hamburguesa con papas',130,2,2),(4,'pizza',180,2,2),(9,'Asado',12,2,2),(13,'tomate',10,1,1),(15,'lechuga',5,1,1),(17,'ensalada',54,1,1),(18,'pollo crispy',100,2,2);

/*Table structure for table `articulo_insumo` */

DROP TABLE IF EXISTS `articulo_insumo`;

CREATE TABLE `articulo_insumo` (
  `es_para_elaborar` tinyint(1) NOT NULL,
  `precio_compra` double DEFAULT NULL,
  `stock_actual` int(11) DEFAULT NULL,
  `stock_maximo` int(11) DEFAULT NULL,
  `id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `FK5yoloai8ewly5lkbi3wl5904y` FOREIGN KEY (`id`) REFERENCES `articulo` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

/*Data for the table `articulo_insumo` */

insert  into `articulo_insumo`(`es_para_elaborar`,`precio_compra`,`stock_actual`,`stock_maximo`,`id`) values (1,10.5,2,9,1),(1,10.5,2,10,2),(1,5,4,100,13),(1,3,12,50,15);

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

insert  into `articulo_manufacturado`(`descripcion`,`preparacion`,`tiempo_estimado_minutos`,`id`) values ('La mejor del pais','Poner el queso sobre la carne',10,3),('La mejor pizza del pais','pizza con anana',20,4),('postman con fritas','asado',123,9),('Contiene tomate y lechuga','Se cortan lo vegetales y se mezclan',15,17),('pollo frito','se frie el pollito',45,18);

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

insert  into `articulo_manufacturado_detalle`(`id`,`cantidad`,`articulo_insumo_id`,`articulo_manufacturado_id`) values (1,15,1,3),(2,10,2,3),(3,5,2,4),(4,2,1,9),(12,5,13,3),(13,5,15,17),(14,1,13,17),(15,5,1,18),(16,5,1,17);

/*Table structure for table `categoria` */

DROP TABLE IF EXISTS `categoria`;

CREATE TABLE `categoria` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `denominacion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

/*Data for the table `categoria` */

insert  into `categoria`(`id`,`denominacion`) values (1,'Insumos'),(2,'Frituras');

/*Table structure for table `imagen` */

DROP TABLE IF EXISTS `imagen`;

CREATE TABLE `imagen` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) DEFAULT NULL,
  `articulo_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKnlwl1vdnd0vsn7m8bhkvs85dh` (`articulo_id`),
  CONSTRAINT `FKnlwl1vdnd0vsn7m8bhkvs85dh` FOREIGN KEY (`articulo_id`) REFERENCES `articulo` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

/*Data for the table `imagen` */

insert  into `imagen`(`id`,`url`,`articulo_id`) values (11,'https://mandolina.co/wp-content/uploads/2023/03/648366622-1024x683.jpg',4),(22,'https://5aldia.cl/wp-content/uploads/2018/03/lechuga.jpg',15),(27,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREmpSVJB-rmNdW8Dfqqd9x4Pdq_6xO84Z7KeulIv1fkw&s',1),(28,'https://thefoodtech.com/wp-content/uploads/2020/06/Componentes-de-calidad-en-el-tomate-828x548.jpg',13),(29,'https://www.quironsalud.com/blogs/es/hablemos-nutricion/tomate.ficheros/2299323-tomate1.jpg?width=201&height=156&aspectRatio=true',13),(30,'https://mandolina.co/wp-content/uploads/2023/03/648366622-1024x683.jpg',2),(32,'https://mandolina.co/wp-content/uploads/2023/03/648366622-1024x683.jpg',3),(34,'https://mandolina.co/wp-content/uploads/2023/03/648366622-1024x683.jpg',18),(36,'https://mandolina.co/wp-content/uploads/2023/03/648366622-1024x683.jpg',9),(37,'https://www.quironsalud.com/blogs/es/hablemos-nutricion/tomate.ficheros/2299323-tomate1.jpg?width=201&height=156&aspectRatio=true',17),(38,'https://www.quironsalud.com/blogs/es/hablemos-nutricion/tomate.ficheros/2299323-tomate1.jpg?width=201&height=156&aspectRatio=true',17);

/*Table structure for table `unidad_medida` */

DROP TABLE IF EXISTS `unidad_medida`;

CREATE TABLE `unidad_medida` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `denominacion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

/*Data for the table `unidad_medida` */

insert  into `unidad_medida`(`id`,`denominacion`) values (1,'Kilos'),(2,'Unidades');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
