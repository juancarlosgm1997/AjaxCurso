$(document).ready(function () {
  //AL dar clic en convertir
  $("#convertir").click(function (e) {
    e.preventDefault();
    //Asignar el valor a operacion
    let operacion = $("#operacion").val();
    //obtener el valor del texto
    let texto = $("#texto").val();
    //$.get("http://localhost/AjaxCurso/convertir.php?operacion="+operacion+"&texto="+texto, pasando datos via url
    //Pasando parametros via objeto
    $.get(
      "http://localhost/AjaxCurso/convertir.php",
      { operacion: operacion, texto: texto },
      function (data) {
        console.log(data);
        //Imprimir datos en el alert del html
        $("#listaEmpleados").html(data);
      }
    );
  });
});
