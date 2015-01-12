function comprobarProductoEnCarrito(id) {
    articuloEnCarrito = false;
    if (document.getElementById("art-" + id)) {
        sumarUnidad(id);
        articuloEnCarrito = true;
    }
    return articuloEnCarrito;
}

function restarUnidad(id) {
    unidades = parseInt(document.getElementById("art-" + id).getElementsByTagName("div")[3].getElementsByTagName("span")[0].textContent);
    //Si al restar dejamos las unidades a 0, eliminamos el articulo
    if (unidades === 1) {
        borrarArticulo(id);
    } else {
        unidades--;
        document.getElementById("art-" + id).getElementsByTagName("div")[3].getElementsByTagName("span")[0].textContent = unidades;
        calcularPrecioFinalArticulo("resta", id);
    }
}

function sumarUnidad(id) {
    unidades = parseInt(document.getElementById("art-" + id).getElementsByTagName("div")[3].getElementsByTagName("span")[0].textContent);
    stock = parseInt(document.getElementById("art-" + id).getElementsByTagName("div")[5].className);

    if (comprobarStock(unidades, stock) === true) {
        alert("Parece que no hay mas stock de este producto :C");
    } else {
        unidades++;
        document.getElementById("art-" + id).getElementsByTagName("div")[3].getElementsByTagName("span")[0].textContent = unidades;
        calcularPrecioFinalArticulo("suma", id);
    }
}

function comprobarStock(unidades, stock) {
    noStock = false;
    if (stock == unidades) {
        noStock = true;
    }
    return noStock;
}

function calcularPrecioFinalArticulo(accion, id) {
    articulo = document.getElementById("art-" + id);
    unidades = parseInt(articulo.getElementsByTagName("div")[3].getElementsByTagName("span")[0].textContent);
    precioUnidad = parseFloat(articulo.getElementsByTagName("p")[1].textContent).toFixed(2);
    articulo.getElementsByTagName("p")[2].textContent = parseFloat(unidades * precioUnidad).toFixed(2) + "€";
    calcularPrecioFinal(accion, precioUnidad, 0);
}

function calcularPrecioFinal(accion, cantidad, indice) {

    precioTotal = parseFloat(document.getElementById("precio-total").getElementsByTagName("p")[0].getElementsByTagName("span")[0].textContent).toFixed(2);
    unidadesCarrito = parseInt(document.getElementById("cantidad-carrito").textContent);

    if (accion === "resta") {
        document.getElementById("precio-total").getElementsByTagName("p")[0].
                getElementsByTagName("span")[0].textContent = parseFloat(parseFloat(precioTotal) - parseFloat(cantidad)).toFixed(2);
        document.getElementById("cantidad-carrito").textContent = unidadesCarrito - 1;
    } else if (accion === "suma") {
        document.getElementById("precio-total").getElementsByTagName("p")[0].
                getElementsByTagName("span")[0].textContent = parseFloat(parseFloat(precioTotal) + parseFloat(cantidad)).toFixed(2);

        //Esto es para que al cargar datos desde php se carguen correctamente
        if (articulos[indice].unidades === undefined) {
            document.getElementById("cantidad-carrito").textContent = parseInt(unidadesCarrito + 1);
        } else {
            document.getElementById("cantidad-carrito").textContent = unidadesCarrito + parseInt(articulos[indice].unidades);
            articulos[indice].unidades = undefined;
        }


        //Comprobamos si la cantidad es uno para mostrar la imagen de carrito lleno 
        if (document.getElementById("cantidad-carrito").textContent >= "1") {
            document.getElementById("caja-logo-carrito").getElementsByTagName("img")[1].setAttribute("style", "display:auto");
        }
    }
    enviarDatosASesion();
}

function borrarArticulo(id) {
    //Restamos las unidades y el precio final del carrito
    precioUnidad = parseFloat(document.getElementById("art-" + id).getElementsByTagName("p")[1].textContent).toFixed(2);
    unidades = document.getElementById("art-" + id).getElementsByTagName("div")[3].getElementsByTagName("span")[0].textContent;
    resta = parseFloat(precioUnidad * unidades).toFixed(2);
    document.getElementById("cantidad-carrito").textContent -= unidades;
    document.getElementById("precio-total").getElementsByTagName("p")[0].getElementsByTagName("span")[0].textContent -= resta;
    //Con esto borramos el articulo
    articuloBorrar = document.getElementById("art-" + id);
    document.getElementById("contenido-carrito").removeChild(articuloBorrar);

    //Si el carrito esta vacio ocultamos la imagen de carrito lleno
    if (document.getElementById("cantidad-carrito").textContent === "0") {
        document.getElementById("caja-logo-carrito").getElementsByTagName("img")[1].setAttribute("style", "display:none");
    }
    enviarDatosASesion();
}

function sacarDatosSesion() {
    $.ajax({
        dataType: 'json',
        url: 'cargarCarrito.php',
        success: function(jsondata) {
            if (jsondata.length > 0) {
                    anadirCesta(jsondata);
                
            }
        }
    });
}

function enviarDatosASesion() {

    //Con esto metemos en un array todo el contenido de nuestro carrito para aso guardarlo en la sesion php
    contenido = document.getElementById("contenido-carrito").getElementsByTagName("div");
    numArticulos = 0;
    codigo = [];
    longitud=contenido.length;

    for (i = 0; i < longitud; i = i + 7) {
        id = contenido[i].id.split("-", 2)[1];
        ruta = contenido[i].getElementsByTagName("img")[0].src;
        categoria = ruta.split("/", 9)[7];
        imagen = ruta.split("/", 9)[8];
        nombre = contenido[i].getElementsByTagName("p")[0].textContent;
        precioUnidad = contenido[i].getElementsByTagName("p")[1].textContent.split("€", 2)[0];
        unidades = contenido[i].getElementsByTagName("div")[3].getElementsByTagName("span")[0].textContent;
        stock = contenido[i].getElementsByTagName("div")[5].className;
        codigo[numArticulos] = [idProducto = id,
            nombreCategoria = categoria,
            imagena = imagen,
            nombreProducto = nombre,
            precioUnidada = precioUnidad,
            stocka = stock,
            unidadesa = unidades];
        numArticulos++;
    }
    
    codigo = codigo.toString();
    $.ajax({
        url: 'guardarCarritoEnSesion.php?codigo=' + codigo + '&numArticulos=' + numArticulos,
        success: function(jsondata) {
            //alert("Modificado carrito " + jsondata);
        }
    });
}

function verCarrito() {
    $.ajax({
        dataType: 'json',
        url: 'cargarCarrito.php',
        success: function(jsondata) {
            codigoCarrito ="<div class='sectiontitle'><p>Articulos del carrito</p></div>";
            codigoCarrito +="<div class='det-carrito'>";
                for(m=0;jsondata.length>m;m++){
                   codigoCarrito +="<div class='art-det-carrito'>";
                   codigoCarrito +="<p>"+jsondata[m].nombreProducto+"</p>"; 
                   codigoCarrito +="<p>Precio unidad: <span>"+jsondata[m].precioUnidad+"</span>€</p>";
                   codigoCarrito +="<p>Cantidad:      <span>"+jsondata[m].unidades+"</span> unidad/es</p>";                 
                   codigoCarrito +="<p>Precio total:  <span>"+parseFloat((jsondata[m].precioUnidad)*(jsondata[m].unidades)).toFixed(2)+"</span>€</p>";
                   codigoCarrito +="</div>";
                }
            codigoCarrito +="</div>";
            
            //Imprimos el codigo de nuestro carrito
            $('#contenedor').html(codigoCarrito);
        }
    });
}