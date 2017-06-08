$(function(){
	$("header div").bind("click",function(){
		goBack();
	});
	var user = localStorage.getItem("user");
	var id =JSON.parse(user).id;
	loadData(id);
});

function loadData(id){
	$.ajax({
		type:"get",
		url:"http://localhost/fashionBuy/php/loadCart.php",
		async:true,
		data:{
			id: id
		},
		success:function(data){
			console.log(data);
			if(data.length > 0){
				$(".empty").css("display","none");
			}
			for(var i = 0;i < data.length;i++){
				var dl = $("<dl class='order'></dl>");
				var dt = $("<dt><img src='"+ data[i].img +"'/></dt>");
				var dd = $("<dd></dd>");
				var info = $("<p>商品名："+data[i].proName+"</p><p>价格：&yen;"+data[i].Price+"</p>");
				var number = $("<p>数量：<div class='number'><button class='less'>-</button><input class='count' value='"+data[i].number+"' readonly='true'/><button class='add'>+</button></div></p>")
				var lessButton = $("<button class='less'>-</button>");
				var button = $("<button class='cancel' id='"+data[i].id+"'>删除</button>");
				var jumpBtn = $("<button class='cancel'>去支付</button>");
				var addButton = $("<button class='add'>+</button>");
				dd.append(info);
				dd.append(number);
				dl.append(dt);
				dl.append(dd);
				dl.append(button);
				dl.append(jumpBtn);
				$(".content_con").append(dl);
			}
			$(".cancel").bind("touchend",function(){
				Delete($(this).attr("id"));
			});
			$(".less").bind("touchend",function(){
				var cartId = $(this).parent().parent().next().attr("id");
				console.log(cartId);
				var num = $(this).next().val();
				num--;
				if(num <= 1){
					num = 1;
				}
				$(this).next().val(num)
				refreshNum(cartId,num);
			});
			$(".add").bind("touchend",function(){
				var cartId = $(this).parent().parent().next().attr("id");
				var num = $(this).prev().val();
				num++;
				$(this).prev().val(num)
				refreshNum(cartId,num);
			});
			
			//取消收藏
			function Delete(id){
				$.ajax({
					type:"post",
					url:"http://localhost/fashionBuy/php/cancelCart.php",
					async:true,
					data:{
						id: id
					},
					success:function(data){
						alert(data.info);
						location.reload();
					}
				});
			}
			
			//更改数量
			function refreshNum(id,num){
				$.ajax({
					type:"post",
					url:"http://localhost/fashionBuy/php/refreshNum.php",
					async:true,
					data:{
						id: id,
						num: num
					},
					success:function(data){
						console.log(data.info);
					}
				});
			}
		}
	});
}
