app.controller("ArticulosController", ["$location", "$scope", "$http", function ArticulosController($location, $scope, $http) {

        $scope.mostrarArticulos = function() {
            $("#tablaArticulos").jqGrid({
                url: "../php/articulos.php",
                mtype: "GET",
                datatype: "json",
                colModel: [
                    {label: 'ID Producto', name: 'idProducto', key: true},
                    {label: 'Nombre', name: 'nombreProducto'},
                    {label: 'Precio', name: 'precioUnidad'},
                    {label: 'Imagen', name: 'imagen'},
                    {label: 'Categoria', name: 'categoria'},
                    {label: 'stock', name: 'stock'}
                ],
                viewrecords: true,
                rowNum: 10,
                pager: "#jqgridpager"
            });
        };
        
        $scope.mostrarArticulos();
    }]);