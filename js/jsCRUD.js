$(document).ready(function () {
  $("#leerEmpleados").click(function (e) {
    e.preventDefault();
    //Limpiar alerta en la cual se mostrarán los datos para evitar que se duplique la información
    $("#listEmpleados").html("");
    $.getJSON(
      "http://localhost/AjaxCurso/empleados.php",
      { accion: "leer" },
      function (data) {
        console.log(data);
        $.each(data, function (index, item) {
          //Concatenar anterior resultado con el nuevo para mostra la lista de empleados
          $("#listEmpleados").html(
            $("#listEmpleados").html() +
              `
                     <li><i class="fa fa-pencil-square-o" aria-hidden="true" 
                     data-id='${item.id}'
                     data-nombre='${item.nombre}'
                     data-puesto='${item.puesto}'
                     data-edad='${item.edad}'
                     ></i>
                     <i class="fa fa-trash" aria-hidden="true" data-id='${item.id}'></i>
                     ${item.nombre} -- ${item.puesto} -- ${item.edad}</li>
                     `
          );
          //se le agregó el icono para editar con i class=, al dar clic se mandan los datos solicitados
          //Se agrega el icono para borrar registro y se pasa el id del elemento seleccionado
        });
      }
    );
  });
  //Operación Crear del CRUD con Ajax,PHP y MySQL
  //Al hacer clic en el botón con el id crearEmpleado
  $("#crearEmpleado").click(function (e) {
    e.preventDefault();
    //Obtener el valor de los inputs y guardarlo en variables
    let nombre = $("#nombre").val();
    let puesto = $("#puesto").val();
    let edad = $("#edad").val();
    //Enviar datos vía POST
    $.post(
      "http://localhost/AjaxCurso/empleados.php",
      { accion: "insertar", nombre: nombre, puesto: puesto, edad: edad },
      function (data) {
        console.log(data);
        //Si la data ==1 (post exitoso definido en php)
        if (data == 1) {
          //resetear el valor de los inputs a vacio
          $("#nombre").val("");
          $("#puesto").val("");
          $("#edad").val("");
          //Al guardar datos enviarnos a la vista de leer datos
          $("#lista-tab").click();
          //Ejecutar la acción leer empleados
          $("#leerEmpleados").click();
        }
      }
    );
  });
  //Clic para el botón editar mandar llamar al la clase del icono editar
  $(document).on("click", ".fa-pencil-square-o", function () {
    // console.log($(this).data('id'))     ;
    //desactivar el boton crear quitandole la clase
    $("#crearEmpleado").addClass("d-none");
    $("#editarEmpleados").removeClass("d-none");
    //Cambiar el título del form crear a editar
    $("#datos-tab").html("Editar");
    //Forzar el clic para redireccionar al form crear editar
    $("#datos-tab").click();
    //Cargar los elementos a editar
    $("#nombre").val($(this).data("nombre"));
    $("#puesto").val($(this).data("puesto"));
    $("#edad").val($(this).data("edad"));
    $("#id").val($(this).data("id"));
  });
  //Clic para el botón eliminar mandar llamar al la clase del icono eliminar
  $(document).on("click", ".fa-trash", function () {
    //obtener el id del elemento seleccionado
    let id = $(this).data("id");
    //Obtener el elemento padre de la clase del boton eliminar
    const linea = $(this).parent();
    // console.log(id);
    //Enviar via post el id por medio de la url con un objeto
    $.post(
      "http://localhost/AjaxCurso/empleados.php",
      { accion: "eliminar", id: id },
      function (data) {
        //Imprimir la data que se eliminará
        console.log(data);
        //Eliminar la linea con el id seleccionado de nuestra lista
        linea.remove();
      }
    );
  });
  //Tomar los valores de los inputs al dar clic en btn con id editar
  $("#editarEmpleados").click(function (e) {
    e.preventDefault();
    //Guardar valores en variables
    let nombre = $("#nombre").val();
    let puesto = $("#puesto").val();
    let edad = $("#edad").val();
    let id = $("#id").val();
    //POST para actualizar los datos
    $.post(
      "http://localhost/AjaxCurso/empleados.php",
      { accion: "editar", nombre: nombre, puesto: puesto, edad: edad, id: id },
      function (data) {
        //Cuando el registro sea exitoso
        if (data == "1") {
          console.log(data);
        }
      }
    );
    //Cuando se de clic en editar se redireccionará a la vista de lista
    $("#lista-tab").click();
    //refrescar area leeEmpleados
    $("#leerEmpleados").click();
    //Aparecer botón crear empleado, remover editar empleado
    $("#crearEmpleado").removeClass("d-none");
    $("#editarEmpleados").addClass("d-none");
  });
});
