<?php
//Cuando las peticiones están en carpetas diferentes
header('Access-Control-Allow-Origin: *'); //atender cualquier petición AJAX por el servidor

//Crear conexion a la base de datos
$servidor = "localhost";
$usuario = "root";
$pass = "";
$bd = "empleados";
//Variale de conexion a mysql
$mysqli = new mysqli($servidor, $usuario, $pass, $bd);

//Obtener acciones del CRUD
//Si el requerimiento de la acción es: Leer
if ($_REQUEST['accion'] == "leer") {
    //Arreglo para contener los resultados
    $arreglo = array();

    //Consulta
    $consulta = "SELECT id,nombre,puesto,edad FROM empleados";

    //Si la consulta es ejecutada correctamente
    if ($result = $mysqli->query($consulta)) {
        //Pasar los datos de la consulta a un arreglo
        while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
            $arreglo[] = $row;
        }
        echo json_encode($arreglo);
    }
    //Cerrar resultado y conexion para no consumir memoria en el servidor
    $result->close();
} else if ($_REQUEST['accion'] == "insertar") {
    //Ejecutar consulta para hacer un insert vía POST a MySQL
    $sql = "INSERT INTO empleados (nombre,puesto,edad) values ('" . $_POST["nombre"] . "','" . $_POST["puesto"] . "','" . $_POST["edad"] . "')";
    //Si el query con la consulta es exitosa devolver true e imprimir 1
    if ($mysqli->query($sql) == TRUE) {
        echo "1";
    }
    //De lo contrario devolver 0
    else {
        echo "0";
    }

}
//Cuando la acción sea editar
else if ($_REQUEST['accion'] == "editar") {
    //Ejecutar consulta para hacer un update vía POST a MySQL
    $sql = "UPDATE empleados set nombre='" . $_POST["nombre"] . "',puesto='" . $_POST["puesto"] . "',edad ='" . $_POST["edad"] . "' where id='" . $_POST["id"] . "'";
    //Si el query con la consulta es exitosa devolver true e imprimir 1
    if ($mysqli->query($sql) == TRUE) {
        echo "1";
    }
    //De lo contrario devolver 0
    else {
        echo "0";
    }

}
//Cuando la acción sea eliminar
else if ($_REQUEST['accion'] == "eliminar") {
    //Ejecutar consulta para hacer un delete vía POST a MySQL
    $sql = "DELETE FROM  where id='" . $_POST["id"] . "'";
    //Si el query con la consulta es exitosa devolver true e imprimir 1
    if ($mysqli->query($sql) == TRUE) {
        echo "1";
    }
    //De lo contrario devolver 0
    else {
        echo "0";
    }

}
//Cerrar conexión para no consumir memoria en el servidor
$mysqli->close();
