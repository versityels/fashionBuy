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

    $link = mysqli_connect("localhost","root","","orders");

    $sql = "SELECT * FROM cart where userId = ".$userId." and proId = ".$proId;

    $result = mysqli_query($link,$sql);

    if(mysqli_num_rows($result) > 0){
        $sqlNew = "UPDATE cart set number = number + 1 where userId = ".$userId." and proId = ".$proId;

    	$resultNew = mysqli_query($link,$sqlNew);
    }else{
        $sqlNew = "INSERT INTO cart (userId, proId, number, proName,Price,img) VALUES (".$userId.",".$proId.",1,'".$proName."',".$price.",'".$proImg."')";

    	$resultNew = mysqli_query($link,$sqlNew);
    }
    if(! $resultNew ){
        die('无法插入数据: ' . mysqli_error($link));
    }
    echo '{"info":"添加购物车!"}';
?>


