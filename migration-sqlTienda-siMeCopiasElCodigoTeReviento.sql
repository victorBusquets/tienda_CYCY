CREATE DATABASE `tienda`;tienda
USE `tienda`;
CREATE TABLE IF NOT EXISTS `administrador` (
  `idAdministrador` int(11) NOT NULL AUTO_INCREMENT,
  `correo` varchar(35) DEFAULT NULL,
  `contrasenya` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`idAdministrador`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

INSERT INTO `administrador` (`idAdministrador`, `correo`, `contrasenya`) VALUES
(1, 'juanpe@gmail.com', 'juanpe'),
(2, 'victor@gmail.com', 'victor');

CREATE TABLE IF NOT EXISTS `categoria` (
  `idCategoria` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nombreCategoria` varchar(35) NOT NULL,
  `descripcion` text,
  `imagen` varchar(100) DEFAULT 'ninguna.png',
  PRIMARY KEY (`idCategoria`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

INSERT INTO `categoria` (`idCategoria`, `nombreCategoria`, `descripcion`, `imagen`) VALUES
(1, 'Accesorios', 'Accesorios de todo tipo', 'accesorios.jpg'),
(2, 'Disfraces', 'Todos los disfraces de tus personajes favoritos(dracula,criso,zombie...)', 'disfraces.jpg'),
(3, 'Articulos Broma', 'Jajaja todo risas', 'articulosBroma.jpg'),
(4, 'Halloween', 'Preparate para dar un susto de muerte', 'hpojs.jpg'),
(5, 'Maquillaje', 'Un colorete aquí... unos labios góticos por alla....', 'maquillaje.jpg'),
(6, 'Aerosoles', 'Un matiz para tu pelo, nieve artificial, serpentina...', 'aerosoles.jpg');

CREATE TABLE IF NOT EXISTS `cliente` (
  `idCliente` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(30) NOT NULL,
  `contrasenya` varchar(50) NOT NULL,
  `nombre` varchar(35) NOT NULL,
  `apellido` varchar(60) NOT NULL,
  `dni` varchar(10) NOT NULL,
  `telefono` int(13) DEFAULT NULL,
  PRIMARY KEY (`idCliente`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `dni` (`dni`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

INSERT INTO `cliente` (`idCliente`, `email`, `contrasenya`, `nombre`, `apellido`, `dni`, `telefono`) VALUES
(1, 'juan_luis@hotmail.com', 'juanlupass', 'Juan Luis', 'Ruiz Perez', '12345677C', 666666660),
(2, 'manoleitor@hotmail.es', 'manoleitor', 'Manolo', 'Elmas Menos', '51748269R', 678231122),
(3, 'victor.busquets@gmail.com', 'p', 'Victor', 'Busquets Boro', '65465466J', 672834565),
(4, 'juama31@gmail.com', 'juanpass', 'Juan Pedro', 'Martinez Celada', '09876521L', 689987653);

CREATE TABLE IF NOT EXISTS `detallepedido` (
  `idDetallePedido` int(11) NOT NULL AUTO_INCREMENT,
  `numPedido` int(11) NOT NULL,
  `producto` int(11) NOT NULL,
  `precioUnidad` decimal(10,2) NOT NULL,
  `unidades` int(11) NOT NULL,
  PRIMARY KEY (`idDetallePedido`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=56 ;

INSERT INTO `detallepedido` (`idDetallePedido`, `numPedido`, `producto`, `precioUnidad`, `unidades`) VALUES
(1, 1, 1, '12.00', 5),
(2, 1, 11, '2.50', 1),
(3, 2, 3, '10.00', 2),
(4, 2, 20, '7.95', 1),
(5, 2, 19, '14.95', 1),
(6, 2, 1, '12.00', 2),
(7, 3, 31, '2.00', 4),
(8, 3, 33, '3.50', 2),
(9, 3, 34, '3.50', 1),
(10, 3, 38, '4.00', 2),
(11, 4, 1, '12.00', 2),
(25, 5, 25, '7.00', 3),
(26, 5, 14, '14.95', 4),
(27, 5, 3, '10.00', 2),
(28, 6, 44, '1.25', 5),
(29, 6, 25, '7.00', 3),
(30, 6, 14, '14.95', 4),
(31, 6, 3, '10.00', 2),
(32, 7, 3, '10.00', 1),
(33, 8, 8, '5.00', 6),
(34, 9, 40, '2.50', 4),
(35, 9, 11, '2.50', 3),
(36, 11, 40, '2.50', 4),
(37, 11, 11, '2.50', 3),
(38, 12, 11, '2.50', 3),
(39, 12, 40, '2.50', 4),
(40, 12, 40, '2.50', 4),
(41, 13, 11, '2.50', 3),
(42, 13, 5, '21.00', 1),
(43, 15, 4, '19.99', 1),
(44, 15, 4, '19.99', 1),
(45, 17, 4, '19.99', 1),
(46, 17, 4, '19.99', 1),
(47, 18, 32, '3.50', 2),
(48, 18, 8, '5.00', 5),
(49, 19, 17, '14.95', 4),
(50, 20, 11, '2.50', 3),
(51, 20, 40, '2.50', 4),
(52, 20, 40, '2.50', 4),
(53, 21, 11, '2.50', 3),
(54, 22, 11, '2.50', 3),
(55, 22, 40, '2.50', 4);

CREATE TABLE IF NOT EXISTS `pedido` (
  `idPedido` int(11) NOT NULL AUTO_INCREMENT,
  `fechaPedido` date NOT NULL,
  `cliente` int(11) NOT NULL,
  `precioTotal` decimal(10,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`idPedido`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=22 ;

INSERT INTO `pedido` (`idPedido`, `fechaPedido`, `cliente`, `precioTotal`) VALUES
(1, '2014-05-21', 1, '62.50'),
(2, '2014-11-20', 1, '66.90'),
(3, '2015-01-11', 2, '26.50'),
(4, '2009-01-16', 2, '24.00'),
(5, '2015-01-28', 3, '100.80'),
(6, '2015-01-28', 3, '107.05'),
(7, '2015-01-29', 3, '10.00'),
(8, '2015-01-29', 3, '30.00'),
(9, '2015-01-29', 2, '17.50'),
(10, '2015-01-29', 2, '17.50'),
(11, '2015-01-29', 2, '17.50'),
(12, '2015-01-29', 2, '17.50'),
(13, '2015-01-29', 2, '21.00'),
(14, '2015-01-29', 2, '19.99'),
(15, '2015-01-29', 2, '19.99'),
(16, '2015-01-29', 2, '19.99'),
(17, '2015-01-29', 2, '19.99'),
(18, '2015-01-29', 2, '91.80'),
(19, '2015-01-29', 2, '17.50'),
(20, '2015-01-29', 2, '17.50'),
(21, '2015-01-29', 2, '17.50');

CREATE TABLE IF NOT EXISTS `producto` (
  `idProducto` int(11) NOT NULL AUTO_INCREMENT,
  `nombreProducto` varchar(35) NOT NULL,
  `descripcion` text NOT NULL,
  `precioUnidad` decimal(10,2) NOT NULL DEFAULT '0.00',
  `imagen` varchar(100) DEFAULT '../ninguna.png',
  `categoria` int(11) unsigned NOT NULL,
  `stock` int(11) DEFAULT '0',
  PRIMARY KEY (`idProducto`),
  KEY `FK_producto_categoria` (`categoria`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=55 ;

INSERT INTO `producto` (`idProducto`, `nombreProducto`, `descripcion`, `precioUnidad`, `imagen`, `categoria`, `stock`) VALUES
(1, 'Casco vikingo', 'Perfecto para su disfraz de vikingo', '2.00', 'casco_vikingo.jpg', 1, 3),
(2, 'Base blanca', 'Base blanca sobre la que maquillarse', '10.00', 'base_blanca.jpg', 5, 5),
(3, 'Disfraz de pokemon', 'Gorra, camisa de pokemon y todos los accesorios', '10.00', 'disfraz_pokemon.jpg', 2, 2),
(4, 'Disfraz de zombie', 'Disfrute de un clasico como es el disfraz de dracula.', '19.99', 'zombie.jpg', 2, 3),
(5, 'Disfraz princesa', 'Vistete como tu princesa favorita', '21.00', 'princesa.jpg', 2, 0),
(6, 'Caca falsa', 'Diviertase con esta broma', '6.00', 'caca.jpg', 3, 0),
(7, 'Colorete', 'Pintate como tu personaje favorito', '6.50', 'colorete.jpg', 5, 0),
(8, 'Flor payaso', 'Diviertete con esta broma clasica', '5.00', 'flor-payaso-agua.jpg', 3, 21),
(9, 'Gafas bigote', 'Consigue un nuevo look', '7.50', 'gafas_bigote.jpg', 1, 2),
(10, 'Guadanya', 'Accesorio perfecto para tu disfraz de guerrero', '9.00', 'guadanya.jpg', 1, 3),
(11, 'Nieve en aerosol', 'Dale un toque de nieve a todo lo que desees', '2.50', 'nieve_aerosol.jpg', 6, -9),
(12, 'Peluca azul', 'Cansado de un pelo normal, prueba esta peluca', '4.75', 'peluca_azul.png', 1, 3),
(14, 'Disfraz caperucita roja', 'Disfrazate de caperucita roja y... cuidado con el lobo', '14.95', 'caperucita_roja.jpg', 2, 10),
(15, 'Disfraz disco woman', 'Con este disfraz preparate para la fiesta', '14.95', 'disco_woman.jpg', 2, 10),
(16, 'Disfraz duffman', 'Disfrazate de este personaje de los simpsons', '14.95', 'duff_man.jpg', 2, 0),
(17, 'Disfraz hora de aventuras', '¿Te gusta hora de aventuras? Compra el disfraz de tus personajes favoritos', '14.95', 'adventure_time.jpg', 2, 6),
(18, 'Disfraz mickey mouse', 'Disfrazate de mickey mouse', '14.95', 'mickey_mouse.jpg', 2, 10),
(19, 'Disfraz dragon(bebe)', 'Disfraza a tu hijo con este disfraz de dragon', '14.95', 'nino_dragon.jpg', 2, 10),
(20, 'Calavera decoracion', 'Decora tu casa para este hallowen con esta calavera, perfecta para ti', '7.95', 'calavera_decoracion.jpg', 4, 0),
(21, 'Pendientes arana', 'Complemente su disfraz con estos pendientes fosforitos en forma de arana', '2.00', 'pendientes_arana.jpg', 4, 2),
(22, 'Nariz de bruja', 'Complemento perfecto para su disfraz de bruja', '1.00', 'nariz_bruja.jpg', 4, 3),
(23, 'Ceras para la cara', 'Pintese como guste para ocasiones especiales.. halloween, carnavales...', '4.00', 'ceras_manley.jpg', 5, 9),
(24, 'Sombrero mexicano', 'Pongaselo y .. andale a comer tacos guey', '3.00', 'sombrero_andale.jpg', 1, 12),
(25, 'Sombrero Fu-Man-Chu', 'Con coleta y todo!!!', '7.00', 'gorro_chino_con_coleta.jpg', 1, 21),
(26, 'Petardo para cigarros', 'Pum y adios! El fumar se va a acabar', '3.00', 'petardo_cigarro.jpg', 3, 13),
(27, 'Cigarro pistola de agua', 'Choff!! y... ¿Anda llueve?', '2.00', 'cigarro_agua.jpg', 3, 6),
(31, 'Serpentina en aerosol', 'Anima tus fiesta con esta serpentina :D', '2.00', 'serpentina_aerosol.jpg', 6, 2),
(32, 'Aerosol tinte rojo', 'Disfrute de este tono rojo, sorprenda a sus familiares y amigos con un nuevo look.Todas las demas personas le envidiaran.', '3.50', 'aerosol_rojo.jpg', 6, 0),
(33, 'Aerosol tinte azul', 'Disfrute de este tono azul, sorprenda a sus familiares y amigos con un nuevo look.Todas las demas personas le envidiaran.', '3.50', 'aerosol_azul.jpg', 6, 5),
(34, 'Aerosol tinte morado', 'Disfrute de este tono morado, sorprenda a sus familiares y amigos con un nuevo look.Todas las demas personas le envidiaran.', '3.50', 'aerosol_morado.jpg', 6, 5),
(35, 'Aerosol tinte amarillo', 'Disfrute de este tono amarillo, sorprenda a sus familiares y amigos con un nuevo look.Todas las demas personas le envidiaran.', '3.50', 'aerosol_amarillo.jpg', 6, 8),
(37, 'Set de 12 pinceles', 'Un set maravilloso para pintar (12 pinceles)', '8.00', 'set_pinceles.jpg', 5, 0),
(38, 'Sangre falsa', 'Y es de color rojo ehhhh!', '4.00', 'sangre_falsa.jpg', 5, 1),
(39, 'Latex liquido', 'Latex liquido para ti y para tu.... cicatriz', '10.00', 'latex_liquido.jpg', 5, 2),
(40, 'Cesta calabaza', 'Una bonita cesta que llenar de caramelos', '2.50', 'cestas_calabaza.jpg', 4, -22),
(41, 'Careta payaso', 'Pontela por la noche y obtendras resultados increibles', '23.00', 'careta_payaso.jpg', 4, 3),
(42, 'Careta gorila', 'Pontela y.. uhh uh ih ahh uhhhhh', '17.00', 'careta_gorila.jpg', 4, 12),
(43, 'Bombas fetidas 5unds', 'Rompelas y ufff como huele', '1.75', 'bombas_fetidas.jpg', 3, 6),
(44, 'Retira billete', 'Diviertase con o de sus amigos', '1.25', 'retira_billetes.jpg', 3, 9),
(53, 'ihhjbbj', 'hhbhjklk', '66.00', 'null', 1, 9),
(54, 'patata', 'oifajsdoifj', '12.50', '', 2, 54648);

CREATE TABLE IF NOT EXISTS `promocion` (
  `producto` int(11) NOT NULL,
  PRIMARY KEY (`producto`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `promocion` (`producto`) VALUES
(1),
(2),
(3),
(4),
(5),
(19);


ALTER TABLE `producto`
  ADD CONSTRAINT `FK_producto_categoria` FOREIGN KEY (`categoria`) REFERENCES `categoria` (`idCategoria`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `promocion`
  ADD CONSTRAINT `FK_promocion_producto` FOREIGN KEY (`producto`) REFERENCES `producto` (`idProducto`) ON DELETE CASCADE ON UPDATE CASCADE;
