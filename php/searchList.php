<?php
    header('Access-Control-Allow-Origin:*');
    header('content-type:application:json;charset=utf8');
    header('Access-Control-Allow-Methods:GET');
    header('Access-Control-Allow-Methods:POST');
    header('Access-Control-Allow-Headers:x-requested-with,content-type');
    $info = isset($_POST['info'])? $_POST['info'] : '';

    $link = mysqli_connect("localhost","root","","list");

    $sql = "SELECT * FROM list WHERE `name` LIKE '%".$info."%'";

    $result = mysqli_query($link,$sql);

    while($row = mysqli_fetch_assoc($result)){
	    $a[]=$row;
	}
	echo json_encode($a);
?>


