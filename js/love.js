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
		url:"http://localhost/fashionBuy/php/love1.php",
		async:true,
		data:{
			id: id
		},
		success:function(data){
			console.log(data);
			if(data.length > 0){
				$(".empty").hide();
			}
			for(var i = 0;i < data.length;i++){
				var dl = $("<dl class='loveGood'></dl>");
				var dt = $("<dt id='"+data[i].proId+"'><img src='"+data[i].proImg+"'/></dt>");
				var dd = $("<dd><p class='name'>"+data[i].proName+"</p><p>&yen;"+data[i].Price+"</p></dd>");
				dl.append(dt);
				dl.append(dd);
				$(".content_con").append(dl);
				dt.bind("touchend",function(){
					window.location.href = "detail.html?id="+ encodeURI($(this).attr("id"));
				});
			}
		}
	});
}
