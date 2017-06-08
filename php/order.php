<?php
    header('Access-Control-Allow-Origin:*');
    header('content-type:application:json;charset=utf8');
    header('Access-Control-Allow-Methods:GET');
    header('Access-Control-Allow-Methods:POST');
    header('Access-Control-Allow-Headers:x-requested-with,content-type');
    $userId = isset($_POST['userId'])? $_POST['userId'] : '';
    $proId = isset($_POST['proId'])? $_POST['proId'] : '';
    $proName = isset($_POST['proName'])? $_POST['proName'] : '';
    $price = isset($_POST['price'])? $_POST['price'] : '';
    $proImg = isset($_POST['proImg'])? $_POST['proImg'] : '';
    //连接数据库
    $link = mysqli_connect("localhost","root","","orders");
    $sqlNew = "INSERT INTO orders (userId, proId, state, proName,Price,number,proImg) VALUES (".$userId.",".$proId.",'待付款','".$proName."',".$price.",1,'".$proImg."')";
    $resultNew = mysqli_query($link,$sqlNew);
    if(! $resultNew )
    {
        die('无法插入数据: ' . mysqli_error($link));
    }
   echo '{"info":"创建订单成功!"}';
?>


