$(document).ready(function () {
  //Enviamos los datos en el formulario a traves del submit del boton
  $("form").submit(function (e) {
    //No envía los datos al server hasta que se haga el post
    e.preventDefault();
    //Recibir nombre y puesto en variables
    let nombre = $("#nombre").val();
    let puesto = $("#puesto").val();
    //Enviar datos via post
    $.post(
      "http://localhost/AjaxCurso/convertir.php",
      { nombre: nombre, puesto: puesto }, //se envía un objeto como data
      function (data, textStatus, jqXHR) {
        //quitar clase d-none para mostrar el resultado
        $("#resultado").parent().removeClass("d-none");
        //Mostrar el resultado de la petición
        $("#resultado").html(data);
      }
      //Si la peticion fue exitosa
    )
      .done(function () {
        //imprime en el alert de estado
        $("#estado").html("exito");
        //Agregar la clase de bootstrap para mostrar la alerta en verde
        $("#estado").addClass("alert-success");
        //Remover clase d-none para mostrar el alert
        $("#estado").removeClass("d-none");
        //Si la peticion falla
      })
      .fail(function () {
        //imprime en el alert de estado
        $("#estado").html("Falló");
        //Agregar la clase de bootstrap para mostrar la alerta en rojo
        $("#estado").addClass("alert-danger");
        //Remover clase d-none para mostrar el alert
        $("#estado").removeClass("d-none");
      })
      /*Cada que termina de ejecutar la petición sin importar
         si su estado fue exitoso o no
         */
      .always(function () {
        //Mostrar mensaje en consola
        console.log("finalizó");
      });
  });
});
