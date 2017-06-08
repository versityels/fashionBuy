var myScroll;
$(function(){
	loadData();
	$("#wrapper").bind("touchstart",function(){
		$("#searchList").blur();
	});
	$("#searchList").blur(function(){
		$("#searchList").hide();
	});
	$("#searchList").focus(function(){
		$("#searchList").show();
	});
});


function loadIscroll(){
	myScroll = new IScroll("#wrapper",{
		scrollY : true,
		scrollX : false,
		scrollbars : true,
		mouseWheel: true,
		checkDOMChanges:true
	});
}

//搜索
function search(){
	var values = $("#search").val();
	var searchList = $("#searchList");
	if(values.length > 2){
		var info = values;
		$.ajax({
			type:"post",
			dataType:"json",
			url:"http://localhost/fashionBuy/php/searchList.php",
			data:{
				info:info
			},
			async:true,
			success:function(data){
				console.log(data);
				searchList.empty();
				$.each(data, function(index){
					var $li = $("<li>"+data[index].name+"</li>");
					searchList.append($li);
				});
				searchList.show();
				
			}
		});
	}else{
		searchList.hide();
		searchList.empty();
	}
}

function loadData(){
	$.ajax({
		type:"get",
		url:"http://localhost/fashionBuy/php/hotGoods.php",
		async:true,
		dataType: "json",
		success: function(data){
			console.log(data);
			for(var i = 0;i < data.length;i++){
				if(data[i].state == null){
					if(data[i].number > 0){
						var img = $("<img id='"+data[i].proId+"' src='"+data[i].img.split(",")[0]+"'/>");
						var dt = $("<dt></dt>");
						var dd = $("<dd><p>"+data[i].brand+"</p><p>&yen;"+data[i].Price+"</p></dd>");
						var dl = $("<dl></dl>");
						dt.append(img);
						dl.append(dt);
						dl.append(dd);
						$(".content").append(dl);
						img.on("load",function(){
						    myScroll.refresh();
						});
						img.bind("touchend",function(){
							location.href = "detail.html?id="+ encodeURI($(this).attr("id"));
						});
					}else{
						var img = $("<img id='"+data[i].proId+"' src='"+data[i].img.split(",")[0]+"'/>");
						var dt = $("<dt></dt>");
						var dd = $("<dd><p>"+data[i].brand+"</p><p>&yen;"+data[i].Price+"</p></dd>");
						var dl = $("<dl><div class='haveNo'><div class='haveNo_1'>已售罄<div></div></dl>");
						dt.append(img);
						dl.append(dt);
						dl.append(dd);
						$(".content").append(dl);
					}
				}
			}
			loadIscroll();
		}
	});
}
