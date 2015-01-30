app.controller("PedidosController", ["$location", "$scope", "$http", function PedidosController($location, $scope, $http) {

$scope.cargarPedidos = function() {
    $("#list").jqGrid({
        url:'pedidos/pedidos.php',
        datatype: "json",
        colNames:['Id Pedido','Fecha Pedido', 'Cliente', 'Precio Total'],
        colModel:[
            {name:'idPedido',index:'idPedido',align:'right'},
            {name:'fechaPedido',index:'fechaPedido',align:'right'},
            {name:'cliente',index:'cliente',align:'right'},
            {name:'precioTotal',index:'precioTotal',align:'right'}		
        ],
        rowNum:5,
        rowList:[5,10,20],
        pager: '#pager',
		height: 111,
        sortname: 'idPedido',
        viewrecords: true,
		onSelectRow: function(ids) {
		if(ids == null) {
			ids=0;
			if(jQuery("#list_d").jqGrid('getGridParam','records') >0 )
			{
				jQuery("#list_d").jqGrid('setGridParam',{url:"pedidos/pedidosDetalle.php?q=1&id="+ids,page:1});
				jQuery("#list_d").trigger('reloadGrid');
				$(".tg2").text("Detalles Pedido (Pedido "+ids+")");
			}
		} else {
			jQuery("#list_d").jqGrid('setGridParam',{url:"pedidos/pedidosDetalle.php?q=1&id="+ids,page:1});
			jQuery("#list_d").trigger('reloadGrid');
			$(".tg2").text("Detalles Pedido (Pedido "+ids+")");	
		}
		}
	});
    $("#list").jqGrid('navGrid','#pager',{search:false,edit:false,add:false,del:false});
    };
    $scope.cargarPedidos();
	
$scope.cargarPedidoDetalle = function() {
	jQuery("#list_d").jqGrid({
	height: 175,
   	url:'pedidos/pedidosDetalle.php?q=1&id=0',
	datatype: "json",
   	colNames:['Id','Num. Pedido', 'Producto', 'Precio Unidad','Unidades'],
   	colModel:[
   		{name:'idDetallePedido',index:'idDetallePedido'},
   		{name:'numPedido',index:'numPedido'},
   		{name:'producto',index:'producto',  align:"right"},
   		{name:'precioUnidad',index:'precioUnidad', align:"right"},		
   		{name:'unidades',index:'unidades', align:"right"}
   	],
   	rowNum:10,
   	rowList:[10,20,30],
   	pager: '#pager_d',
   	sortname: 'idDetallePedido',
    viewrecords: true,
    sortorder: "asc",
	multiselect: true,
	}).navGrid('#pager10_d',{add:false,edit:false,del:false});
	};
$scope.cargarPedidoDetalle();
}]);