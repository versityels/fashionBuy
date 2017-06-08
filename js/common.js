$(function(){
//	var phone = localStorage.getItem("phone");
//	var src = "";
//	if(phone == null){
//		src = "login.html";
//	}else{
//		src = "loginMine.html";
//	}
//	$(".footer dl").eq(3).on("touchend",function(){
//		location.href = src;
//	});
});


$(".footer dl").eq(0).on("touchend",function(){
	location.href = "homepage.html";
});

$(".footer dl").eq(1).on("touchend",function(){
	location.href = "news.html";
});

$(".footer dl").eq(2).on("touchend",function(){
	location.href = "shop.html";
});

$(".footer dl").eq(3).on("touchend",function(){
	location.href = "login.html";
});

function goBack(){
	history.go(-1);
}
