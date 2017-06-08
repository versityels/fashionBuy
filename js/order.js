$(function(){
	var user = JSON.parse(localStorage.getItem("user"));
	load(user.id);
	$("header div").bind("touchend",function(){
		history.go(-1);
	});
})

function load(id){
	$.ajax({
		type:"post",
		url:"http://localhost/fashionBuy/php/findOrder.php",
		async:true,
		data:{
			id: id
		},
		success: function(data){
			console.log(data);
			if(data.length > 0){
				$(".empty").css("display","none");
			}
			for(var i = 0;i < data.length;i++){
				var dl = $("<dl class='order'></dl>");
				var dt = $("<dt><img src='"+ data[i].proImg +"'/></dt>");
				var dd = $("<dd></dd>");
				var info = $("<p>商品名："+data[i].proName+"</p><p>价格：&yen;"+data[i].Price+"</p><p>数量："+data[i].number+"</p>");
				var state = $("<div class='state1'>"+data[i].state+"</div>");
				var button = $("<button class='pay' data-id='"+data[i].id+"'>立即付款</button><button class='cancel' id='"+data[i].id+"'>取消订单</button>");
				dd.append(state)
				dd.append(info);
				dl.append(dt);
				dl.append(dd);
				dl.append(button)
				$(".content_con").append(dl);
			}
			$(".pay").bind("touchend",function(){
				pay($(this).attr("data-id"));
			});
			$(".cancel").bind("touchend",function(){
				Delete($(this).attr("id"));
			});
			//付款
			function pay(id){
				$.ajax({
					type:"post",
					url:"http://localhost/fashionBuy/php/payOrder.php",
					async:true,
					data:{
						id: id
					},
					success:function(data){
						if(data.info == "付款成功!"){
							alert(data.info);
							location.reload();
						}
					}
				});
			}
			//取消订单
			function Delete(id){
				$.ajax({
					type:"post",
					url:"http://localhost/fashionBuy/php/deleteOrder.php",
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

		}
	});
}

