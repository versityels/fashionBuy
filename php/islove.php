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
    
	$sql = "SELECT * FROM love where userId = ".$userId." and proId = ".$proId;
	
	$result = mysqli_query($link,$sql);
	
	if(mysqli_num_rows($result) > 0){
   		echo '{"info":"../img/detail/love_1.png"}';
	}else{
		echo '{"info":"../img/detail/love.png"}';
	}
    
?>


