<?php
    header('Access-Control-Allow-Origin:*');
    header('content-type:application:json;charset=utf8');
    header('Access-Control-Allow-Methods:GET');
    header('Access-Control-Allow-Methods:POST');
    header('Access-Control-Allow-Headers:x-requested-with,content-type');
    //连接数据库
    $link = mysqli_connect("localhost","root","","list");
    //查询数据库
    $sql = "SELECT * FROM list";
    //数据库返回的结果
    $result = mysqli_query($link,$sql);
    //判断结果是否存在
    while($row=mysqli_fetch_assoc($result)){
		$a[]=$row;
	}
	echo (json_encode($a));
?>