app.controller("ArticulosController", ["$location", "$scope", "$http", function ArticulosController($location, $scope, $http) {

        $scope.mostrarArticulos = function() {
            $("#list").jqGrid({
                url: "articulos/php/articulos.php",
                mtype: "GET",
                datatype: "json",
                colModel: [
                    {label: 'ID Producto', name: 'idProducto', key: true, align: 'center'},
                    {label: 'Nombre', name: 'nombreProducto'},
                    {label: 'Precio', name: 'precioUnidad', width: 70, align: 'center'},
                    {label: 'Descripcion', name: 'descripcion'},
                    {label: 'Imagen', name: 'imagen'},
                    {label: 'Categoria', name: 'categoria', width: 75, align: 'center'},
                    {label: 'Stock', name: 'stock', width: 60, align: 'center'}
                ],
                viewrecords: true,
                rowNum: 10,
                rowList: [10, 20, 30],
                height: 250,
                pager: "#pager"
            });
            $('#list').jqGrid('navGrid', '#pager', {search: false, edit: false, add: false, del: false});
        };

        $scope.mostrarArticulos();

        $scope.funcionBotones = function() {

            $('#nuevo').click(function() {
                $('.dato').val("");
                $('select').val("");
                
                
                $('#dialog-form').dialog({
                    title: "Nuevo Artículo",
                    resizable: true,
                    width: 500,
                    modal: true,
                    buttons: {
                        "Insertar": function() {
                            var imagen = $("#imagen:file").val();
                            imagen = imagen.split('\\');
                            imagen = imagen[imagen.length - 1];

                            $.ajax({
                                type: "POST",
                                url: "articulos/php/insertar.php",
                                data: 'nombreProducto=' + $('#nombre').val() + '&descripcion=' + $('#descripcion').val()
                                        + '&precioUnidad=' + $('#precio').val() + '&imagen=' + imagen + '&categoria=' + $('#categoria').val()
                                        + '&stock=' + $('#stock').val(),
                                success: function(dato) {
                                    $('#list').trigger('reloadGrid');
                                    $('#dialog-form').dialog("close");
                                }
                            });

                        },
                        "Cancelar": function() {
                            $('.dato').val("");
                            $('select').val("");
                            $(this).dialog("close");
                        }
                    }
                });
            });
            $('#borrar').click(function() {
                var id = $("#list").jqGrid('getGridParam', 'selrow');
                var datos = $("#list").jqGrid('getRowData', id);

                if(!datos.idProducto){
                    $('#content-dialog').text('Seleccione el Artículo que desea Borrar');
                    $('#confirm-dialog').dialog({
                        title: "Borrar Artículo",
                        resizable: false,
                         width: 500,
                        modal: true,
                        buttons: {
                            "Aceptar": function(){
                                $(this).dialog("close");
                            }
                        }
                    });
                }else{
                $('#content-dialog').text('¿Esta seguro que desea borrar el artículo: ' + datos.nombreProducto + '?');
                $('#confirm-dialog').dialog({
                    title: "Borrar Artículo",
                    resizable: false,
                    width: 500,
                    modal: true,
                    buttons: {
                        "Eliminar": function() {
                            $.ajax({
                                method: "POST",
                                url: "articulos/php/borrar.php",
                                data: 'idProducto=' + datos.idProducto,
                                success: function(dato) {
                                    $('#list').trigger('reloadGrid');
                                    $('#confirm-dialog').dialog("close");
                                }
                            });
                        },
                        "Cancelar": function() {
                            $(this).dialog("close");
                        }
                    }
                });
                }
                
            });
            $('#modificar').click(function() {
                var id = $("#list").jqGrid('getGridParam', 'selrow');
                var datos = $("#list").jqGrid('getRowData', id);

                if (!datos.idProducto) {
                    $('#content-dialog').text('Seleccione el Artículo que desea Modificar.');
                    $('#confirm-dialog').dialog({
                        title: "Modificar Artículo",
                        resizable: false,
                        width: 500,
                        modal: true,
                        buttons: {
                            "Aceptar": function(){
                                $(this).dialog("close");
                            }
                        }
                    });
                } else {
                    $('#nombre').val(datos.nombreProducto);
                    $("#precio").val(datos.precioUnidad);
                    $("#descripcion").val(datos.descripcion);
                    $("#categoria").val(datos.categoria);
                    $("#stock").val(datos.stock);

                    $('#dialog-form').dialog({
                        title: "Modificar Artículo",
                        resizable: true,
                        width: 500,
                        modal: true,
                        buttons: {
                            "Modificar": function() {
                                var imagen = $("#imagen:file").val();
                                imagen = imagen.split('\\');
                                imagen = imagen[imagen.length - 1];

                                if (imagen != "") {
                                    $.ajax({
                                        method: "POST",
                                        url: "articulos/php/modificar.php",
                                        data: 'idProducto=' + datos.idProducto + '&nombreProducto=' + $('#nombre').val() + '&descripcion=' + $('#descripcion').val()
                                                + '&precioUnidad=' + $('#precio').val() + '&imagen=' + imagen + '&categoria=' + $('#categoria').val()
                                                + '&stock=' + $('#stock').val(),
                                        success: function() {
                                            $('#list').trigger('reloadGrid');
                                            $('#dialog-form').dialog("close");
                                        }
                                    });
                                } else {
                                    $.ajax({
                                        method: "POST",
                                        url: "articulos/php/modificar.php",
                                        data: 'idProducto=' + datos.idProducto + '&nombreProducto=' + $('#nombre').val() + '&descripcion=' + $('#descripcion').val()
                                                + '&precioUnidad=' + $('#precio').val() + '&imagen=' + null + '&categoria=' + $('#categoria').val()
                                                + '&stock=' + $('#stock').val(),
                                        success: function() {
                                            $('#list').trigger('reloadGrid');
                                            $('#dialog-form').dialog("close");
                                        }
                                    });
                                }
                            },
                            "Cancelar": function() {
                                $('.dato').val("");
                                $('select').val("");
                                $(this).dialog("close");
                            }
                        }
                    });
                }
            });
        };
        $scope.funcionBotones();
    }]);