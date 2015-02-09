app.controller("RegistroController", [ "$scope", "$http", function RegistroController($scope, $http) {
         $scope.datos = {
            apellidos: "",
            nombre: "",
            telefono: "",
            dni: "",
            email: "",
            pass: "",
            repetirPass: ""
        };
        $scope.registrar = function() {
        //Vaciamos las variables y los mensajes
        msg1="";
        msg2="";
        $('#msg-1').html("");
        $('#msg-2').html("");
        //Validaciones del primer fieldset
        if(($scope.datos.nombre==="")||($scope.datos.apellidos==="")||($scope.datos.dni==="")){
            msg1+="-Los campos con (*) son obligatorios<br/>";
        }
        //Validaciones del segundo fieldset
        if(($scope.datos.email==="")||($scope.datos.pass==="")||($scope.datos.repetirPass==="")){
            msg2+="-Los campos con (*) son obligatorios<br/>";
        }
        if($scope.datos.pass!==$scope.datos.repetirPass){
           msg2+="-Las contraseñas deben coincidir<br/>";
        }
        if(($scope.datos.email!=="")&&(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test($scope.datos.email))){
            msg2+="-Introduzca un email valido<br/>";
        }
        //Asignamos los mensajes
        $('#msg-1').html(msg1);
        $('#msg-2').html(msg2);
        
        if(msg1===""&&msg2===""){
           $scope.enviarDatos();
        }
		
    };
	$scope.enviarDatos = function() {
			$.ajax({
            method: "POST",
            url: "registro/registro.php",
            data: $("#form").serialize(),
            success: function (data) {
				alert("Usuario "+data.nombre+" registrado.")
				$('#form').html("<p>Usuarioa</p>");
            }
        });
	};
		
    }]);