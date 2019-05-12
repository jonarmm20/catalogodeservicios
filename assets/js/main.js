$(document).ready(function(){
  $("#myInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#myTable tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});


	var db = openDatabase('dbserver', '1.0', 'base de datos de catalogo de servicio', 5*1024*1024);

	function init(){
		db.transaction(function (tx){
			tx.executeSql('CREATE TABLE IF NOT EXISTS servers(ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, nombre TEXT, imagen TEXT, telefono TEXT, email TEXT, domicilio TEXT, categoria TEXT, nota TEXT)');
		});
		//profile();
		displayChange();
		//checkProfile();
	}


	function profile(){
		db.transaction(function (tx){
			tx.executeSql('CREATE TABLE IF NOT EXISTS perfil(ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, nombre TEXT, apellido TEXT, sexo TEXT, edad integer)');
		});

		//displayAll();
	}

	function checkProfile(){
		db.transaction(function (tx){
			tx.executeSql('select * from perfil', [], function(tx, result){
				var n = result.rows.length;
				if (n == 0) {
					Swal.fire({
					  title: 'Bienbenid@',
					  text: "Es un gusto que estes aqui, ayudanos acompletar tu perfil.",
					  type: 'info',
					  showCancelButton: true,
					  confirmButtonColor: '#3085d6',
					  cancelButtonColor: '#d33',
					  confirmButtonText: 'Vamos!',
					  cancelButtonText: 'En otro momento',
					  animation: false,
					  customClass: {
					    popup: 'animated rotateIn'
					  }
					}).then((result) => {
					  if (result.value) {
					    window.location.href="perfil.html";
					  }
					});

				}else{
					alert('existe un perfil');
				}
			});
		});
	}

	function displayAll(){
		db.transaction(function (tx){
			tx.executeSql('select * from servers ', [], function(tx, result){

				var n = result.rows.length;
				var s = '<table cellpadding="2" cellspacing="2" border="1" class="form-control">';	
				for(i = 0; i < n; i++){
					var servicio = result.rows.item(i);
					s += '<tr>';
					s += '<td ><p class="truncate">' + servicio.nombre +'</p></td>';
					s += '<td>' + servicio.categoria +'</td>';
					s += '<td><a href="#" class="btn btn-success float-right form-control"onclick="edit('+servicio.ID+')">Edit</a> </td>';
					s += '</tr>';
				}

				s += '</table>';
				document.getElementById('myTable').innerHTML = s;
			});

		});
	}

	function displayChange(){
		var id = document.getElementById('categoria').value;
		db.transaction(function (tx){
			tx.executeSql('select * from servers where categoria = ?', [id], function(tx, result){

				var n = result.rows.length;
				var s = '<table >';	
				
				if (n > 0) {					
					for(i = 0; i < n; i++){
						var servicio = result.rows.item(i);
						s += '<tr ><td>';
						s += '<button onclick="displaySelect('+servicio.ID+');"class="btn btn-light p-3  btn-select">';
						s += '<strong><i class="'+servicio.imagen+'"></i></strong> ' + servicio.nombre +' | ';
						s += '<strong><i class="fas fa-phone"></i></strong> 6691 89 14 18';
						s += '</button>';	
						s += '</td></tr>';		
					}
					s += '</table>';
					s += '<p class="text-center mt-3"><a href="#" class="text-center" onclick="alta();"><i class="fas fa-plus-circle"></i> Agregar Servicios</a></p>';

				}else{
					s += '<h1 class="lead text-center mt-3">Categoria Vacia</h1>';
					s += '<p class="text-center"><a href="#" class="text-center" onclick="alta();"><i class="fas fa-plus-circle"></i> Agregar Servicios</a></p>';
				}

				document.getElementById('myTable').innerHTML = s;
			});

		});
	}

	function displaySelect(id){
		mostrar();
		db.transaction(function (tx){
			tx.executeSql('select * from servers where id = ?', [id], function(tx, result){

				var n = result.rows.length;
				var s = '';	
				for(i = 0; i < n; i++){
					var servicio = result.rows.item(i);
					s += '<div class="d-flex justify-content-center mb-3">';
					s += '<h1 class="lead"><i class="'+servicio.imagen+'"></i> ' + servicio.categoria +'</h1>';
					s += '</div>';
					s += '<strong>Nombre: </strong> ' + servicio.nombre +'  <hr>';
					s += '<strong>Telefono: </strong> ' + servicio.telefono +' <hr>';
					s += '<strong>Email: </strong> ' + servicio.email +' <hr>';
					s += '<strong>Domicilio: </strong> ' + servicio.domicilio +' <hr>';
					s += '<strong>Notas: </strong> ' + servicio.nota +' <hr>';			
					s += '<button onclick="edit('+ servicio.ID +');" class="btn btn-success form-control">Editar</button><hr>';			
					s += '<button onclick="del('+ servicio.ID +')" class="btn btn-danger form-control">Eliminar</button>';			}

				document.getElementById('text-mostrar').innerHTML = s;
			});

		});
	}




	function add(){
		db.transaction(function (tx){
			var nombre = document.getElementById('serNombre').value;
			var telefono = document.getElementById('serTelefono').value;
			var email = document.getElementById('serEmail').value;
			var domicilio = document.getElementById('serDomicilio').value;
			var categoria = document.getElementById('serCategoria').value;
			switch (categoria){
				case 'Comida':
					var imagen = 'fas fa-utensils';
					break;
				case 'Transporte': 
					var imagen = 'fas fa-taxi';
					break;
				case 'Trabajo': 
					var imagen = 'fas fa-briefcase';
					break;
				case 'Emergencias': 
					var imagen = 'fas fa-car-crash';
					break;
				case 'Otros': 
					var imagen = 'far fa-sticky-note';
					break;
			}
			var nota = document.getElementById('serNota').value;
			var v = validar_insert();
			if (v) {
			tx.executeSql('insert into servers(nombre, imagen, telefono, email, domicilio, categoria, nota) values (?, ?, ?, ?, ?, ?, ?)', [nombre, imagen, telefono, email, domicilio, categoria, nota], mensajeAdd());
			}else{
				Swal.fire({
				  type: 'error',
				  title: 'Oops...',
				  text: 'Debe llenar todos los campo',
				  footer: '*solo el campo nota es opcional.'
				});
			}
		});
	}
	function mensajeAdd(){
		Swal.fire({
		  title: 'Agregado',
		  text: "Se agrego con exito.",
		  type: 'success',
		  confirmButtonColor: '#3085d6',
		  confirmButtonText: 'OK',
		  animation: false,
			  customClass: {
			  	popup: 'animated flip'
		  }
		}).then((result) => {
		  if (result.value) {
		  	limpiar();
		   	window.location.href = "./index.html";
		  }
		})
	}
	function del(id){
			Swal.fire({
			  title: '¿Seguro de eliminar el servicio?',
			  text: "Los datos se borraran permanentemente.",
			  type: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Si, eliminar',
			  animation: false,
			  customClass: {
			  	popup: 'animated slideInLeft'
			  }
			}).then((result) => {
			  if (result.value) {
				db.transaction(function (tx){
					tx.executeSql('delete from servers where id = ?', [id], mensajeDel());
				}); 
			  }
			})
	}
	function mensajeDel(){
		Swal.fire({
		  title: 'Eliminado',
		  text: "Se elimino con exito.",
		  type: 'success',
		  confirmButtonColor: '#3085d6',
		  confirmButtonText: 'OK',
		  animation: false,
			  customClass: {
			  	popup: 'animated flip'
		  }
		}).then((result) => {
		  if (result.value) {
		   	window.location.href = "./index.html";
		  }
		})
	}

	function edit(id){
		
		db.transaction(function (tx){
			
			tx.executeSql('select * from servers where id = ?', [id], function(tx, result){
				var servicio = result.rows.item(0);

				//document.getElementById('serId').value = servicio.id;
				
				document.getElementById('eId').value = servicio.ID;
				document.getElementById('eNombre').value = servicio.nombre;
				document.getElementById('eTelefono').value = servicio.telefono;
				document.getElementById('eEmail').value = servicio.email;
				document.getElementById('eDomicilio').value = servicio.domicilio;
				document.getElementById('eCategoria').value = servicio.categoria;
				document.getElementById('eNota').value = servicio.nota;

				var op = '<button class="btn btn-info form-control" onclick="save()">Actualizar</button><hr>';
				op += '<button class="btn btn-danger form-control" onclick="mensajeCancelar()">Cancelar</button>';
				document.getElementById('options').innerHTML = op;
			});
		});
		editar();
	}
	function mensajeCancelar(){
		Swal.fire({
		  title: 'Cancelar',
		  text: "¿Deseas Cancelar la operacion?",
		  type: 'warning',
		  showCancelButton: true,
  		  confirmButtonColor: '#3085d6',
  		  cancelButtonColor: '#d33',
		  confirmButtonText: 'OK',
		  animation: false,
			  customClass: {
			  	popup: 'animated slideInDown'
		  }
		}).then((result) => {
		  if (result.value) {
		  	limpiar();
		   	window.location.href = "./index.html";
		  }
		})
	}


	function save(){
		db.transaction(function (tx){
			var id = document.getElementById('eId').value;
			var nombre = document.getElementById('eNombre').value;
			var telefono = document.getElementById('eTelefono').value;
			var email = document.getElementById('eEmail').value;
			var domicilio = document.getElementById('eDomicilio').value;
			var categoria = document.getElementById('eCategoria').value;
			var nota = document.getElementById('eNota').value;
			switch (categoria){
				case 'Comida':
					var imagen = 'fas fa-utensils';
					break;
				case 'Transporte': 
					var imagen = 'fas fa-taxi';
					break;
				case 'Trabajo': 
					var imagen = 'fas fa-briefcase';
					break;
				case 'Emergencias': 
					var imagen = 'fas fa-car-crash';
					break;
				case 'Otros': 
					var imagen = 'far fa-sticky-note';
					break;
			}
			var v = validar_edit();
			if (v) {
				tx.executeSql('update servers set nombre = ?, imagen = ?, telefono = ?, email = ?, domicilio = ?, categoria = ?, nota = ? where ID = ?', [nombre, imagen, telefono, email, domicilio, categoria, nota, id], mensajeUpdate());
			}else{
				Swal.fire({
				  type: 'error',
				  title: 'Oops...',
				  text: 'Debe llenar todos los campo',
				  footer: '*solo el campo nota es opcional.'
				});
			}
		});
	}

	function mensajeUpdate(){
		Swal.fire({
		  title: 'Actualizacion',
		  text: "Se han actualizado los datos exitosamente",
		  type: 'success',
		  confirmButtonColor: '#3085d6',
		  confirmButtonText: 'OK',
		  animation: false,
			  customClass: {
			  	popup: 'animated flip'
		  }
		}).then((result) => {
		  if (result.value) {
		  	limpiar();
		   	window.location.href = "./index.html";
		  }
		})
	}
	function limpiar(){
		$('.limpiar').val('');
	}
	function donar(){
		window.location.href = "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=2NLE7A79943EG&source=url";
	}




	function info(){
		Swal.fire({
			title: '<strong>Informacion <u> APP Catalogo de Servicios</u></strong>',
			type: 'info',
			html:
			'Aplicación desarrollada mediante <b>PhoneGap</b> para Proyecto Final, ' +
			' Jonathan Raymundo Magallanes Martinez - Mayo de 2019 ',
			showCloseButton: true,
			focusConfirm: false,
			confirmButtonText:
			'<i class="fa fa-thumbs-up"></i> Muy bien!',
			confirmButtonAriaLabel: 'Thumbs up, great!',
		})
	}

	function validar_edit(){
			var nombre = document.getElementById('eNombre').value;
			var telefono = document.getElementById('eTelefono').value;
			var email = document.getElementById('eEmail').value;
			var domicilio = document.getElementById('eDomicilio').value;

			if (nombre == "" || telefono == "" || email == "" || domicilio == "") {
				return false;
			}else{
				return true;
			}
	}

	function validar_insert(){
			var nombre = document.getElementById('serNombre').value;
			var telefono = document.getElementById('serTelefono').value;
			var email = document.getElementById('serEmail').value;
			var domicilio = document.getElementById('serDomicilio').value;
			if (nombre == "" || telefono == "" || email == "" || domicilio == "") {
				return false;
			}else{
				return true;
			}

	}
