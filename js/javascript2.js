$(document).ready(function () {
  //Llamar la función de ajax al dar clic en el boton con id= "#ajax"
  $("#ajax").click(function (e) {
    e.preventDefault();
    $.ajax({
      url: "empleados.json", //De donde provienen los datos
      type: "get", //conexión o método
      dataType: "json", //Convertir la data a JSON
      //Cuando la función sea exitosa mostrar los datos
      success: function (data) {
        //Mostrar datos en consola
        console.log(data);
        //Limpiar el alert para evitar que se repitan datos al dar clic en enviar
        $("#listaEmpleados").html("");
        //Mostrar los datos en el alert de bootstrap
        $.each(data.empleados, function (i, item) {
          //Concatenando lista empleados ya que solo se mostraba el primer valor
          $("#listaEmpleados").html(
            $("#listaEmpleados").html() +
              `
            <li>${item.nombre}</li>
            `
          );
        });
      },
      //Cuando exista un error se retorna un xhr, el estado y el error
      //xhr el recurso que se hizo para  hacer la peticion
      error: function (xhr, status, error) {
        console.log(xhr);
      },
    });
  });
});
