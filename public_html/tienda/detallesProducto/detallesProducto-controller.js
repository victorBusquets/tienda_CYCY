app.controller("DetallesProductoController", ["$location", "$scope", "$http", "$routeParams", function MainController($location, $scope, $http, $routeParams) {

        $scope.cargarProducto = function() {
            $http({
                method: "GET",
                url: 'detallesProducto/producto.php?dato=' + $routeParams.idProducto
            }).success(function(data, status, headers, config) {
                $scope.producto = data;
            }).error(function(data, status, headers, config) {
                alert("Error ");
            });
        };
        $scope.cargarProducto();

        $scope.anadirCesta = function() {
            //Creamos esta variable para asi poder llamarla desde las otras funciones
            articulos = $scope.producto;
            longitud2 = (articulos.length - 1);

            //Aqui comprobamos si ela articuo ya etsa en el carrito y si esta no lo añadimos de nuevo sino que aumentamos sus unidades
            for (x = longitud2; x >= 0; x--) {
                if (comprobarProductoEnCarrito(articulos[x].idProducto) === false) {
                    div = document.createElement("div");
                    div.setAttribute("id", "art-" + articulos[x].idProducto);
                    div.setAttribute("class", "art-carrito");

                    img = document.createElement("img");
                    img.setAttribute("src", "img/productos/" + articulos[x].nombreCategoria + "/" + articulos[x].imagen + "");
                    img.setAttribute("alt", articulos[x].nombreProducto);

                    //Esto es para el parrafo de nombre producto
                    text = document.createTextNode(articulos[x].nombreProducto);
                    nombreProducto = document.createElement("p");
                    nombreProducto.appendChild(text);

                    //Esto es para el parrafo de precio unidad
                    text = document.createTextNode(articulos[x].precioUnidad);
                    precioUnidad = document.createElement("p");
                    precioUnidad.appendChild(text);
                    text = document.createTextNode("€ unidad");
                    span = document.createElement("span");
                    span.appendChild(text);
                    precioUnidad.appendChild(span);

                    //Esto es para el div de unidades y sus botones
                    unidades = document.createElement("div");
                    unidades.setAttribute("class", "unidades");

                    botonmenos = document.createElement("div");
                    botonmenos.setAttribute("class", "boton");
                    botonmenos.setAttribute("onclick", "restarUnidad(" + articulos[x].idProducto + ")");
                    botonmenos.appendChild(document.createTextNode("-"));
                    unid = document.createElement("div");
                    span = document.createElement("span");

                    //Esto esta hecho para que saque correctamente los datos desde php
                    if (articulos[x].unidades === undefined) {
                        span.appendChild(document.createTextNode(1));
                    } else {
                        span.appendChild(document.createTextNode(articulos[x].unidades));
                    }

                    unid.appendChild(span);
                    botonmas = document.createElement("div");
                    botonmas.setAttribute("class", "boton");
                    botonmas.setAttribute("onclick", "sumarUnidad(" + articulos[x].idProducto + ")");
                    botonmas.appendChild(document.createTextNode("+"));

                    unidades.appendChild(botonmenos);
                    unidades.appendChild(unid);
                    unidades.appendChild(botonmas);

                    //Esto es para el precio final
                    precioTotal = document.createElement("p");

                    //Esto es para cargar correctamente los datos desde php
                    if (articulos[x].unidades === undefined) {
                        text = document.createTextNode(articulos[x].precioUnidad);
                    } else {
                        cantidad = parseFloat(articulos[x].precioUnidad * articulos[x].unidades).toFixed(2);
                        text = document.createTextNode(cantidad);
                    }

                    precioTotal.appendChild(text);
                    text = document.createTextNode("€");
                    span = document.createElement("span");
                    span.appendChild(text);
                    precioTotal.appendChild(span);

                    //Creamos un boton que nos permita eliminar el producto tenga las unidades que tenga
                    botonEliminar = document.createElement("div");
                    botonEliminar.setAttribute("class", "boton-eliminar");
                    botonEliminar.setAttribute("onclick", "borrarArticulo(" + articulos[x].idProducto + ")");
                    txt = document.createTextNode("X");
                    botonEliminar.appendChild(txt);


                    //Creamos un div oculto que almacene las unidades en stock
                    stock = document.createElement("div");
                    stock.setAttribute("class", articulos[x].stock);


                    //Añadimos los elementos
                    div.appendChild(img);
                    div.appendChild(botonEliminar);
                    div.appendChild(nombreProducto);
                    div.appendChild(precioUnidad);
                    div.appendChild(unidades);
                    div.appendChild(precioTotal);
                    div.appendChild(stock);

                    primerElemento = document.getElementById("contenido-carrito").firstChild;
                    document.getElementById("contenido-carrito").insertBefore(div, primerElemento);

                    //Esto es para cargar correctamente los datos desde php
                    if (articulos[x].unidades === undefined) {
                        calcularPrecioFinal("suma", articulos[x].precioUnidad, 0);
                    } else {
                        cantidad = parseFloat(articulos[x].precioUnidad * articulos[x].unidades).toFixed(2);
                        calcularPrecioFinal("suma", cantidad, x);
                    }
                }
            }
        };
    }]);