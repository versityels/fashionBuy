<?php
    header('content-type:application:json;charset=utf8');
    header('Access-Control-Allow-Origin:*');
    header('Access-Control-Allow-Methods:GET');
    header('Access-Control-Allow-Methods:POST');
    header('Access-Control-Allow-Headers:x-requested-with,content-type'); 
    $id = isset($_POST['id'])? $_POST['id'] : '';
    $num = isset($_POST['num'])? $_POST['num'] : '';
    //连接数据库
    $link = mysqli_connect("localhost","root","","orders");
    $sql = "UPDATE cart set number = ".$num." where id = ".$id;
    //数据库返回的结果
    $result = mysqli_query($link,$sql);
    //判断结果是否存在
    if(! $result ){
        die('无法插入数据: ' . mysqli_error($link));
    }
    echo '{"info":"更改数量成功!"}';
?>