$(function(){
	$("#log").click(function(){
		$("#mensaje").text("");
	
	email=document.formulario.email;
	password=document.formulario.password;
	emailValido=false;
	passwordValido=false;
	
	//Codigo comprobación del email
	if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email.value)) {
		emailValido=true;
    }
	if(password.value.length>0){
		passwordValido=true;
	}
	
	if(emailValido){
		if(passwordValido){
			enviarDatos(email.value,password.value);
		}else{
			$("#mensaje").text("Introduzca su contraseña");
		}
	}else{
		if(passwordValido){
			$("#mensaje").text("Email con formato incorrecto");
		}else{
			$("#mensaje").text("Introduzca sus datos");
		}
	}
})
})
function enviarDatos(email,password){
		$.ajax({
			data:'email='+email+'&contrasenya='+password,
			url: 'sesionPhp/iniciarSesion.php',
			method: 'post',
			success: function(){
				location.reload();	
					},
			error: function(){
				$("#mensaje").text("Email o contraseña incorrectos");
				}
		});
}