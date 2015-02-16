app.controller("DetalleCarritoController", ["$location", "$scope", "$http", "$routeParams", function MainController($location, $scope, $http, $routeParams) {

        $scope.cargarTabla = function() {
            $http({
                method: "GET",
                url: "sesionPhp/cargarCarrito.php"
            }).success(function(datos) {
                if (datos[0].nombreProducto == undefined) {
                    $scope.carrito = null;
                } else {
                    $scope.carrito = datos;
                }
                $scope.precioFinal = 0.00;
                for (i = 0; datos.length > i; i++) {
                    $scope.carrito[i].precioTotal = ($scope.carrito[i].precioUnidad * $scope.carrito[i].unidades);
                    $scope.precioFinal += $scope.carrito[i].precioTotal;
                }
            });
        };

        $scope.cargarTabla();

        $("#realizarCompra").click(function() {
            $.ajax({
                url: 'sesionPhp/verUsuario.php',
                method: 'get',
                success: function(datos) {
                    idUsuario = datos.split("//")[0];
                    if (idUsuario != -1) {
                        $scope.abrirDialog(idUsuario);
                    } else {
                        $("#mensajeLoginNecesario").text("*Es necesario loguearse para comprar");
                        desplegar_login();
                    }
                    ;
                }
            });
        });

        $scope.enviarCompra = function() {
            $.ajax({
                url: 'detalleCarrito/enviarCompraPedido.php',
                method: 'post',
                data: 'precioFinal=' + $scope.precioFinal,
                success: function() {
                    $scope.generarFactura();
                },
                error: function() {
                    alert("ERROR");
                }
            });
            for (i = 0; $scope.carrito.length > i; i++) {
                $.ajax({
                    url: 'detalleCarrito/enviarCompraDetalle.php',
                    method: 'post',
                    data: 'datos=' + JSON.stringify($scope.carrito[i]),
                    success: function() {

                    }
                });
            }
            ;
        };


        $scope.generarFactura = function() {
            window.open("./pdf_generator/pdf-pedido.php");
        };

        $scope.abrirDialog = function(idUsuario) {
            $scope.cargarGrid(idUsuario);

            $("#confirmar-compra").dialog({
                height: 300,
                width: 350,
                modal: true,
                buttons: {
                    "Cancelar": function() {
                        $("#confirmar-compra").dialog("close");
                    },
                    "Confirmar Compra": function() {
                        var id = $('#list').jqGrid('getGridParam', 'selrow');
                        var ret = $('#list').jqGrid('getRowData', id);
                        var cuenta = ret.numCuenta;
                        $.ajax({
                            url: "detalleCarrito/getCuenta.php",
                            datatype: 'json',
                            method: "get",
                            success: function(data) {
                                //var jsonEntrada = '{"cuentaOrigen":"' + cuenta + '", "cuentaDestino":"' + data.cuenta + '", "pin":' + data.pin + ', "cantidad":' + $scope.precioFinal + ', "concepto":"Crazy Cryzo Store"}';
                                var jsonEntrada = '{"cuentaOrigen":"000000000000000000000001", "cuentaDestino":"000000000000000000000002", "pin":123456, "cantidad":55.5, "concepto":"Crazy Cryzo Store"}';
                                $.ajax({
                                    url: "http://tomcat-cycycorpstore.rhcloud.com/api/Transaccion",
                                    method: 'post',
                                    data: jsonEntrada,
                                    success: function(data) {
                                        $scope.enviarCompra();
                                        $("#confirmar-compra").dialog("close");
                                    }
                                });
                            }
                        });
                    }
                }
            });
        };

        $scope.cargarGrid = function(idUsuario) {

            $("#list").jqGrid({
                url: 'detalleCarrito/cargarCuentas.php?idUsuario='+idUsuario,
                datatype: "json",
                mtype: "GET",
                colModel: [
                    {label: 'Id', name: 'idCuenta'},
                    {label: 'Cuenta', name: 'numCuenta',  sortable: false}
                ],
                rowNum: 10,
                rowList: [10, 20, 30],
                pager: '#pager',
                sortname: 'idCuenta',
                viewrecords: true,
                sortorder: "desc",
                caption: "Seleccione Cuenta",
                width: 300,
                height: 350,
            }).navGrid("#pager", {edit: false, add: false, del: false});
        };

    }]);