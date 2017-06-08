<?php
    header('Access-Control-Allow-Origin:*');
    header('content-type:application:json;charset=utf8');
    header('Access-Control-Allow-Methods:GET');
    header('Access-Control-Allow-Methods:POST');
    header('Access-Control-Allow-Headers:x-requested-with,content-type');
    $phone = isset($_POST['phone'])? $_POST['phone'] : '';
    $psw = isset($_POST['psw'])? $_POST['psw'] : '';
    
    //连接数据库
    $link = mysqli_connect("localhost","root","","login");
    //查询数据库
    $sql = "SELECT * FROM user where phone = ".$phone;
    //返回结果
    $result = mysqli_query($link,$sql);
    //判断是否存在一样的手机号
    if(mysqli_num_rows($result) > 0){
    	//该手机号已存在
        echo '{"data":"该手机号已被注册!"}';
    }else{
    	//数据库中不存在该号码，可以注册
        echo '{"data":"注册成功,请登录!"}';
        //添加进数据库
        $sqlNew = "INSERT INTO user (phone, password) VALUES (".$phone.",'".$psw."')";
        $resultNew = mysqli_query($link,$sqlNew);
    }
?>


