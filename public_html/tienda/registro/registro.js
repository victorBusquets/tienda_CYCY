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
        }else{
			if(($scope.datos.pass!=="")&&($scope.datos.repetirPass!=="")&&($scope.datos.pass.length<8)){
				msg2+="-La contraseña debe tener minimo 8 digitos<br/>";
			}
		}
        if(($scope.datos.email!=="")&&(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test($scope.datos.email))){
            msg2+="-Introduzca un email valido<br/>";
        }
		//Comprobamossi el email esta registrado en cuentas activas o pendientes
		$.ajax({
            method: "GET",
            url: "registro/comprobarEmailDisponible.php?email="+$scope.datos.email,
            success: function (data) {
				msg2+=data;

				//Asignamos los mensajes
				$('#msg-1').html(msg1);
				$('#msg-2').html(msg2);
				
				if(msg1===""&&msg2===""){
				   $scope.enviarDatos();
				}
		  }
		})
		
    };
	$scope.enviarDatos = function() {
			$.ajax({
            method: "POST",
            datatype: "json",
            url: "registro/registro.php",
            data: $("#form").serialize(),
            success: function (data) {
				$('#form').html("<p>Usuario="+data.nombre+"</p><p>Ruta de confirmación:</p><a href='#/confirmarRegistro/"+data.id+"/"+data.num+"'>Haga click para confirmar su registro</a>");
            }
        });
	};
		
    }]);