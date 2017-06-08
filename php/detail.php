<?php
    header('content-type:application:json;charset=utf8');
    header('Access-Control-Allow-Origin:*');
    header('Access-Control-Allow-Methods:GET');
    header('Access-Control-Allow-Methods:POST');
    header('Access-Control-Allow-Headers:x-requested-with,content-type');
    $id = isset($_GET['id'])? $_GET['id'] : '';
    //连接数据库
    $link = mysqli_connect("localhost","root","","list");
    //查询数据库
    $sql = "SELECT * FROM list where proId = ".$id;
    //数据库返回的结果
    $result = mysqli_query($link,$sql);
    //判断结果是否存在
    $row=mysqli_fetch_assoc($result);
    
	echo (json_encode($row));
?>