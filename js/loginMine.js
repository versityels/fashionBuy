var myScroll;
$(function(){
	//获取用户手机号
	var data = localStorage.getItem("user");
	if(data && data != ""){
		var userID = JSON.parse(data).userID;
		$(".header p").html(userID);
	}
	//页面滚动
	loadScroll();
	//跳转到我的订单页面
	$(".order li").eq(0).bind("touchend",function(){
		location.href = "order.html";
	});
	$(".order li").eq(1).bind("touchend",function(){
		location.href = "cart.html";
	});
	$(".order li").eq(2).bind("touchend",function(){
		location.href = "love.html";
	})
	//退出按钮
	$(".quit").bind("touchend",function(){
		localStorage.clear();
		location.href = "login.html";
	});
	$(".footer dl").eq(3).unbind();
});
//滚动条加载
function loadScroll(){
	myScroll = new IScroll(".mineCon",{
		scrollX: false,
		scrollY: true,
		scrollbars: true
	});
}
