<?php
    header('Access-Control-Allow-Origin:*');
    header('content-type:application:json;charset=utf8');
    header('Access-Control-Allow-Methods:GET');
    header('Access-Control-Allow-Methods:POST');
    header('Access-Control-Allow-Headers:x-requested-with,content-type');
	//获取页面传来的数据
    $phone = isset($_POST['phone'])? $_POST['phone'] : '';
    $psw = isset($_POST['psw'])? $_POST['psw'] : '';
    //连接数据库
    $link = mysqli_connect("localhost","root","","login");
    //查询数据库
    $sql = "SELECT * FROM user where phone =".$phone." and password="."'".$psw."'";
    //数据库返回的结果
    $result = mysqli_query($link,$sql);
    //判断结果是否存在
    if(mysqli_num_rows($result) > 0){
    	$row = mysqli_fetch_assoc($result);
        echo (json_encode($row));
    }else{
        echo '{"id":"用户名或密码错误!"}';
    }
?>