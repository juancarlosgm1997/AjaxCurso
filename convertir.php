<?php
//Cuando las peticiones están en carpetas diferentes
header('Access-Control-Allow-Origin: *'); //atender cualquier petición AJAX por el servidor

//Si recibe una petición que diga operación = may
// if($_REQUEST['operacion'] =='may'){
//     //convertir texto a mayusculas
//     echo strtoupper($_REQUEST['texto']);
// }
// //Si recibe una petición que diga operación = min
// else if($_REQUEST['operacion'] =='min'){
//     //convertir texto a minusculas
//     echo strtolower($_REQUEST['texto']);
// }
// else{
//     //devolver el mismo texto que se envió
//     echo ($_REQUEST['texto']);
// }

//Petición de datos del lado del servidor
//Si se reciben datos
if(isset($_POST['nombre']) && isset($_POST['puesto'])){
    //Mostrar el nombre y puesto
    echo'Nombre:'.$_POST['nombre']."<br> Puesto.".$_POST['puesto'];
}

?>