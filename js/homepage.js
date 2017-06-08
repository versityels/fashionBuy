var myScroll;
var cScroll;
$(function(){
	loadAd();
	loadNews();
	loadHotGoods();
	loadMyS();
	loadCS();
	$("#cWrapper").bind("touchend",function(){
		if(myScroll.y > 0){
			$("#cWrapper").html("");
			loadAd();
			loadNews();
			loadHotGoods();
			loadMyS();
			loadCS();		
		}
	});
});

function loadMyS(){
	myScroll = new IScroll("#wrapper",{
		scrollX : true,
		scrollY : false,
		/*interactiveScrollbars:false*/
	});
}

function loadCS(){
	cScroll = new IScroll("#cWrapper",{
		scrollY : true,
		scrollX : true,
	});
}

//加载热销商品
function loadHotGoods(){
	$.ajax({
		type:"get",
		url:"http://localhost/fashionBuy/php/hotGoods.php",
		async:true,
		dataType: "json",
		success: function(data){
			for(var i = 0;i < data.length;i++){
				if(data[i].state == "hot"){
					var img = $("<img id='"+data[i].proId+"' src='"+data[i].img.split(",")[0]+"'/>");
					var dt = $("<dt></dt>");
					var dd = $("<dd><p>"+data[i].brand+"</p><p>&yen;"+data[i].Price+"</p></dd>");
					var dl = $("<dl class='goods'></dl>");
					dt.append(img);
					dl.append(dt);
					dl.append(dd);
					$(".plate_goods").append(dl);
					img.on("load",function(){
					    cScroll.refresh();
					});
					img.bind("touchend",function(){
						console.log($(this).attr("id"));
						location.href = "detail.html?id="+ encodeURI($(this).attr("id"));
					});
				}
			}
		}
	});
}


//加载导航资讯
function loadNews(){
	$.ajax({
		type: "get",
		url:"http://localhost/fashionBuy/php/news.php",
		dataType: "json",
		success:function(data){
			for(var i = 0;i < data.length;i++){
				var dl = $("<dl class='content_img'><dt><img src='"+data[i].img+"' /></dt><dd>"+data[i].name+"<dd></dl>");
				$(".nav").append(dl);
			}
		}
	})
}


//加载轮播图
function loadAd(){
	$.ajax({
		type:"get",
		url:"http://localhost/fashionBuy/php/ad.php",
		async:true,
		dataType: 'json',
		success: function(data){
			for(var i = 0;i < data.length;i++){
				var slide = $("<div class='swiper-slide'><img src='"+ data[i].img +"' /></div>");
				$(".swiper-wrapper").append(slide);
			}
			loadSwiper();
		}
	});
}

function loadSwiper(){
	var swiper = new Swiper('.swiper-container',{
		autoplay:2000,
		loop:true,
		speed:1000,
		pagination:".swiper-pagination",
	});
}
