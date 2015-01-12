//Script del login
var desplegado = false;
function desplegar_login() {
    if (desplegado === false) {
        document.getElementById("logbox").setAttribute("style", "display: initial");
        desplegado = true;
    } else {
        document.getElementById("logbox").setAttribute("style", "display: none");
        desplegado = false;
    }
}

//Funcion que usa el buscador
function buscar(valor) {
    //Solo mostramos resultadosa partir de que el valor buscado sea mas largo o igual que tres caracteres
    if (valor.length >= 3) {
        document.getElementById("resultadoBusqueda").setAttribute("style", "display:inherit;");
        //Cargamos los datos
        //LLamamos al php para que nos pase los datos de la BD
        $.ajax({
            dataType: 'json',
            url: 'busqueda.php?dato=' + valor,
            success: function(jsondata) {
                //Construimos los divs con los resultados
                resultado = "";
                for (i = 0; i < jsondata.length; i++) {
                    if (jsondata[i].tipo == "categoria") {
                        resultado += "<a href='#productos/"+ jsondata[i].id +",0'>";
                        resultado += "<div class='resultado'>";
                        resultado += "<img src='img/categorias/" + jsondata[i].imagen + "'/>";
                        resultado += jsondata[i].nombre + " (" + jsondata[i].tipo + ") </div></a>";
                    } else {
                        resultado +="<a href='#/detallesProducto/" + jsondata[i].id + "'>";
                        resultado += "<div class='resultado'>";
                        resultado += "<img src='img/productos/" + jsondata[i].ruta + "/" + jsondata[i].imagen + "'/>";
                        resultado += jsondata[i].nombre + " (" + jsondata[i].tipo + ") </div></a>";
                    }
                }
                ;
                //Div si no hay resultados
                if (resultado == "") {
                    resultado = "<div class='resultado'>No hay ningun resultado</div>";
                }
                //Imprimos el codigo de resultado
                $('#resultadoBusqueda').html(resultado);
            }
        });

    } else {
        document.getElementById("resultadoBusqueda").setAttribute("style", "display:none;");
    }
}

window.onload = function() {
    //Cargamos el menu
    //LLamamos al php para que nos pase los datos de la BD
    $.ajax({
        dataType: 'json',
        url: 'categorias/categorias.php',
        success: function(jsondata) {
            //Inicializamos la lista
            categorias = "";
            //Cargamos el enlace de categorias(muestra todas las categorias)
            //Falta poner los enlaces bien de momento solo sale contenido sin enlaces
            categorias += "<a href='#/categorias'><div class='cat'>Ver categorias</div></a>";
            //Cargamos los elementos de la lista
            for (i = 0; i < jsondata.length; i++) {
                categorias += "<a href='#productos/"+ jsondata[i].idCategoria +",0'><div><span>" + jsondata[i].nombreCategoria + "</span></div></a>";
            }
            ;
            //Imprimos el codigo de categorias
            $('.links').html(categorias);
        }
    });
};