var proName;
var price;
var proImg;
$(function(){
	var proId = getQueryString("id");
	loadDetail(proId);
	var userId = localStorage.getItem("user");
	if(userId == null){
		$(".buy").bind("touchend",function(){
			alert("亲，请登录！");
			window.location.href = "login.html";
		});
		$(".love").bind("touchend",function(){
			alert("亲，请登录！");
			window.location.href = "login.html";
		});
		$(".addC").bind("touchend",function(){
			alert("亲，请登录！");
			window.location.href = "login.html";
		});
		$(".cart").bind("touchend",function(){
			alert("亲，请登录！");
			window.location.href = "login.html";
		});
	}else{
		$(".cart").bind("touchend",function(){
			window.location.href = "cart.html";
		});
		//判断是否收藏过该商品
		isLove(userId,proId);
		$(".buy").bind("touchend",function(){
			$.ajax({
				type:"post",
				url:"http://localhost/fashionBuy/php/order.php",
				async:true,
				data:{
					userId: JSON.parse(userId).id,
					proId: proId,
					proName: proName,
					price:price,
					proImg: proImg
				},
				success: function(data){
					alert(data.info);
				}
			});
		});
		$(".love").bind("touchend",function(){
			$.ajax({
				type:"post",
				url:"http://localhost/fashionBuy/php/love.php",
				async:true,
				data:{
					userId: JSON.parse(userId).id,
					proId: proId,
					proName: proName,
					price:price,
					proImg: proImg
				},
				success: function(data){
					if(data.info == "添加收藏成功!"){
						$(".love p img").attr("src","../img/detail/love_1.png");
					}
					alert(data.info);
				}
			});
		});
		$(".addC").bind("touchend",function(){
			$.ajax({
				type:"post",
				url:"http://localhost/fashionBuy/php/cart.php",
				async:true,
				data:{
					userId: JSON.parse(userId).id,
					proId: proId,
					proName: proName,
					price: price,
					proImg: proImg
				},
				success:function(data){
					alert(data.info);
				}
			});
		});
	}
	
});


function isLove(userId,proId){
	$.ajax({
		type:"post",
		url:"http://localhost/fashionBuy/php/islove.php",
		async:true,
		data:{
			userId: JSON.parse(userId).id,
			proId: proId,
		},
		success: function(data){
			$(".love p img").attr("src",data.info);
		}
	});
}

function getQueryString(name){
	//在你要添加的名字前面进行添加前缀 匹配元素的正则表达式
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var reg1 = window.location.search.substr(1).match(reg);
	if(reg1!=null){
		return decodeURI(reg1[2]);
	}
	return null;
}


function loadDetail(id){
	$.ajax({
		type:"get",
		url:"http://localhost/fashionBuy/php/detail.php",
		async:true,
		data:{
			id: id
		},
		success:function(data){
//			console.log(data);
			var imgCount = data.img.split(",").length;
			for(var i = 0;i < imgCount;i++){
				var slide = $("<div class='swiper-slide'><img src='"+data.img.split(",")[i]+"' /></div>");
				$(".swiper-wrapper").append(slide);
			}
			$(".proInfo").append(data.name);
			proName = data.name;
			proImg = data.img.split(",")[0];
			$(".price").append("&yen;" + data.Price);
			price = data.Price;
			loadSwiper();
		}
	});
}

function goback(){
	history.go(-1);
}

function loadSwiper(){
	var swiper = new Swiper(".swiper-container",{});
}
