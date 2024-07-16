-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-07-2024 a las 17:00:34
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_appsire`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `amenidades`
--

CREATE TABLE `amenidades` (
  `id` int(11) NOT NULL,
  `icono` varchar(60) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `activo` tinyint(1) NOT NULL,
  `proyecto_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `business`
--

CREATE TABLE `business` (
  `id` int(11) NOT NULL,
  `nombre_razon` varchar(200) NOT NULL,
  `website` varchar(200) DEFAULT NULL,
  `phone_contact` varchar(20) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `logo` varchar(200) DEFAULT NULL,
  `documento` varchar(20) NOT NULL,
  `fecha_created` varchar(20) NOT NULL,
  `created_by` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `business`
--

INSERT INTO `business` (`id`, `nombre_razon`, `website`, `phone_contact`, `email`, `logo`, `documento`, `fecha_created`, `created_by`) VALUES
(1, 'La llorona cantina2', 'llroona.com', '+51900266553', 'jampierv127@gmail.com', 'imagenes/business/65e36f4a9b766-prueba.jpg', '20568954587', '2024-04-23 09:24:00', 1),
(2, 'FESTIVAL', 'www.festival.com', '+51902625848', 'admin@festival.com', 'imagenes/business/662a821b52eeb-Captura de pantalla 2023-09-24 124226.png', '20658956895', '2024-04-23 09:24:00', 1),
(3, 'SAKURA DEL PIMENTAL', 'www.sakuradelpimental.com', '+519026589568', 'admin@sakuradelpimental.com', 'imagenes/business/662a82d12f746-Captura de pantalla 2023-11-14 185624.png', '20956895689', '', 1),
(4, 'awdawdawd', 'awdawd', '+51926589859', 'jampierv127@gmail.com', 'imagenes/business/6632d043d47bc-8.jpg', '95689586897', '2024-05-01 18:29:07', 1),
(5, 'EMPRESA PRUEBA', 'empresa.com', '+51900266553', 'empresa@gmail.com', 'imagenes/business/66439a8b84e16-a.jpeg', '2056895869', '2024-05-14 12:08:27', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `caja`
--

CREATE TABLE `caja` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `fecha_creation` varchar(20) NOT NULL,
  `created_by` int(11) NOT NULL,
  `sede_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `caja`
--

INSERT INTO `caja` (`id`, `nombre`, `fecha_creation`, `created_by`, `sede_id`) VALUES
(1, 'CAJA 1 COMPUTADOR 1', '2024-05-21 18:24:49', 1, 1),
(2, 'CAJA 2 COMPUTADOR', '2024-05-21 18:25:26', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `id_cliente` int(11) NOT NULL,
  `nombres` varchar(50) NOT NULL,
  `apellidos` varchar(200) NOT NULL,
  `documento` int(11) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `celular` varchar(15) NOT NULL,
  `telefono` int(9) NOT NULL,
  `status` varchar(40) NOT NULL,
  `Pais` varchar(20) NOT NULL,
  `createdBy` int(11) NOT NULL,
  `origen` varchar(200) NOT NULL,
  `campania` varchar(200) NOT NULL,
  `ciudad` varchar(200) NOT NULL,
  `proyet_id` int(11) NOT NULL,
  `fecha_creation` varchar(20) NOT NULL,
  `hora_creation` varchar(20) NOT NULL,
  `archived` tinyint(1) NOT NULL,
  `sede_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`id_cliente`, `nombres`, `apellidos`, `documento`, `correo`, `celular`, `telefono`, `status`, `Pais`, `createdBy`, `origen`, `campania`, `ciudad`, `proyet_id`, `fecha_creation`, `hora_creation`, `archived`, `sede_id`) VALUES
(1, 'Jose', 'Silva martinez', 45689587, '', '', 0, 'ASISTIO', '', 21, '', '', '', 4, '2024-05-21', '07:38:12', 0, 1),
(2, 'Katherin', 'Vasquez', 0, '', '', 0, 'NO CONTACTADO', '', 21, '', '', '', 4, '2024-05-21', '10:12:33', 0, 2),
(3, 'Stephanie Berrios', '', 0, '', '51958437102', 0, 'VISITA', '', 21, 'Facebook Ads', '', '', 6, '2024-05-21', '11:51:03', 0, 1),
(4, 'Bedi Guzmán', '', 0, '', '51918862830', 0, 'REPROGRAMACION CONTACTO', '', 21, 'Facebook Ads', '', '', 6, '2024-05-21', '11:51:03', 0, 1),
(5, 'Luis Fernando Quispe Frisancho', '', 0, '', '51957814342', 0, 'NO INTERESADO', '', 21, 'Facebook Ads', '', '', 6, '2024-05-21', '11:51:03', 0, 1),
(6, 'Goyo Quincho Arenas', '', 0, '', '51986465018', 0, 'REPROGRAMACION CONTACTO', '', 21, 'Facebook Ads', '', '', 6, '2024-05-21', '11:51:03', 1, 1),
(7, 'Isacc Coarite', '', 0, '', '51941230298', 0, 'CONTACTADO', '', 21, 'Facebook Ads', '', '', 6, '2024-05-21', '11:51:03', 0, 1),
(8, 'Saida Uscca Pacco', '', 0, '', '51974465268', 0, 'CONTACTADO', '', 21, 'Facebook Ads', '', '', 6, '2024-05-21', '11:51:03', 0, 1),
(9, 'Yaneca Quispe', '', 0, '', '51954000252', 0, 'CONTACTADO', '', 21, 'Facebook Ads', '', '', 6, '2024-05-21', '11:51:03', 0, 1),
(10, 'Moises Vena Anquise 3', '', 0, '', '51938834808', 0, 'CONTACTADO', '', 21, 'Facebook Ads', '', '', 6, '2024-05-21', '11:51:03', 0, 1),
(11, 'Liliana Mogrovejo Rosas', '', 0, '', '51944215879', 0, 'CONTACTADO', '', 21, 'Facebook Ads', '', '', 6, '2024-05-21', '11:51:03', 0, 1),
(12, 'Anderson Carreño Toledo', '', 0, '', '51945407120', 0, 'REPROGRAMACION CONTACTO', '', 21, 'Facebook Ads', '', '', 6, '2024-05-21', '11:51:03', 0, 1),
(13, 'Pedro Quispe Revilla', '', 0, '', '51958171125', 0, 'NO CONTACTADO', '', 21, 'Facebook Ads', '', '', 6, '2024-05-21', '11:51:03', 0, 1),
(14, 'Yaneth zanga pachaure', '', 0, '', '51984567654', 0, 'CONTACTADO', '', 21, 'Facebook Ads', '', '', 6, '2024-05-21', '11:51:03', 0, 1),
(15, 'Arturomiguel Vela Guevara', '', 0, '', '51954706815', 0, 'NO CONTACTADO', '', 21, 'Facebook Ads', '', '', 6, '2024-05-21', '11:51:03', 0, 1),
(16, 'Alexander Bor', '', 0, '', '51958564530', 0, 'NO CONTACTADO', '', 21, 'Facebook Ads', '', '', 6, '2024-05-21', '11:51:03', 0, 1),
(17, 'Jesus Gilberto Herrera Alvarez', '', 0, '', '51978502310', 0, 'NO CONTACTADO', '', 21, 'Facebook Ads', '', '', 6, '2024-05-21', '11:51:03', 0, 1),
(18, 'Rone Quispe Diaz', '', 0, '', '51916182630', 0, 'NO CONTACTADO', '', 21, 'Facebook Ads', '', '', 6, '2024-05-21', '11:51:03', 0, 1),
(19, 'danger Roger chuchullo huanca', '', 0, '', '51921248043', 0, 'NO CONTACTADO', '', 21, 'Facebook Ads', '', '', 6, '2024-05-21', '11:51:03', 0, 1),
(20, 'Lourdes Merma', '', 0, '', '51966489835', 0, 'NO CONTACTADO', '', 21, 'Facebook Ads', '', '', 6, '2024-05-21', '11:51:03', 0, 1),
(21, 'PRUEBA ASESOR FLOR', '', 0, '', '', 0, 'NO CONTACTADO', '', 28, 'Messenger', '', '', 4, '2024-05-21', '15:10:28', 0, 2),
(22, 'Stephanie  Berrios', '', 0, '', '', 2147483647, 'VENTA', '', 28, 'Llamada', '', '', 4, '2024-05-21', '15:20:55', 0, 2),
(23, 'Bedi Guzmán', '', 0, '', '', 2147483647, 'NO CONTACTADO', '', 28, 'Llamada', '', '', 4, '2024-05-21', '15:20:55', 0, 2),
(24, 'Luis Fernando Quispe Frisancho', '', 0, '', '', 2147483647, 'NO CONTACTADO', '', 28, 'Llamada', '', '', 4, '2024-05-21', '15:20:55', 0, 2),
(25, 'Goyo Quincho Arenas', '', 0, '', '', 2147483647, 'NO CONTACTADO', '', 28, 'Llamada', '', '', 4, '2024-05-21', '15:20:55', 0, 2),
(26, 'Isacc Coarite', '', 0, '', '', 2147483647, 'NO CONTACTADO', '', 28, 'Llamada', '', '', 4, '2024-05-21', '15:20:55', 0, 2),
(27, 'Saida Uscca Pacco', '', 0, '', '', 2147483647, 'NO CONTACTADO', '', 28, 'Llamada', '', '', 4, '2024-05-21', '15:20:55', 0, 2),
(28, 'Yaneca Quispe', '', 0, '', '', 2147483647, 'NO CONTACTADO', '', 28, 'Llamada', '', '', 4, '2024-05-21', '15:20:55', 0, 2),
(29, 'Moises Vena Anquise 3', '', 0, '', '', 2147483647, 'NO CONTACTADO', '', 28, 'Llamada', '', '', 4, '2024-05-21', '15:20:55', 0, 2),
(30, 'Liliana Mogrovejo Rosas', '', 0, '', '', 2147483647, 'NO CONTACTADO', '', 28, 'Llamada', '', '', 4, '2024-05-21', '15:20:55', 0, 2),
(31, 'Anderson Carreño Toledo', '', 0, '', '', 2147483647, 'NO CONTACTADO', '', 28, 'Llamada', '', '', 4, '2024-05-21', '15:20:55', 0, 2),
(32, 'Pedro Quispe Revilla', '', 0, '', '', 2147483647, 'NO CONTACTADO', '', 28, 'Llamada', '', '', 4, '2024-05-21', '15:20:55', 0, 2),
(33, 'Yaneth zanga pachaure', '', 0, '', '', 2147483647, 'NO CONTACTADO', '', 28, 'Llamada', '', '', 4, '2024-05-21', '15:20:55', 0, 2),
(34, 'Arturomiguel Vela Guevara', '', 0, '', '', 2147483647, 'NO CONTACTADO', '', 28, 'Llamada', '', '', 4, '2024-05-21', '15:20:55', 0, 2),
(35, 'Alexander Bor', '', 0, '', '', 2147483647, 'NO CONTACTADO', '', 28, 'Llamada', '', '', 4, '2024-05-21', '15:20:55', 0, 2),
(36, 'Jesus Gilberto Herrera Alvarez', '', 0, '', '', 2147483647, 'NO CONTACTADO', '', 28, 'Llamada', '', '', 4, '2024-05-21', '15:20:55', 0, 2),
(37, 'Rone Quispe Diaz', '', 0, '', '', 2147483647, 'NO CONTACTADO', '', 28, 'Llamada', '', '', 4, '2024-05-21', '15:20:55', 0, 2),
(38, 'danger Roger chuchullo huanca', '', 0, '', '', 2147483647, 'NO CONTACTADO', '', 28, 'Llamada', '', '', 4, '2024-05-21', '15:20:55', 0, 2),
(39, 'Lourdes Merma', '', 0, '', '', 2147483647, 'NO CONTACTADO', '', 28, 'Llamada', '', '', 4, '2024-05-21', '15:20:55', 0, 2),
(40, 'LEAD DESDE CAJERO', '', 0, '', '', 0, 'NO CONTACTADO', '', 29, 'Messenger', '', '', 4, '2024-05-21', '23:36:23', 0, 1),
(41, 'CLIENTE ASESOR', 'DE JAIMITO', 0, '', '', 0, 'ASISTIO', '', 30, 'WhatsApp', '', '', 6, '2024-05-30', '22:03:39', 0, 1),
(42, 'jampier 12', '', 0, '', '', 0, 'NO CONTACTADO', '', 30, 'Marketplace', 'xd', '', 4, '2024-07-15', '14:18:50', 0, 1),
(43, '', '', 0, '', '', 0, 'NO CONTACTADO', '', 30, '', '', '', 0, '2024-07-15', '14:18:50', 0, 1),
(44, 'awdawd', '', 0, '', '', 0, 'NO CONTACTADO', '', 30, 'Facebook Ads', '', '', 5, '2024-07-15', '14:20:16', 0, 1),
(45, 'awdawd', '', 0, '', '', 0, 'NO CONTACTADO', '', 30, 'Facebook Ads', '', '', 5, '2024-07-15', '14:20:17', 0, 1),
(46, 'dawdawd34453', '', 0, '', '', 0, 'NO CONTACTADO', '', 30, 'WhatsApp', '', '', 6, '2024-07-15', '14:21:43', 0, 1),
(47, '', '', 0, '', '', 0, 'NO CONTACTADO', '', 30, '', '', '', 0, '2024-07-15', '14:21:44', 0, 1),
(48, 'awdawd34634634', '', 0, '', '', 0, 'NO CONTACTADO', '', 30, 'Messenger', '', '', 5, '2024-07-15', '14:23:49', 0, 1),
(49, '', '', 0, '', '', 0, 'NO CONTACTADO', '', 30, '', '', '', 0, '2024-07-15', '14:23:49', 0, 1),
(50, 'ffffffffff', 'wdawd ', 0, '', '', 0, 'NO CONTACTADO', '', 30, 'Facebook Ads', '', '', 7, '2024-07-15', '14:24:36', 0, 1),
(51, '', '', 0, '', '', 0, 'NO CONTACTADO', '', 30, '', '', '', 0, '2024-07-15', '14:24:36', 0, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comisiones`
--

CREATE TABLE `comisiones` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `monto_comision` float NOT NULL,
  `venta_id` int(11) NOT NULL,
  `tipo_comision` varchar(20) NOT NULL,
  `monto_tipo_comision` float NOT NULL,
  `tipo_pago` varchar(20) NOT NULL,
  `asesor_id` int(11) NOT NULL,
  `fecha` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `comisiones`
--

INSERT INTO `comisiones` (`id`, `user_id`, `monto_comision`, `venta_id`, `tipo_comision`, `monto_tipo_comision`, `tipo_pago`, `asesor_id`, `fecha`) VALUES
(6, 21, 500, 1, 'MONTO_FIJO', 0, 'PAGO_COMPLETO', 30, '2024-05-23 22:51:59');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuotas_pago`
--

CREATE TABLE `cuotas_pago` (
  `id` int(11) NOT NULL,
  `monto` float NOT NULL,
  `fecha_pago` varchar(20) NOT NULL,
  `status` varchar(20) NOT NULL,
  `cuota_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cuotas_pago`
--

INSERT INTO `cuotas_pago` (`id`, `monto`, `fecha_pago`, `status`, `cuota_id`) VALUES
(1, 200, '2024-07-15', 'PARCIAL', 12),
(2, 400, '2024-07-15', 'PARCIAL', 12),
(3, 1000, '2024-07-15', 'TOTAL', 13),
(4, 1000, '2024-07-15', 'TOTAL', 14),
(5, 1000, '2024-07-15', 'TOTAL', 15),
(6, 1000, '2024-07-15', 'TOTAL', 16),
(7, 200, '2024-07-15', 'PARCIAL', 12),
(8, 200, '2024-07-15', 'TOTAL', 12),
(9, 400, '2024-07-15', 'PARCIAL', 17),
(10, 200, '2024-07-15', 'PARCIAL', 17),
(11, 1000, '2024-07-15', 'TOTAL', 18),
(12, 1000, '2024-07-15', 'TOTAL', 19),
(13, 300, '2024-07-15', 'PARCIAL', 20),
(14, 500, '2024-07-15', 'PARCIAL', 21),
(15, 400, '2024-07-15', 'TOTAL', 17),
(16, 200, '2024-07-15', 'PARCIAL', 20),
(17, 200, '2024-07-15', 'PARCIAL', 20),
(18, 300, '2024-07-15', 'TOTAL', 20),
(19, 500, '2024-07-15', 'TOTAL', 21),
(20, 1000, '2024-07-15', 'TOTAL', 22),
(21, 1000, '2024-07-15', 'TOTAL', 23),
(22, 1000, '2024-07-15', 'TOTAL', 24),
(23, 500, '2024-07-15', 'PARCIAL', 25),
(24, 500, '2024-07-15', 'TOTAL', 25),
(25, 200, '2024-07-15', 'PARCIAL', 26),
(26, 800, '2024-07-15', 'TOTAL', 26),
(27, 200, '2024-07-15', 'PARCIAL', 27),
(28, 400, '2024-07-15', 'PARCIAL', 27),
(29, 200, '2024-07-15', 'PARCIAL', 27),
(30, 500, '2024-07-15', 'PARCIAL', 28),
(31, 300, '2024-07-15', 'PARCIAL', 28),
(32, 100, '2024-07-15', 'PARCIAL', 28),
(33, 600, '2024-07-15', 'PARCIAL', 29),
(34, 400, '2024-07-15', 'TOTAL', 29),
(35, 800, '2024-07-15', 'PARCIAL', 32),
(36, 100, '2024-07-15', 'PARCIAL', 32),
(37, 100, '2024-07-15', 'TOTAL', 32),
(38, 1000, '2024-07-15', 'TOTAL', 33),
(39, 300, '2024-07-15', 'PARCIAL', 34),
(40, 700, '2024-07-15', 'TOTAL', 34);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_venta`
--

CREATE TABLE `detalle_venta` (
  `id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `total` float NOT NULL,
  `precio_final` float NOT NULL,
  `venta_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalle_venta`
--

INSERT INTO `detalle_venta` (`id`, `producto_id`, `cantidad`, `total`, `precio_final`, `venta_id`) VALUES
(1, 18, 1, 23000, 21000, 1),
(2, 39, 1, 26000, 26000, 2),
(3, 27, 1, 25000, 25000, 3),
(4, 28, 1, 25000, 25000, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `etiqueta`
--

CREATE TABLE `etiqueta` (
  `id` int(11) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `style` varchar(100) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `fecha_created` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `etiqueta_cliente`
--

CREATE TABLE `etiqueta_cliente` (
  `id` int(11) NOT NULL,
  `etiqueta_id` int(11) NOT NULL,
  `cliente_id` int(11) NOT NULL,
  `fecha_created` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gastos`
--

CREATE TABLE `gastos` (
  `id` int(11) NOT NULL,
  `turno_id` int(11) NOT NULL,
  `monto_gasto` float NOT NULL,
  `tipo_gasto` varchar(50) NOT NULL,
  `proyecto_id` int(11) DEFAULT NULL,
  `fecha` varchar(20) NOT NULL,
  `descripcion` varchar(50) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `gastos`
--

INSERT INTO `gastos` (`id`, `turno_id`, `monto_gasto`, `tipo_gasto`, `proyecto_id`, `fecha`, `descripcion`, `user_id`) VALUES
(1, 1, 120, 'PROYECTO', 4, '2024-05-23 10:27:13', 'GASTO DE GASOLINA VISITA DE ASESORES', 29),
(2, 2, 15000, 'PROYECTO', 4, '2024-07-15 15:37:58', 'PAGO A TRABAJADORES', 32);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gastos_admin`
--

CREATE TABLE `gastos_admin` (
  `id` int(11) NOT NULL,
  `monto_gasto` float NOT NULL,
  `tipo_gasto` varchar(50) NOT NULL,
  `proyecto_id` int(11) NOT NULL,
  `fecha` varchar(20) NOT NULL,
  `descripcion` varchar(50) NOT NULL,
  `user_id` int(11) NOT NULL,
  `sede_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `gastos_admin`
--

INSERT INTO `gastos_admin` (`id`, `monto_gasto`, `tipo_gasto`, `proyecto_id`, `fecha`, `descripcion`, `user_id`, `sede_id`) VALUES
(1, 150, 'OFICINA', 0, '2024-05-28 11:38:38', 'GASTO DE ADMIN PRUEBA', 21, 1),
(2, 200, 'OFICINA', 0, '2024-07-15 19:28:52', 'pago de escobas nuevas', 21, 1),
(3, 1200, 'PROYECTO', 7, '2024-07-15 19:31:00', 'pago de kimpieza de tierra', 21, 1),
(4, 1000, 'PROYECTO', 4, '2024-07-15 19:39:43', 'gasto arbitrario', 21, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ingresos`
--

CREATE TABLE `ingresos` (
  `id` int(11) NOT NULL,
  `turno_id` int(11) NOT NULL,
  `monto_ingreso` float NOT NULL,
  `tipo_ingreso` varchar(50) NOT NULL,
  `proyecto_id` int(11) NOT NULL,
  `fecha` varchar(20) NOT NULL,
  `descripcion` varchar(50) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ingresos`
--

INSERT INTO `ingresos` (`id`, `turno_id`, `monto_ingreso`, `tipo_ingreso`, `proyecto_id`, `fecha`, `descripcion`, `user_id`) VALUES
(1, 1, 120, 'PROYECTO', 5, '2024-05-23 10:20:44', 'PARA PAGO DE GASOLINA A VISITA DE ASESORES', 29),
(2, 2, 20000, 'PROYECTO', 4, '2024-07-15 15:37:26', 'PAGAR A TRABAJDORES', 32);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `interaccion_cliente`
--

CREATE TABLE `interaccion_cliente` (
  `id` int(11) NOT NULL,
  `cliente_id` int(11) NOT NULL,
  `fecha_visita` varchar(40) NOT NULL,
  `hora_visita` varchar(40) NOT NULL,
  `user_id` int(11) NOT NULL,
  `tipo` varchar(100) NOT NULL,
  `status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `interaccion_cliente`
--

INSERT INTO `interaccion_cliente` (`id`, `cliente_id`, `fecha_visita`, `hora_visita`, `user_id`, `tipo`, `status`) VALUES
(1, 1, '2024-05-31', '21:51:00', 30, 'VISITA', 'VALIDADO'),
(2, 41, '2024-05-31', '12:05:00', 30, 'VISITA', 'SEND_VALIDAR'),
(3, 3, '2024-06-05', '12:00:00', 21, 'VISITA', 'PENDIENTE'),
(4, 4, '2024-06-05', '14:04:00', 30, 'REPROGRAMACION CONTACTO', 'PENDIENTE'),
(5, 6, '2024-06-05', '14:00:00', 30, 'REPROGRAMACION CONTACTO', 'PENDIENTE'),
(6, 12, '2024-06-06', '14:00:00', 30, 'REPROGRAMACION CONTACTO', 'PENDIENTE');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inversiones`
--

CREATE TABLE `inversiones` (
  `id` int(11) NOT NULL,
  `monto_inversion` float NOT NULL,
  `proyecto_id` int(11) NOT NULL,
  `tipo_inversion` varchar(20) NOT NULL,
  `descripcion_inversion` varchar(50) DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `fecha_created` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `inversiones`
--

INSERT INTO `inversiones` (`id`, `monto_inversion`, `proyecto_id`, `tipo_inversion`, `descripcion_inversion`, `created_by`, `fecha_created`) VALUES
(1, 50000, 5, 'CAPITAL', 'inicio', 21, '2024-05-21 14:2134:3'),
(2, 2000, 6, 'CAPITAL', 'inicio', 21, '2024-05-21 14:244:04'),
(3, 30000, 7, 'CAPITAL', '', 21, '2024-05-21 14:2514:1'),
(4, 10000, 4, 'CAPITAL', 'es una inicial', 21, '2024-05-27 15:3155:5'),
(5, 2000, 7, 'INYECCION DE CAPITAL', 'aumentar capital', 21, '2024-07-15 19:2546:4');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lotes`
--

CREATE TABLE `lotes` (
  `id` int(11) NOT NULL,
  `proyectoID` int(11) NOT NULL,
  `ancho` float NOT NULL,
  `largo` float NOT NULL,
  `area` float NOT NULL,
  `numero` int(11) NOT NULL,
  `mz_zona` varchar(50) NOT NULL,
  `precio` float NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `cordinates` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`cordinates`)),
  `estado` varchar(50) NOT NULL,
  `costo` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `lotes`
--

INSERT INTO `lotes` (`id`, `proyectoID`, `ancho`, `largo`, `area`, `numero`, `mz_zona`, `precio`, `tipo`, `cordinates`, `estado`, `costo`) VALUES
(1, 4, 10, 20, 200, 1, 'A', 1000, 'rectangulo', '[[\"651.2526315789473\",\"-345.75322982742074\"],[\"802.0494225656132\",\"-345.75322982742074\"],[\"802.0494225656132\",\"26.75\"],[\"651.2526315789473\",\"26.75\"]]', 'OCUPADO', 500),
(2, 4, 10, 20, 200, 2, 'A', 22500, 'rectangulo', '[[1001.7906380803968,979.8068456515387],[918.8258378888456,1150.4746168840115]]', 'OCUPADO', 500),
(3, 4, 10, 20, 200, 3, 'A', 22500, 'rectangulo', '[[1087.4187238392065,979.0107416511421],[1003.7362210087123,1150.0580140700094]]', 'OCUPADO', 0),
(4, 4, 10, 200, 200, 4, 'A', 22500, 'rectangulo', '[[1172.920904491662,979.3568380233365],[1088.8443524417032,1150.8578301402174]]', 'SEPARADO', 0),
(5, 4, 10, 20, 200, 5, 'A', 22200, 'rectangulo', '[[1258.0950666028164,979.9988201392259],[1175.408206284323,1150.8054704186693]]', 'SEPARADO', 0),
(6, 4, 10, 20, 200, 6, 'A', 22500, 'rectangulo', '[[1345.7717482582023,979.6976631630581],[1259.5504604448286,1151.4439282086405]]', 'SEPARADO', 0),
(7, 4, 10.5, 21, 200, 7, 'A', 22500, 'rectangulo', '[[1430.5465922318817,979.2810565349553],[1346.8835490025601,1151.4763599764651]]', 'SEPARADO', 0),
(8, 4, 10, 20, 200, 8, 'A', 22500, 'rectangulo', '[[1513.7902771829288,980.0366841847094],[1431.7982512794329,1152.2319952544217]]', 'VENTA', 0),
(9, 4, 15, 20, 300, 9, 'A', 25000, 'rectangulo', '[[1645.8940473110088,980.0386073928545],[1516.652403297995,1151.956160368626]]', 'OCUPADO', 0),
(10, 4, 10, 25, 250, 10, 'A', 21000, 'rectangulo', '[[1642.9985487763042,1153.5455850392427],[1431.9412330741395,1240]]', 'SEPARADO', 0),
(11, 4, 10, 25, 250, 11, 'A', 23000, 'poligono', '[[1644.0485930923426,1240.180524368288],[1644.604472838458,1323.4895389651563],[1431.1472915713102,1323.2118489617428],[1431.9811188243066,1239.347423849368]]', 'SEPARADO', 0),
(12, 4, 10, 200, 200, 5, 'A', 25000, 'rectangulo', '[[1429.5,1159],[1341.5,1323.5]]', 'OCUPADO', 500),
(13, 5, 15, 20, 300, 1, 'AA', 13000, 'rectangulo', '[[446.5,341.5],[305.5,445.5]]', 'SEPARADO', 0),
(20, 6, 10, 20, 200, 2, 'A', 23500, 'poligono', '[[\"270.5\",\"189.5\"],[\"264.8570353813958\",\"258.05555725097656\"],[\"115.88315359101028\",\"223.38888549804688\"],[\"132.25\",\"156.5\"]]', 'VENTA', 0),
(21, 6, 10, 22, 220, 1, 'B', 25000, 'poligono', '[[\"264\",\"269.5\"],[\"253.25\",\"413.75\"],[\"165.5\",\"361.25\"],[\"93.25\",\"311.5\"],[\"110\",\"232.25\"]]', 'SEPARADO', 0),
(22, 6, 10, 20, 200, 1, 'H', 25000, 'poligono', '[[\"288.625\",\"126.25\"],[\"281.0625\",\"148\"],[\"273.5\",\"169.75\"],[\"133.75\",\"151.75\"],[\"150.375\",\"89.625\"]]', 'SEPARADO', 0),
(23, 6, 10, 15, 150, 1, 'J', 26000, 'rectangulo', '[[\"46.75\",\"208\"],[\"86.25\",\"208\"],[\"86.25\",\"325.5\"],[\"46.75\",\"325.5\"]]', 'SIN PUBLICAR', 0),
(24, 7, 10, 20, 200, 1, 'A', 23000, 'poligono', '[[534.875,383.375],[527,406.625],[483.25,391.5],[491,367.25]]', 'SEPARADO', 0),
(25, 7, 10, 20, 200, 2, 'A', 23000, 'poligono', '[[526.625,407.125],[520.625,425.125],[477.25,410],[482.75,392]]', 'OCUPADO', 0),
(26, 14, 10.2, 20.5, 209.1, 1, 'A1', 25000, 'poligono', '[[893,0],[897,855],[858,631],[812,465],[750,310],[681,170],[566,2]]', 'DISPONIBLE', 10000),
(27, 4, 10, 20, 200, 1, 'A', 25000, 'poligono', '[[356.13383458646626,45.75],[354.8842105263159,150.75],[229.92180451127842,124.5],[238.6691729323311,28.25]]', 'OCUPADO', 0),
(28, 4, 10, 20, 200, 2, 'A', 25000, 'poligono', '[[\"354.8842105263159\",\"152\"],[\"351.13533834586474\",\"245.75\"],[\"191.25864661654145\",\"423\"],[\"233.67067669172957\",\"123.25\"]]', 'OCUPADO', 0),
(32, 4, 10, 20, 200, 21, 'A', 22500, 'rectangulo', '[[1001.7906380803968,1150.4746168840115],[918.8258378888456,1321.1423881164844]]', 'OCUPADO', 0),
(33, 4, 10, 20, 200, 22, 'A', 22500, 'rectangulo', '[[1001.7906380803968,1321.1423881164844],[918.8258378888456,1491.8101593489573]]', 'OCUPADO', 0),
(34, 4, 10, 20, 200, 23, 'A', 22500, 'rectangulo', '[[1001.7906380803968,1491.8101593489573],[918.8258378888456,1662.4779305814302]]', 'OCUPADO', 0),
(35, 4, 10, 200, 200, 41, 'A', 22500, 'rectangulo', '[[1172.920904491662,1150.8578301402174],[1088.8443524417032,1322.3588222570984]]', 'SEPARADO', 0),
(36, 4, 10, 25, 250, 111, 'A', 23000, 'poligono', '[[1644.0485930923426,1453.6377056354356],[1644.604472838458,1536.946720232304],[1431.1472915713102,1536.6690302288905],[1431.9811188243066,1452.8046051165156]]', 'SEPARADO', 0),
(37, 4, 10, 25, 250, 1111, 'A', 23000, 'poligono', '[[1644.0485930923426,1240.180524368288],[1644.604472838458,1323.4895389651563],[1431.1472915713102,1323.2118489617428],[1431.9811188243066,1239.347423849368]]', 'SEPARADO', 0),
(39, 4, 20, 30, 600, 3, 'k', 26000, 'poligono', '[[469.2323308270677,1247.5],[468.6075187969925,1315.625],[378.00977443609025,1317.5],[376.7601503759399,1245]]', 'OCUPADO', 0),
(40, 4, 20, 30, 600, 4, 'k', 26000, 'poligono', '[[469.2323308270677,1339.9721804511278],[468.6075187969925,1408.0971804511278],[378.00977443609025,1409.9721804511278],[376.7601503759399,1337.4721804511278]]', 'SIN PUBLICAR', 0),
(41, 4, 20, 30, 600, 5, 'k', 26000, 'poligono', '[[469.2323308270677,1432.4443609022555],[468.6075187969925,1500.5693609022555],[378.00977443609025,1502.4443609022555],[376.7601503759399,1429.9443609022555]]', 'SIN PUBLICAR', 0),
(42, 4, 20, 30, 600, 6, 'k', 26000, 'poligono', '[[469.2323308270677,1524.9165413533835],[468.6075187969925,1593.0415413533835],[378.00977443609025,1594.9165413533835],[376.7601503759399,1522.4165413533835]]', 'SIN PUBLICAR', 0),
(43, 4, 20, 30, 600, 7, 'k', 26000, 'poligono', '[[469.2323308270677,1617.3887218045113],[468.6075187969925,1685.5137218045113],[378.00977443609025,1687.3887218045113],[376.7601503759399,1614.8887218045113]]', 'SIN PUBLICAR', 0),
(44, 4, 20, 30, 600, 8, 'k', 26000, 'poligono', '[[469.2323308270677,1689.8887218045113],[468.6075187969925,1758.0137218045113],[378.00977443609025,1759.8887218045113],[376.7601503759399,1687.3887218045113]]', 'SIN PUBLICAR', 0),
(45, 4, 20, 30, 600, 9, 'k', 26000, 'poligono', '[[561.7045112781955,1689.8887218045113],[561.0796992481203,1758.0137218045113],[470.4819548872181,1759.8887218045113],[469.2323308270677,1687.3887218045113]]', 'SIN PUBLICAR', 0),
(48, 4, 10, 25, 250, 1112, 'A', 23000, 'poligono', '[[1644.0485930923426,1324.3226394840763],[1644.604472838458,1407.6316540809446],[1431.1472915713102,1407.3539640775311],[1431.9811188243066,1323.4895389651563]]', 'SEPARADO', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `multimedia`
--

CREATE TABLE `multimedia` (
  `id` int(11) NOT NULL,
  `url` varchar(100) NOT NULL,
  `type` varchar(20) NOT NULL,
  `fecha` date NOT NULL,
  `proyecto_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagos`
--

CREATE TABLE `pagos` (
  `id` int(11) NOT NULL,
  `n_cuota` int(11) DEFAULT NULL,
  `monto_pago` float NOT NULL,
  `fecha_pago` varchar(20) NOT NULL,
  `tipo_pago` varchar(10) NOT NULL,
  `venta_id` int(11) NOT NULL,
  `status` varchar(20) NOT NULL,
  `fecha_pagada` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pagos`
--

INSERT INTO `pagos` (`id`, `n_cuota`, `monto_pago`, `fecha_pago`, `tipo_pago`, `venta_id`, `status`, `fecha_pagada`) VALUES
(1, 1, 1000, '2024-06-01', 'CUOTAS', 1, 'NO PAGADO', NULL),
(2, 2, 1000, '2024-07-01', 'CUOTAS', 1, 'NO PAGADO', NULL),
(3, 3, 1000, '2024-08-01', 'CUOTAS', 1, 'NO PAGADO', NULL),
(4, 4, 1000, '2024-09-01', 'CUOTAS', 1, 'NO PAGADO', NULL),
(5, 5, 1000, '2024-10-01', 'CUOTAS', 1, 'NO PAGADO', NULL),
(6, 6, 1000, '2024-11-01', 'CUOTAS', 1, 'NO PAGADO', NULL),
(7, 7, 1000, '2024-12-01', 'CUOTAS', 1, 'NO PAGADO', NULL),
(8, 8, 1000, '2025-01-01', 'CUOTAS', 1, 'NO PAGADO', NULL),
(9, 9, 1000, '2025-02-01', 'CUOTAS', 1, 'NO PAGADO', NULL),
(10, 10, 1000, '2025-03-01', 'CUOTAS', 1, 'NO PAGADO', NULL),
(11, 11, 1000, '2025-04-01', 'CUOTAS', 1, 'NO PAGADO', NULL),
(12, 1, 1000, '2024-07-30', 'CUOTAS', 2, 'PAGADO', '2024-07-15'),
(13, 2, 1000, '2024-08-30', 'CUOTAS', 2, 'PAGADO', '2024-07-15'),
(14, 3, 1000, '2024-09-30', 'CUOTAS', 2, 'PAGADO', '2024-07-15'),
(15, 4, 1000, '2024-10-30', 'CUOTAS', 2, 'PAGADO', '2024-07-15'),
(16, 5, 1000, '2024-11-30', 'CUOTAS', 2, 'PAGADO', '2024-07-15'),
(17, 6, 1000, '2024-12-30', 'CUOTAS', 2, 'PAGADO', '2024-07-15'),
(18, 7, 1000, '2025-01-30', 'CUOTAS', 2, 'PAGADO', '2024-07-15'),
(19, 8, 1000, '2025-02-28', 'CUOTAS', 2, 'PAGADO', '2024-07-15'),
(20, 9, 1000, '2025-03-28', 'CUOTAS', 2, 'PAGADO', '2024-07-15'),
(21, 10, 1000, '2025-04-28', 'CUOTAS', 2, 'PAGADO', '2024-07-15'),
(22, 1, 1000, '2024-07-31', 'CUOTAS', 3, 'PAGADO', '2024-07-15'),
(23, 2, 1000, '2024-08-31', 'CUOTAS', 3, 'PAGADO', '2024-07-15'),
(24, 3, 1000, '2024-09-30', 'CUOTAS', 3, 'PAGADO', '2024-07-15'),
(25, 4, 1000, '2024-10-30', 'CUOTAS', 3, 'PAGADO', '2024-07-15'),
(26, 5, 1000, '2024-11-30', 'CUOTAS', 3, 'PAGADO', '2024-07-15'),
(27, 6, 1000, '2024-12-30', 'CUOTAS', 3, 'NO PAGADO', NULL),
(28, 7, 1000, '2025-01-30', 'CUOTAS', 3, 'NO PAGADO', NULL),
(29, 8, 1000, '2025-02-28', 'CUOTAS', 3, 'PAGADO', '2024-07-15'),
(30, 9, 1000, '2025-03-28', 'CUOTAS', 3, 'NO PAGADO', NULL),
(31, 10, 1000, '2025-04-28', 'CUOTAS', 3, 'NO PAGADO', NULL),
(32, 1, 1000, '2024-08-01', 'CUOTAS', 4, 'PAGADO', '2024-07-15'),
(33, 2, 1000, '2024-09-01', 'CUOTAS', 4, 'PAGADO', '2024-07-15'),
(34, 3, 1000, '2024-10-01', 'CUOTAS', 4, 'PAGADO', '2024-07-15'),
(35, 4, 1000, '2024-11-01', 'CUOTAS', 4, 'NO PAGADO', NULL),
(36, 5, 1000, '2024-12-01', 'CUOTAS', 4, 'NO PAGADO', NULL),
(37, 6, 1000, '2025-01-01', 'CUOTAS', 4, 'NO PAGADO', NULL),
(38, 7, 1000, '2025-02-01', 'CUOTAS', 4, 'NO PAGADO', NULL),
(39, 8, 1000, '2025-03-01', 'CUOTAS', 4, 'NO PAGADO', NULL),
(40, 9, 1000, '2025-04-01', 'CUOTAS', 4, 'NO PAGADO', NULL),
(41, 10, 1000, '2025-05-01', 'CUOTAS', 4, 'NO PAGADO', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permisos`
--

CREATE TABLE `permisos` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_servicio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `permisos`
--

INSERT INTO `permisos` (`id`, `id_usuario`, `id_servicio`) VALUES
(1, 21, 1),
(2, 21, 2),
(3, 21, 3),
(4, 21, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyectos`
--

CREATE TABLE `proyectos` (
  `id` int(11) NOT NULL,
  `nombreProyecto` varchar(250) NOT NULL,
  `description` varchar(600) NOT NULL,
  `logo` varchar(200) NOT NULL,
  `imgUrl` varchar(250) NOT NULL,
  `video_url` varchar(500) NOT NULL,
  `cantLotes` int(11) NOT NULL,
  `proyectStatus` varchar(20) NOT NULL,
  `fecha_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `createdBy` int(11) NOT NULL,
  `empresa_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `proyectos`
--

INSERT INTO `proyectos` (`id`, `nombreProyecto`, `description`, `logo`, `imgUrl`, `video_url`, `cantLotes`, `proyectStatus`, `fecha_created`, `fecha_update`, `createdBy`, `empresa_id`) VALUES
(4, 'pruebalotees', 'Proyecto prueba lotes es un proyecto inmobiliario, que se encuentra ubicado en el mismo centro de la ciudad ed Tacna, que genera valor agregado a inversionistas a gran esacala 100%', 'imagenes/logos/6569418d07519-backmonkey.png', 'imagenes/proyectos/pruebalotees/plano.jpeg', 'https://youtu.be/CYR5rZmNXIU', 100, 'CREADA', '2023-06-08 23:39:50', '2024-04-23 15:06:46', 1, 1),
(5, 'proyecto buenos aires', 'las cosas cambian un poco', 'imagenes/logos/655e1ed1e2b85-monoardilla.png', 'imagenes/proyectos/proyecto buenos aires/pruebavaron.jpg', 'https://youtu.be/JRhP2M2YodM', 200, 'CREADA', '2023-06-12 22:05:36', '2024-04-23 15:06:46', 1, 1),
(6, 'Prueba jampier', 'las cosas aqui cambian tambien 2.0', 'imagenes/logos/65305d3cd1af6-Jampier Vasquez_popcode_1693873299425.png', 'imagenes/proyectos/Prueba jampier/plano-sullana.jpg', 'https://www.youtube.com/watch?v=yE_jKaIQU3o&ab_channel=SharkTankM%C3%A9xico', 400, 'CREADA', '2023-07-25 00:38:10', '2024-04-23 15:06:46', 1, 1),
(7, 'Proyecto Quicky', '', '', 'imagenes/proyectos/Proyecto Quicky/proyecto prueba.jpg', '', 250, 'CREADA', '2023-08-01 19:46:32', '2024-04-23 15:06:46', 1, 1),
(8, 'PROYECTO FESTIVAL', '', 'imagenes/proyectos/662ada9a9c2e2-Captura de pantalla 2023-09-24 135941.png', '', '', 250, '', '2024-04-25 22:35:06', '2024-04-25 22:35:06', 0, 2),
(9, 'PROYECTO FESTIVAL 2', '', 'imagenes/proyectos/662adc5ab3c86-Captura de pantalla 2023-10-10 100027.png', '', '', 300, '', '2024-04-25 22:42:34', '2024-04-25 22:42:34', 0, 2),
(10, 'PROYECTO VIVELA', '', 'imagenes/logos/662bb20b22fb5-fondo.jpg', 'imagenes/proyectos/662bb20b25cd9-Captura de pantalla 2023-09-19 115436.png', '', 300, '', '2024-04-26 13:54:19', '2024-04-26 13:54:19', 0, 2),
(11, 'PROYECTO NATURA', '', 'imagenes/logos/662bbe8e9f3fa-1.png', 'imagenes/proyectos/662bbe8ea1b2d-ads natura.png', '', 500, '', '2024-04-26 14:47:42', '2024-04-26 14:47:42', 0, 1),
(12, 'PROYECTO VIVELA', '', 'imagenes/logos/6632d097ea27e-ads natura.png', 'imagenes/proyectos/6632d097ebf63-modelo hombre perfume.webp', '', 205, '', '2024-05-01 23:30:31', '2024-05-01 23:30:31', 0, 4),
(13, 'PROUECTO VIVELA 2', '', 'imagenes/logos/6632d0e4b2ddc-dulce vanidad.jpg', 'imagenes/proyectos/6632d0e4b5b52-ilia-natura.png', '', 206, '', '2024-05-01 23:31:48', '2024-05-01 23:31:48', 0, 4),
(14, 'LOS 3 CHANCHITOS', '', 'imagenes/logos/6643dac81dd2c-l.jpeg', 'imagenes/proyectos/6643dac82288c-portada alex.jpeg', '', 200, 'CREADA', '2024-05-14 21:42:32', '2024-05-14 22:00:38', 0, 5),
(15, 'LA CASITA DEL PAN', '', 'imagenes/logos/6643daf42d9af-b.jpeg', 'imagenes/proyectos/6643daf430387-cine descarga.jpeg', '', 400, 'CREADA', '2024-05-14 21:43:16', '2024-05-14 22:00:33', 0, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyecto_sede`
--

CREATE TABLE `proyecto_sede` (
  `id` int(11) NOT NULL,
  `proyecto_id` int(11) NOT NULL,
  `sede_id` int(11) NOT NULL,
  `fecha_asigned` varchar(20) NOT NULL,
  `created_by` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `proyecto_sede`
--

INSERT INTO `proyecto_sede` (`id`, `proyecto_id`, `sede_id`, `fecha_asigned`, `created_by`) VALUES
(1, 4, 1, '2024-04-29 19:02:41', 1),
(2, 5, 1, '2024-04-29 19:04:12', 1),
(3, 12, 6, '2024-05-01 18:33:30', 1),
(4, 12, 7, '2024-05-01 18:34:40', 1),
(5, 13, 6, '2024-05-01 18:42:55', 1),
(6, 8, 3, '2024-05-07 01:18:20', 1),
(8, 9, 3, '2024-05-07 01:22:27', 1),
(9, 10, 3, '2024-05-07 01:23:11', 1),
(10, 4, 2, '2024-05-07 01:23:28', 1),
(11, 6, 1, '2024-05-07 10:02:04', 1),
(12, 7, 1, '2024-05-07 10:02:06', 1),
(13, 14, 8, '2024-05-14 16:48:54', 1),
(14, 15, 9, '2024-05-14 16:50:28', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro_contact`
--

CREATE TABLE `registro_contact` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `cliente_id` int(11) NOT NULL,
  `observacion` varchar(200) NOT NULL,
  `status` varchar(100) NOT NULL,
  `fecha_register` varchar(20) NOT NULL,
  `hora_register` varchar(20) NOT NULL,
  `etiqueta` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `registro_contact`
--

INSERT INTO `registro_contact` (`id`, `user_id`, `cliente_id`, `observacion`, `status`, `fecha_register`, `hora_register`, `etiqueta`) VALUES
(1, 30, 1, 'Cliente contactado', 'CONTACTADO', '21/05/2024', '14:26:52', ''),
(2, 28, 22, 'Cliente contactado', 'CONTACTADO', '22/05/2024', '11:35:16', ''),
(3, 28, 22, 'venta de un lote del proyecto 1', 'VENTA', '22/05/2024', '11:35:55', ''),
(4, 30, 1, 'Aqui agregar el tema de visita', 'VISITA', '28/05/2024', '16:51:37', ''),
(5, 30, 1, '', 'ASISTIO', '28/05/2024', '16:51:43', ''),
(6, 30, 41, 'Cliente contactado', 'CONTACTADO', '30/05/2024', '22:03:55', ''),
(7, 30, 41, 'EL CLIENTE IRA CON SU ESPOSA', 'VISITA', '30/05/2024', '22:05:55', ''),
(8, 30, 41, '', 'ASISTIO', '30/05/2024', '22:09:30', ''),
(9, 21, 0, 'Cliente contactado', 'CONTACTADO', '03/06/2024', '11:09:24', ''),
(10, 21, 3, 'Cliente contactado', 'CONTACTADO', '03/06/2024', '11:10:50', ''),
(11, 21, 4, 'Cliente contactado', 'CONTACTADO', '03/06/2024', '11:13:59', ''),
(12, 21, 3, 'llamar 30 min antes', 'VISITA', '03/06/2024', '11:22:12', ''),
(13, 21, 5, 'Cliente contactado', 'CONTACTADO', '03/06/2024', '11:32:49', ''),
(14, 21, 6, 'Cliente contactado', 'CONTACTADO', '03/06/2024', '11:33:07', ''),
(15, 21, 7, 'Cliente contactado', 'CONTACTADO', '03/06/2024', '11:34:27', ''),
(16, 21, 8, 'Cliente contactado', 'CONTACTADO', '03/06/2024', '11:56:29', ''),
(17, 21, 4, '', 'NO RESPONDIO', '05/06/2024', '12:03:17', ''),
(18, 21, 4, 'llamar unos 10 min antes', 'REPROGRAMACION CONTACTO', '05/06/2024', '12:04:25', ''),
(19, 21, 5, 'cliente sijo que no tiene plata ahora', 'NO INTERESADO', '05/06/2024', '12:05:57', ''),
(20, 21, 6, 'El cliente quiere que le llame con los datos de la empresa', 'REPROGRAMACION CONTACTO', '05/06/2024', '12:24:12', ''),
(21, 21, 9, 'Cliente contactado', 'CONTACTADO', '05/06/2024', '12:28:39', ''),
(22, 21, 10, 'Cliente contactado', 'CONTACTADO', '05/06/2024', '17:11:03', ''),
(23, 21, 11, 'Cliente contactado', 'CONTACTADO', '05/06/2024', '17:11:12', ''),
(24, 30, 12, 'Cliente contactado', 'CONTACTADO', '05/06/2024', '17:20:30', ''),
(25, 30, 12, 'llamar mas tarde', 'NO RESPONDIO', '05/06/2024', '17:20:42', ''),
(26, 30, 12, 'llamar 10 min antes', 'REPROGRAMACION CONTACTO', '05/06/2024', '17:21:17', ''),
(27, 21, 14, 'Cliente contactado', 'CONTACTADO', '05/06/2024', '17:27:30', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `nombreRol` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `nombreRol`) VALUES
(1, 'superadmin'),
(2, 'admin'),
(3, 'asesor'),
(4, 'cajero'),
(5, 'colaborador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sede`
--

CREATE TABLE `sede` (
  `id` int(11) NOT NULL,
  `direccion` varchar(200) NOT NULL,
  `phone_contact` varchar(20) NOT NULL,
  `ciudad` varchar(50) DEFAULT NULL,
  `ubicacion_google` varchar(100) DEFAULT NULL,
  `empresa_id` int(11) NOT NULL,
  `name_reference` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sede`
--

INSERT INTO `sede` (`id`, `direccion`, `phone_contact`, `ciudad`, `ubicacion_google`, `empresa_id`, `name_reference`) VALUES
(1, 'AV. BUGAMBILLAS 318', '+51900266553', 'Tacna', 'https://maps.app.goo.gl/CvQwLb5B6FsNk7YG9', 1, 'OFICINA 1'),
(2, 'AV. BOLOGNESI', '+5198568959', 'Tacna', 'https://maps.app.goo.gl/CvQwLb5B6FsNk7YG9', 1, 'OFICINA 2'),
(3, 'AV. INTERNACIONAL 515', '+516985689', 'Tacna', 'https://maps.app.goo.gl/CvQwLb5B6FsNk7YG9', 2, 'SDEE1'),
(4, 'AV. ATAHUALPA', '+5196268598', 'CIUDAD NUEVA', '...', 1, 'OFICINA 3'),
(5, 'Tacna', '+5126855986', 'Tacna', 'WADAW', 1, 'OFICINA 4'),
(6, 'AV. BOLOGENSI 205', '+519589489', 'Tacna', 'AWDAWD', 4, 'OFICINA CENTRAL'),
(7, 'AV. SARUMILLA', '+5199956895', 'Tacna', 'AWDAWD', 4, 'SEDE1'),
(8, 'AV. BUGAMBILLAS', '+5195685989', 'TACNA', '...', 5, 'OFICINA CENTRAL'),
(9, 'AV. CIUDAD NUEVA', '+5168958569', 'TACNA', '...', 5, 'OFICINA CIUDAD NUEVA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios`
--

CREATE TABLE `servicios` (
  `id` int(11) NOT NULL,
  `nombre_servicio` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `servicios`
--

INSERT INTO `servicios` (`id`, `nombre_servicio`) VALUES
(1, 'Lotizador'),
(2, 'Usuarios'),
(3, 'CRM'),
(4, 'Finanzas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `social_networks`
--

CREATE TABLE `social_networks` (
  `id` int(11) NOT NULL,
  `url` varchar(300) NOT NULL,
  `username` varchar(100) NOT NULL,
  `user_id` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `placeholder` varchar(200) NOT NULL,
  `social` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `social_networks`
--

INSERT INTO `social_networks` (`id`, `url`, `username`, `user_id`, `status`, `placeholder`, `social`) VALUES
(1, 'jampierv127@gmail.com', 'Email', 30, 1, 'Ingresa tu correo electronico', 'email'),
(2, 'facebook.com', 'Facebook', 30, 1, 'Ingresa link de tu facebook', 'facebook'),
(3, 'https://api.whatsapp.com/send?phone=51900266553&text=Hola%20este%20es%20un%20proyecto', 'Whatsapp', 30, 0, 'Ingresa link de tu api whatsapp', 'whatsapp'),
(4, '', 'Tiktok', 30, 0, 'Ingresa link de tu tiktok', 'tiktok'),
(5, '', 'Instagram', 30, 0, 'Ingresa  link de tu instagram', 'instagram');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `target_user`
--

CREATE TABLE `target_user` (
  `id` int(11) NOT NULL,
  `picture_perfil` varchar(300) NOT NULL,
  `cover_photo` varchar(300) NOT NULL,
  `user_id` int(50) NOT NULL,
  `name_user` varchar(50) NOT NULL,
  `job` varchar(50) NOT NULL,
  `custom_description` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `target_user`
--

INSERT INTO `target_user` (`id`, `picture_perfil`, `cover_photo`, `user_id`, `name_user`, `job`, `custom_description`) VALUES
(1, 'imagenes/targets/668dabec5d58f-usuario1.jpeg', '', 30, 'ALEX INMOBILIARIA', 'SISTEMAS', 'SOY UN AGENTE INMOBILIARIO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `template_user`
--

CREATE TABLE `template_user` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `mensaje` varchar(2000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transacciones`
--

CREATE TABLE `transacciones` (
  `id` int(11) NOT NULL,
  `monto` float NOT NULL,
  `metodo_pago` varchar(20) NOT NULL,
  `turno_id` int(11) NOT NULL,
  `venta_id` int(11) NOT NULL,
  `fecha` varchar(20) NOT NULL,
  `motivo_operacion` varchar(50) NOT NULL,
  `numero_operacion` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `transacciones`
--

INSERT INTO `transacciones` (`id`, `monto`, `metodo_pago`, `turno_id`, `venta_id`, `fecha`, `motivo_operacion`, `numero_operacion`) VALUES
(1, 10000, 'EFECTIVO', 1, 1, '2024-05-21 23:42:11', 'PAGO_INICIAL', ''),
(2, 16000, 'TRANSFERENCIA', 2, 2, '2024-07-15 09:32:22', 'PAGO_INICIAL', '46589265'),
(4, 200, 'EFECTIVO', 2, 2, '2024-07-15', 'PAGO_PARCIAL_CUOTA', ''),
(5, 400, 'EFECTIVO', 2, 2, '2024-07-15', 'PAGO_PARCIAL_CUOTA', ''),
(6, 0, 'EFECTIVO', 2, 2, '2024-07-15', 'PAGO_TOTAL_CUOTA', ''),
(7, 1000, 'EFECTIVO', 2, 2, '2024-07-15', 'PAGO_TOTAL_CUOTA', ''),
(8, 1000, 'EFECTIVO', 2, 2, '2024-07-15', 'PAGO_TOTAL_CUOTA', ''),
(9, 1000, 'EFECTIVO', 2, 2, '2024-07-15', 'PAGO_TOTAL_CUOTA', ''),
(10, 200, 'EFECTIVO', 2, 2, '2024-07-15', 'PAGO_PARCIAL_CUOTA', ''),
(11, 200, 'EFECTIVO', 2, 2, '2024-07-15', 'PAGO_TOTAL_CUOTA', ''),
(12, 400, 'EFECTIVO', 2, 2, '2024-07-15', 'PAGO_PARCIAL_CUOTA', ''),
(13, 200, 'EFECTIVO', 2, 2, '2024-07-15', 'PAGO_PARCIAL_CUOTA', ''),
(14, 1000, 'EFECTIVO', 2, 2, '2024-07-15', 'PAGO_TOTAL_CUOTA', ''),
(15, 1000, 'EFECTIVO', 2, 2, '2024-07-15', 'PAGO_TOTAL_CUOTA', ''),
(16, 300, 'EFECTIVO', 2, 2, '2024-07-15', 'PAGO_PARCIAL_CUOTA', ''),
(17, 500, 'EFECTIVO', 2, 2, '2024-07-15', 'PAGO_PARCIAL_CUOTA', ''),
(18, 400, 'EFECTIVO', 2, 2, '2024-07-15', 'PAGO_TOTAL_CUOTA', ''),
(19, 200, 'EFECTIVO', 2, 2, '2024-07-15', 'PAGO_PARCIAL_CUOTA', ''),
(20, 200, 'EFECTIVO', 2, 2, '2024-07-15', 'PAGO_PARCIAL_CUOTA', ''),
(21, 300, 'EFECTIVO', 2, 2, '2024-07-15', 'PAGO_TOTAL_CUOTA', ''),
(22, 500, 'EFECTIVO', 2, 2, '2024-07-15', 'PAGO_TOTAL_CUOTA', ''),
(23, 15000, 'EFECTIVO', 2, 3, '2024-07-15 13:24:56', 'PAGO_INICIAL', ''),
(24, 1000, 'EFECTIVO', 2, 3, '2024-07-15', 'PAGO_TOTAL_CUOTA', ''),
(25, 1000, 'EFECTIVO', 2, 3, '2024-07-15', 'PAGO_TOTAL_CUOTA', ''),
(26, 1000, 'EFECTIVO', 2, 3, '2024-07-15', 'PAGO_TOTAL_CUOTA', ''),
(27, 500, 'TRANSFERENCIA', 2, 3, '2024-07-15', 'PAGO_PARCIAL_CUOTA', '16458798'),
(28, 500, 'EFECTIVO', 2, 3, '2024-07-15', 'PAGO_TOTAL_CUOTA', ''),
(29, 200, 'EFECTIVO', 2, 3, '2024-07-15', 'PAGO_PARCIAL_CUOTA', ''),
(30, 800, 'EFECTIVO', 2, 3, '2024-07-15', 'PAGO_TOTAL_CUOTA', ''),
(31, 200, 'EFECTIVO', 2, 3, '2024-07-15', 'PAGO_PARCIAL_CUOTA', ''),
(32, 400, 'EFECTIVO', 2, 3, '2024-07-15', 'PAGO_PARCIAL_CUOTA', ''),
(33, 200, 'EFECTIVO', 2, 3, '2024-07-15', 'PAGO_PARCIAL_CUOTA', ''),
(34, 500, 'EFECTIVO', 2, 3, '2024-07-15', 'PAGO_PARCIAL_CUOTA', ''),
(35, 300, 'EFECTIVO', 2, 3, '2024-07-15', 'PAGO_PARCIAL_CUOTA', ''),
(36, 100, 'EFECTIVO', 2, 3, '2024-07-15', 'PAGO_PARCIAL_CUOTA', ''),
(37, 600, 'EFECTIVO', 2, 3, '2024-07-15', 'PAGO_PARCIAL_CUOTA', ''),
(38, 400, 'EFECTIVO', 2, 3, '2024-07-15', 'PAGO_TOTAL_CUOTA', ''),
(39, 15000, 'EFECTIVO', 2, 4, '2024-07-15 19:09:47', 'PAGO_INICIAL', ''),
(40, 800, 'EFECTIVO', 2, 4, '2024-07-15', 'PAGO_PARCIAL_CUOTA', ''),
(41, 100, 'EFECTIVO', 2, 4, '2024-07-15', 'PAGO_PARCIAL_CUOTA', ''),
(42, 100, 'EFECTIVO', 2, 4, '2024-07-15', 'PAGO_TOTAL_CUOTA', ''),
(43, 1000, 'EFECTIVO', 2, 4, '2024-07-15', 'PAGO_TOTAL_CUOTA', ''),
(44, 300, 'EFECTIVO', 2, 4, '2024-07-15', 'PAGO_PARCIAL_CUOTA', ''),
(45, 700, 'EFECTIVO', 2, 4, '2024-07-15', 'PAGO_TOTAL_CUOTA', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `turno_caja`
--

CREATE TABLE `turno_caja` (
  `id` int(11) NOT NULL,
  `fecha_apertura` varchar(30) NOT NULL,
  `fecha_cierre` varchar(30) DEFAULT NULL,
  `monto_apertura` float NOT NULL,
  `monto_cierre` float DEFAULT NULL,
  `status` varchar(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `caja_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `turno_caja`
--

INSERT INTO `turno_caja` (`id`, `fecha_apertura`, `fecha_cierre`, `monto_apertura`, `monto_cierre`, `status`, `user_id`, `caja_id`) VALUES
(1, '2024-05-21 18:39:52', NULL, 1000, NULL, 'ABIERTO', 29, 1),
(2, '2024-07-15 09:31:16', NULL, 2000, NULL, 'ABIERTO', 32, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_business`
--

CREATE TABLE `user_business` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `business_id` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `fecha` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user_business`
--

INSERT INTO `user_business` (`id`, `user_id`, `business_id`, `created_by`, `fecha`) VALUES
(1, 21, 1, 1, '2024-05-17 15:22:28'),
(3, 28, 1, 21, '2024-05-20 17:17:32'),
(4, 29, 1, 21, '2024-05-20 17:22:52'),
(5, 30, 1, 21, '2024-05-21 09:57:34'),
(6, 31, 1, 21, '2024-05-22 10:35:50'),
(7, 32, 1, 21, '2024-07-15 09:30:54');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_cliente`
--

CREATE TABLE `user_cliente` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `cliente_id` int(11) NOT NULL,
  `fecha_asigned` varchar(20) NOT NULL,
  `hora_asigned` varchar(20) NOT NULL,
  `created_asigned` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_register` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user_cliente`
--

INSERT INTO `user_cliente` (`id`, `user_id`, `cliente_id`, `fecha_asigned`, `hora_asigned`, `created_asigned`, `update_register`) VALUES
(6, 30, 1, '2024-05-21', '11:11:01', '2024-05-21 16:11:01', '2024-05-21 16:11:01'),
(7, 28, 21, '2024-05-21', '15:10:28', '2024-05-21 20:10:28', '2024-05-21 20:10:28'),
(8, 28, 22, '2024-05-21', '15:20:55', '2024-05-21 20:20:55', '2024-05-21 20:20:55'),
(9, 28, 23, '2024-05-21', '15:20:55', '2024-05-21 20:20:55', '2024-05-21 20:20:55'),
(10, 28, 24, '2024-05-21', '15:20:55', '2024-05-21 20:20:55', '2024-05-21 20:20:55'),
(11, 28, 25, '2024-05-21', '15:20:55', '2024-05-21 20:20:55', '2024-05-21 20:20:55'),
(12, 28, 26, '2024-05-21', '15:20:55', '2024-05-21 20:20:55', '2024-05-21 20:20:55'),
(13, 28, 27, '2024-05-21', '15:20:55', '2024-05-21 20:20:55', '2024-05-21 20:20:55'),
(14, 28, 28, '2024-05-21', '15:20:55', '2024-05-21 20:20:55', '2024-05-21 20:20:55'),
(15, 28, 29, '2024-05-21', '15:20:55', '2024-05-21 20:20:55', '2024-05-21 20:20:55'),
(16, 28, 30, '2024-05-21', '15:20:55', '2024-05-21 20:20:55', '2024-05-21 20:20:55'),
(17, 28, 31, '2024-05-21', '15:20:55', '2024-05-21 20:20:55', '2024-05-21 20:20:55'),
(18, 28, 32, '2024-05-21', '15:20:55', '2024-05-21 20:20:55', '2024-05-21 20:20:55'),
(19, 28, 33, '2024-05-21', '15:20:55', '2024-05-21 20:20:55', '2024-05-21 20:20:55'),
(20, 28, 34, '2024-05-21', '15:20:55', '2024-05-21 20:20:55', '2024-05-21 20:20:55'),
(21, 28, 35, '2024-05-21', '15:20:55', '2024-05-21 20:20:55', '2024-05-21 20:20:55'),
(22, 28, 36, '2024-05-21', '15:20:55', '2024-05-21 20:20:55', '2024-05-21 20:20:55'),
(23, 28, 37, '2024-05-21', '15:20:55', '2024-05-21 20:20:55', '2024-05-21 20:20:55'),
(24, 28, 38, '2024-05-21', '15:20:55', '2024-05-21 20:20:55', '2024-05-21 20:20:55'),
(25, 28, 39, '2024-05-21', '15:20:55', '2024-05-21 20:20:55', '2024-05-21 20:20:55'),
(27, 30, 3, '2024-06-05', '11:59:54', '2024-06-05 16:59:54', '2024-06-05 16:59:54'),
(28, 30, 5, '2024-06-05', '12:07:01', '2024-06-05 17:07:01', '2024-06-05 17:07:01'),
(29, 30, 6, '2024-06-05', '17:04:29', '2024-06-05 22:04:29', '2024-06-05 22:04:29'),
(30, 30, 4, '2024-06-05', '17:08:03', '2024-06-05 22:08:03', '2024-06-05 22:08:03'),
(31, 30, 12, '2024-06-05', '17:20:23', '2024-06-05 22:20:23', '2024-06-05 22:20:23'),
(32, 30, 42, '2024-07-15', '14:18:50', '2024-07-15 19:18:50', '2024-07-15 19:18:50'),
(33, 30, 43, '2024-07-15', '14:18:50', '2024-07-15 19:18:50', '2024-07-15 19:18:50'),
(34, 30, 44, '2024-07-15', '14:20:16', '2024-07-15 19:20:16', '2024-07-15 19:20:16'),
(35, 30, 45, '2024-07-15', '14:20:17', '2024-07-15 19:20:17', '2024-07-15 19:20:17'),
(36, 30, 46, '2024-07-15', '14:21:43', '2024-07-15 19:21:43', '2024-07-15 19:21:43'),
(37, 30, 47, '2024-07-15', '14:21:44', '2024-07-15 19:21:44', '2024-07-15 19:21:44'),
(38, 30, 48, '2024-07-15', '14:23:49', '2024-07-15 19:23:49', '2024-07-15 19:23:49'),
(39, 30, 49, '2024-07-15', '14:23:49', '2024-07-15 19:23:49', '2024-07-15 19:23:49'),
(40, 30, 50, '2024-07-15', '14:24:36', '2024-07-15 19:24:36', '2024-07-15 19:24:36'),
(41, 30, 51, '2024-07-15', '14:24:36', '2024-07-15 19:24:36', '2024-07-15 19:24:36');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_proyect`
--

CREATE TABLE `user_proyect` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `proyecto_id` int(11) NOT NULL,
  `created_asigned` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_register` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user_proyect`
--

INSERT INTO `user_proyect` (`id`, `user_id`, `proyecto_id`, `created_asigned`, `update_register`) VALUES
(5, 8, 4, '2023-06-08 23:40:17', '2023-06-08 23:40:17'),
(6, 7, 4, '2023-06-09 22:01:51', '2023-06-09 22:01:51'),
(8, 6, 5, '2023-06-12 22:46:54', '2023-06-12 22:46:54'),
(9, 8, 5, '2023-06-12 22:47:07', '2023-06-12 22:47:07'),
(10, 9, 4, '2023-06-12 23:48:18', '2023-06-12 23:48:18'),
(12, 10, 4, '2023-06-20 00:15:17', '2023-06-20 00:15:17'),
(13, 10, 5, '2023-07-03 21:52:14', '2023-07-03 21:52:14'),
(14, 12, 4, '2023-07-06 21:09:37', '2023-07-06 21:09:37'),
(16, 13, 5, '2023-07-21 22:31:13', '2023-07-21 22:31:13'),
(18, 10, 6, '2023-07-25 02:52:31', '2023-07-25 02:52:31'),
(20, 12, 5, '2023-07-28 22:17:30', '2023-07-28 22:17:30'),
(21, 12, 6, '2023-07-28 22:17:30', '2023-07-28 22:17:30'),
(22, 2, 7, '2023-08-01 19:49:37', '2023-08-01 19:49:37'),
(23, 14, 7, '2023-08-01 19:49:46', '2023-08-01 19:49:46'),
(24, 15, 7, '2023-08-01 19:54:17', '2023-08-01 19:54:17'),
(28, 11, 5, '2024-02-22 20:50:02', '2024-02-22 20:50:02'),
(29, 11, 6, '2024-02-22 20:50:02', '2024-02-22 20:50:02');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_sede`
--

CREATE TABLE `user_sede` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `sede_id` int(11) NOT NULL,
  `fecha_asigned` varchar(20) NOT NULL,
  `created_by` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user_sede`
--

INSERT INTO `user_sede` (`id`, `user_id`, `sede_id`, `fecha_asigned`, `created_by`) VALUES
(1, 2, 1, '2024-05-07 10:02:32', 1),
(2, 6, 1, '2024-05-07 10:08:46', 1),
(3, 10, 1, '2024-05-07 10:30:41', 1),
(4, 17, 8, '2024-05-14 16:53:57', 1),
(5, 21, 1, '2024-05-17 15:35:44', 1),
(6, 27, 2, '2024-05-19 00:38:23', 21),
(7, 21, 2, '2024-05-20 11:36:40', 1),
(8, 28, 2, '2024-05-20 17:17:32', 21),
(9, 29, 1, '2024-05-20 17:22:52', 21),
(10, 30, 1, '2024-05-21 09:57:34', 21),
(11, 31, 1, '2024-05-22 10:35:50', 21),
(12, 32, 1, '2024-07-15 09:30:54', 21);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `dni` int(8) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `phone_number` varchar(200) NOT NULL,
  `user` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `usuarioRol` int(11) NOT NULL,
  `createdBy` int(11) NOT NULL,
  `usuarioStatus` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre`, `apellido`, `dni`, `correo`, `phone_number`, `user`, `password`, `usuarioRol`, `createdBy`, `usuarioStatus`) VALUES
(1, 'Maicol', 'Bohorquez', 42792299, 'bohorquez2999@gmail.com', '', 'maicol_admin', 'e8a754ae3d5debc54ef35bedbe4e3fbe', 1, 1, 1),
(21, 'JAMPIER SMITH', 'VASQUEZ MIJA', 74421968, 'jampierv127@gmail.com', '', 'jampieradmin_llorona', 'feaf7649bf4c0d48263e266055991a3b', 2, 1, 1),
(28, 'JAMPIER SMITH', 'VASQUEZ MIJA', 74421968, 'flor@gmail.com', '92658789', 'florasesor-of2', 'd8c5b18bcf1c3ec6fb4e4c4bdae50841', 3, 21, 1),
(29, 'FLOR ELENA', 'MIJA DELGADO', 41310308, 'flor2@gmail.com', '968594856', 'florcajero-of1', '7002b220ac57273db97fcac8e8aad122', 4, 21, 1),
(30, 'jaimito', 'sandoval', 12345678, 'jaimito@gmail.com', '968532468', 'jaimitoasesor-of1', 'cf4e32406ab744f78cb920bc85d58330', 3, 21, 1),
(31, 'colaborador1', 'apellido colaborador', 12345678, 'colaborador@gmail.com', '968435968', 'colaborador1-of1', 'd8b51d0f71c70d41e2c6aa612c26ebfe', 5, 21, 1),
(32, 'Alexis', 'Cajero', 74421968, 'alexiscajero@gmail.com', '926485986', 'cajero_local', 'e682d8c291702234080086707dc87fe8', 4, 21, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `id` int(11) NOT NULL,
  `cliente_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `fecha_venta` varchar(50) NOT NULL,
  `status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ventas`
--

INSERT INTO `ventas` (`id`, `cliente_id`, `user_id`, `fecha_venta`, `status`) VALUES
(1, 22, 28, '2024-05-22', 'VALIDADO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas_financiero`
--

CREATE TABLE `ventas_financiero` (
  `id` int(11) NOT NULL,
  `cajero_id` int(11) NOT NULL,
  `asesor_id` int(11) NOT NULL,
  `cliente_id` int(11) NOT NULL,
  `proyecto_id` int(11) NOT NULL,
  `fecha` varchar(20) NOT NULL,
  `hora` varchar(20) NOT NULL,
  `tipo_venta` varchar(20) NOT NULL,
  `total` float NOT NULL,
  `tipo_pago` int(11) DEFAULT NULL,
  `monto_inicial` float DEFAULT NULL,
  `monto_separado` float DEFAULT NULL,
  `fecha_programacion` varchar(20) DEFAULT NULL,
  `status` varchar(20) NOT NULL,
  `sede_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ventas_financiero`
--

INSERT INTO `ventas_financiero` (`id`, `cajero_id`, `asesor_id`, `cliente_id`, `proyecto_id`, `fecha`, `hora`, `tipo_venta`, `total`, `tipo_pago`, `monto_inicial`, `monto_separado`, `fecha_programacion`, `status`, `sede_id`) VALUES
(1, 29, 30, 1, 4, '2024-05-21', '23:42:11', 'VENTA', 21000, 1, 10000, 0, '', 'VENTA', 1),
(2, 32, 30, 1, 4, '2024-07-15', '09:32:22', 'VENTA', 26000, 1, 16000, 0, '', 'VENTA', 1),
(3, 32, 30, 40, 4, '2024-07-15', '13:24:56', 'VENTA', 25000, 1, 15000, 0, '', 'VENTA', 1),
(4, 32, 30, 40, 4, '2024-07-15', '19:09:47', 'VENTA', 25000, 1, 15000, 0, '', 'VENTA', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `visitas`
--

CREATE TABLE `visitas` (
  `id` int(11) NOT NULL,
  `agente_id` int(11) NOT NULL,
  `numero_visitas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `visitas`
--

INSERT INTO `visitas` (`id`, `agente_id`, `numero_visitas`) VALUES
(1, 3, 9),
(2, 4, 3),
(3, 5, 3),
(4, 0, 2),
(5, 8, 4),
(6, 9, 12),
(7, 11, 15),
(8, 15, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `visitas_agenda`
--

CREATE TABLE `visitas_agenda` (
  `id` int(11) NOT NULL,
  `cliente_id` int(11) NOT NULL,
  `interaccion_id` int(11) NOT NULL,
  `status` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `visitas_agenda`
--

INSERT INTO `visitas_agenda` (`id`, `cliente_id`, `interaccion_id`, `status`) VALUES
(1, 1, 1, 'ASISTIO'),
(2, 41, 2, 'ASISTIO');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `amenidades`
--
ALTER TABLE `amenidades`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `business`
--
ALTER TABLE `business`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `caja`
--
ALTER TABLE `caja`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id_cliente`),
  ADD KEY `createdBy` (`createdBy`),
  ADD KEY `createdBy_2` (`createdBy`);

--
-- Indices de la tabla `comisiones`
--
ALTER TABLE `comisiones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `cuotas_pago`
--
ALTER TABLE `cuotas_pago`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `detalle_venta`
--
ALTER TABLE `detalle_venta`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `etiqueta`
--
ALTER TABLE `etiqueta`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `etiqueta_cliente`
--
ALTER TABLE `etiqueta_cliente`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `gastos`
--
ALTER TABLE `gastos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `gastos_admin`
--
ALTER TABLE `gastos_admin`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ingresos`
--
ALTER TABLE `ingresos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `interaccion_cliente`
--
ALTER TABLE `interaccion_cliente`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `inversiones`
--
ALTER TABLE `inversiones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `lotes`
--
ALTER TABLE `lotes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `proyectoID` (`proyectoID`);

--
-- Indices de la tabla `multimedia`
--
ALTER TABLE `multimedia`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pagos`
--
ALTER TABLE `pagos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `permisos`
--
ALTER TABLE `permisos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `proyectos`
--
ALTER TABLE `proyectos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `proyecto_sede`
--
ALTER TABLE `proyecto_sede`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `registro_contact`
--
ALTER TABLE `registro_contact`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sede`
--
ALTER TABLE `sede`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `servicios`
--
ALTER TABLE `servicios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `social_networks`
--
ALTER TABLE `social_networks`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `target_user`
--
ALTER TABLE `target_user`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `template_user`
--
ALTER TABLE `template_user`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `transacciones`
--
ALTER TABLE `transacciones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `turno_caja`
--
ALTER TABLE `turno_caja`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user_business`
--
ALTER TABLE `user_business`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user_cliente`
--
ALTER TABLE `user_cliente`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user_proyect`
--
ALTER TABLE `user_proyect`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`,`proyecto_id`);

--
-- Indices de la tabla `user_sede`
--
ALTER TABLE `user_sede`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `usuarioRol` (`usuarioRol`),
  ADD KEY `createdBy` (`createdBy`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ventas_financiero`
--
ALTER TABLE `ventas_financiero`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `visitas`
--
ALTER TABLE `visitas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `visitas_agenda`
--
ALTER TABLE `visitas_agenda`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `amenidades`
--
ALTER TABLE `amenidades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `business`
--
ALTER TABLE `business`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `caja`
--
ALTER TABLE `caja`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT de la tabla `comisiones`
--
ALTER TABLE `comisiones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `cuotas_pago`
--
ALTER TABLE `cuotas_pago`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT de la tabla `detalle_venta`
--
ALTER TABLE `detalle_venta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `etiqueta`
--
ALTER TABLE `etiqueta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `etiqueta_cliente`
--
ALTER TABLE `etiqueta_cliente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `gastos`
--
ALTER TABLE `gastos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `gastos_admin`
--
ALTER TABLE `gastos_admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `ingresos`
--
ALTER TABLE `ingresos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `interaccion_cliente`
--
ALTER TABLE `interaccion_cliente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `inversiones`
--
ALTER TABLE `inversiones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `lotes`
--
ALTER TABLE `lotes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT de la tabla `multimedia`
--
ALTER TABLE `multimedia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pagos`
--
ALTER TABLE `pagos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT de la tabla `permisos`
--
ALTER TABLE `permisos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `proyectos`
--
ALTER TABLE `proyectos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `proyecto_sede`
--
ALTER TABLE `proyecto_sede`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `registro_contact`
--
ALTER TABLE `registro_contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `sede`
--
ALTER TABLE `sede`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `servicios`
--
ALTER TABLE `servicios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `social_networks`
--
ALTER TABLE `social_networks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `target_user`
--
ALTER TABLE `target_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `template_user`
--
ALTER TABLE `template_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `transacciones`
--
ALTER TABLE `transacciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT de la tabla `turno_caja`
--
ALTER TABLE `turno_caja`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `user_business`
--
ALTER TABLE `user_business`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `user_cliente`
--
ALTER TABLE `user_cliente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT de la tabla `user_proyect`
--
ALTER TABLE `user_proyect`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `user_sede`
--
ALTER TABLE `user_sede`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `ventas_financiero`
--
ALTER TABLE `ventas_financiero`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `visitas`
--
ALTER TABLE `visitas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `visitas_agenda`
--
ALTER TABLE `visitas_agenda`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD CONSTRAINT `cliente_ibfk_1` FOREIGN KEY (`createdBy`) REFERENCES `usuario` (`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`usuarioRol`) REFERENCES `roles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
