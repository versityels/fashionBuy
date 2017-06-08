$(function(){
	var data = localStorage.getItem("user");
	if(data && data!=""){
		window.location.href = "loginMine.html";
	}
	//返回按钮
	$(".return").on("touchend",function(){
		location.href = "homepage.html";
	});
	
	//登录  注册  切换
	$(".login").on("touchend",function(){
		$(".loginPlate").css("display","block");
		$(".signPlate").css("display","none");
		$(".demo").css("left","22%");
	});
	$(".sign").on("touchend",function(){
		$(".loginPlate").css("display","none");
		$(".signPlate").css("display","block");
		$(".demo").css("left","72%");
	});
	
	//手机验证码登录
	$(".fLogin").on("click",function(){
		alert("暂未开启，请使用密码登录！")
	})
	
	//获取验证码
	var arr = new Array(4);
	$(".getCode").on("click",function(){
		var str = "";
		for(var i = 0;i < arr.length;i++){
			arr[i] = parseInt(Math.random()*74 +48);
			if(arr[i] >= 48 && arr[i] <= 57 || arr[i] >= 65 && arr[i] < 90 || arr[i] >=97 && arr[i] <= 122){
				str += String.fromCharCode(arr[i]);
			}else{
				i--;
			}
		}
		$(this).html(str);
	});
	//验证手机号和密码
	$(".loginBtn").bind("touchend",login);
	
	//注册
	$(".signBtn").bind("touchend",register);
})

//登录验证函数
function login(){
	//获取手机号和密码
	var phone = $(".inflow input").eq(0).val();
	var psw = $(".inflow input").eq(1).val();
	//前台判断是否为空等
	if(phone == ""){
		alert("手机号不能为空!");
	}else if(psw == ""){
		alert("密码不能为空!");
	}else{
		//连接后台进行数据校验
		$.ajax({
			type:"post",
			url:"http://localhost/fashionBuy/php/login.php",
            data: {
              phone: phone,
              psw : psw
            },
            dataType: 'json',
			async:true,
			success: function(data){
				//如果成功
				console.log(data.id);
				if(data.id == "用户名或密码错误!"){
					alert(data.id);
					$(".inflow input").eq(1).val("");
				}else{
					alert("登录成功！");
					var str = '{"userID":"'+phone+'","password":"'+psw+'","id":"'+data.id+'"}';
	        		localStorage.setItem("user",str);
	        		location.href = "loginMine.html";
				}
			}
		});
	}
}

//注册验证函数
function register(){
	//获取用户填写的信息
	var name = $(".inflow input").eq(2).val();
	var phone = $(".inflow input").eq(3).val();
	var code = $(".inflow input").eq(4).val();
	var psw = $(".inflow input").eq(5).val();
	var confirmPsw = $(".inflow input").eq(6).val();
	var rightCode = $(".getCode").html();
	//前台判断不能为空等
	if(name == ""){
		alert("用户名不能为空!");
	}else if(phone == ""){
		alert("手机号不能为空!");
	}else if(!(/^1[34578]\d{9}$/.test(phone))){//正则验证 手机号格式是否正确
		alert("手机号格式有误!");
	}else if(code != rightCode){
		alert("验证码不正确!");
	}else if(psw == ""){
		alert("密码不能为空!");
	}else if(psw.length < 6 || psw.length > 18){
		alert("密码长度不能小于6位,大于20位");
		$(".inflow input").eq(4).val("");
	}else if(!(/^(?![^a-zA-Z]+$)(?!\D+$)/.test(psw))){
		alert("请输入正确格式密码!");	
		$(".inflow input").eq(4).val("");
	}else if(confirmPsw == ""){
		alert("再次输入密码不能为空!");
	}else if(confirmPsw != psw){
		alert("两次输入密码不一致!");
	}else{
		//连接后台数据，进行校验，该用户是否存在
		$.ajax({
			type:"post",
			//数据接口
			url:"http://localhost/fashionBuy/php/register.php",
			async:true,
			dataType:"json",
			//传入的数据
			data:{
				phone: phone,
				psw: psw
			},
			//请求成功后要执行的操作
			success: function(data){
				//数据补充股份
				if(data.data == "注册成功,请登录!"){
					alert(data.data);
					$(".loginPlate").css("display","block");
					$(".signPlate").css("display","none");
					$(".demo").css("left","22%");
				}else{
					//数据重复
					alert(data.data);
					$(".inflow input").eq(3).val("");
				}
				
			}
		});
	}
}