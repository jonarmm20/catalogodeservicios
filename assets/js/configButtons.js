function inicio(){
	$('#inicio').addClass('show');
	$('#alta').addClass('hidden');
	$('#editar').addClass('hidden');
	$('#acerca').addClass('hidden');
	$('#mostrar').addClass('hidden');
	

	$('#inicio').removeClass('hidden');
	$('#alta').removeClass('show');	
	$('#editar').addClass('show');
	$('#acerca').addClass('show');
	$('#mostrar').addClass('show');

}


function alta(){
	$('#alta').addClass('show');
	$('#inicio').addClass('hidden');
	$('#editar').addClass('hidden');
	$('#acerca').addClass('hidden');
	$('#mostrar').addClass('hidden');


	$('#alta').removeClass('hidden');
	$('#inicio').removeClass('show');	
	$('#editar').addClass('show');
	$('#acerca').addClass('show');
	$('#mostrar').addClass('show');

}

function editar(){
	$('#editar').addClass('show');
	$('#inicio').addClass('hidden');
	$('#alta').addClass('hidden');
	$('#acerca').addClass('hidden');
	$('#mostrar').addClass('hidden');



	$('#editar').removeClass('hidden');
	$('#inicio').removeClass('show');	
	$('#alta').removeClass('show');
	$('#acerca').removeClass('show');
	$('#mostrar').removeClass('show');

}

function acerca(){
	$('#acerca').addClass('show');
	$('#editar').addClass('hidden');
	$('#inicio').addClass('hidden');
	$('#alta').addClass('hidden');
	$('#mostrar').addClass('hidden');

	$('#acerca').removeClass('hidden');
	$('#editar').removeClass('show');
	$('#inicio').removeClass('show');	
	$('#alta').removeClass('show');	
	$('#mostrar').removeClass('show');	
}

function mostrar(){
	$('#mostrar').addClass('show');
	$('#acerca').addClass('hidden');
	$('#editar').addClass('hidden');
	$('#inicio').addClass('hidden');
	$('#alta').addClass('hidden');

	$('#mostrar').removeClass('hidden');
	$('#acerca').removeClass('show');
	$('#editar').removeClass('show');
	$('#inicio').removeClass('show');	
	$('#alta').removeClass('show');	
}