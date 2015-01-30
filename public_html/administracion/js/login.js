window.onload = function() {
$.ajax({
	url: 'main/comprobarSesion.php',
	method: 'get',
	success: function(response){
		if(response=="false"){mostrarLogin();};
	}
});
};
	function mostrarLogin(){
		$('#cuadro-login').dialog({
		resizable: false,
		modal: true,
		dialogClass: 'no-close',
		buttons: {
			"Entrar": function(){
				$('#mensaje-login').text("");
				if(($('#email').val()=="")||($('#password').val()=="")){
					$('#mensaje-login').text("Introduzca email y contrasena");
				}else{
					iniciarSesion($('#email').val(),$('#password').val());
				};
			}
		}
		});
	};		
	function iniciarSesion(email,contrasenya){

		$.ajax({
			data:'email='+email+'&contrasenya='+contrasenya,
			url: 'main/login.php',
			method: 'post',
			success: function(response){
				$('#cuadro-login').dialog('close');
				},
			error: function(){
				$('#mensaje-login').text("Email o contrasena incorrectos");
				}
			});
		};