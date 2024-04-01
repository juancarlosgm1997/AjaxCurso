$(document).ready(function () {
  //<---Función get para leer un txt
  //Mandar llamar a nuestro boton
  $("#leer").click(function (e) {
    e.preventDefault();
    //Función get de Ajax
    $.get("archivo.txt", function (data, textStatus, jqXHR) {
      //Mostrar el resultado de los datos
      console.log(data);
      //Mostrar el Status
      console.log(textStatus);
      //Mostrar requerimiento
      console.log(jqXHR);
      //Función callback funcion que regrsa la función padre cuando se termina de hacer algo
      //Recibe la data (contenido delarchivo en este caso, textStatus exitoso, fallido o algun error, JQuery XHR con el requerimiento total)
    });
  });
  //<------Función get para leer un JSON------->
  //  Ejecutar la petición que venga del boton con el id leerEmpleado
  $("#leerEmpleado").click(function (e) {
    e.preventDefault();
    $.get("empleados.json", function (data) {
      //Se muestran los datos que vengan de la data (JSON en este ejemplo)
      console.log(data);
      //Mostrar los datos en la alerta creada con bootstrap
      $("#datosEmpleado").html(`
        Nombre: ${data.nombre} <br>
          Puesto: ${data.puesto}<br>
          Edad: ${data.edad}<br>`);
    });
    // alt+96 comida invertidas
  });
  //<------Función get para leer un arreglo de objetos JSON------->
  //  Ejecutar la petición que venga del boton con el id leerEmpleados
  $("#leerEmpleados").click(function (e) {
    e.preventDefault();
    //Limpiar el alert para evitar que se repitan datos al dar clic en enviar
    $("#listaEmpleados").html("");
    $.get("empleados.json", function (data) {
      //Se muestran los datos que vengan de la data (JSON en este ejemplo)
      console.log(data);
      //Mostrar los datos en la alerta creada con bootstrap
      $.each(data, function (index, item) {
        //Concatenando lista empleados ya que solo se mostraba el primer valor
        $("#listaEmpleados").html(
          $("#listaEmpleados").html() +
            `
          <li>${item.nombre} -- ${item.puesto} -- ${item.edad}</li>
          `
        );
        // //Se muestran el nombre y puesto de cada empleado
      });
    });
    // alt+96 comida invertidas
  });
  // <------- Leer datos usando función getJSON ------>
  //  Ejecutar la petición que venga del boton con el id leerGetJSON
  $("#leerGetJSON").click(function (e) {
    e.preventDefault();
    //Usando get para leer datos de un archivo txt en el que está guardado un JSON
    // $.get("empleados.txt", function (data) {
    //   //JSON.parse analiza los datos y los convierte al tipo JSON
    //   data = JSON.parse(data);
    //   console.log(data);
    // });
    //getJSON lee y formatea los datos del archivo sin necesidad de usar .parse
    // $.getJSON("empleados.txt", function (data) {
    //   console.log(data);
    // });
    //Limpiar el alert para evitar que se repitan datos al dar clic en enviar
    $("#listaEmpleados").html("");
    //Accediendo a un objeto del arreglo JSON
    $.getJSON("empleados.json", function (data) {
      //Agregamos el objeto al cual accederemos
      console.log(data.empleados);
      //Mediante esta función mostraremos en el html los datos
      //agregamos el objeto al cual queremos acceder con data.objeto
      $.each(data.empleados, function (index, item) {
        //Concatenando lista empleados ya que solo se mostraba el primer valor
        $("#listaEmpleados").html(
          $("#listaEmpleados").html() +
            `
          <li>${item.nombre} -- ${item.puesto}</li>
          `
        );
        // //Se muestran el nombre y puesto de cada empleado
      });
    });
  });
  //<----Filtrado con ajax --->
  let empleados; //variable global para almacenar empleados del JSON
  $.getJSON("empleados.json", function (data) {
    //Pasar datos del objeto empleados del JSOn a la variable global
    empleados = data.empleados;
  });
  //Filtrar al detectar que se escribe en el input
  $("#nombre").keyup(function (e) {
    //Limpiar el alert para evitar que se repitan datos al dar clic en enviar
    $("#listaEmpleados").html("");
    //Tomar el valor del selector y almacenar a una variable
    //let nombre=$('#nombre').val();
    let nombre = $(this).val(); //forma simplificada
    //Ciclo para recorrer el arreglo
    $.each(empleados, function (indexInArray, item) {
      //comparar item.nombre con el nombre obtenido en selector
      //.toLowerCase transforma el texto de entrada a minusculas
      if (item.nombre.toLowerCase().indexOf(nombre) !== -1) {
        //==-1 quiere decir que no son identicos, en este caso filtra solo los identicos
        //imprimir el resultado si se parecen
        console.log(item.nombre);
        //Concatenando lista empleados ya que solo se mostraba el primer valor
        $("#listaEmpleados").html(
          $("#listaEmpleados").html() +
            `
          <li>${item.nombre} -- ${item.puesto}</li>
          `
        );
        // //Se muestran el nombre y puesto de cada empleado
      }
    });
  });
});
