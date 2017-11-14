document.onkeydown=function(e){ 
	e=e||window.event;
	if(e.keyCode==13){ 
		Postis();
		return false;
	} 
}
$(document).ready(function() {
	$("#submit").click(function(){ 
		Postis();
		return false;
	});
});
var html;
function Postis(){
	var username = $("#username").val();
	var password = $("#password").val();
	var checkcode = $("#logincode").val();
	if(username.length=='0'){
		html = '请输入用户名！';
		$('#text').html(html);
		return false;
	}
	else if(password.length=='0'){
		html = '请输入密码！';
		$('#text').html(html);
		return false;
	}
	else if(checkcode ==''){
		html = '验证码不能为空！';
		$('#text').html(html);
		return false;

	}  
	$('#text').html("正在登录......");


	$.ajax({  
		type:"post",  
		url:"/mc/admin/login.post",  
		data:{ username: username, password: password,checkcode: checkcode },
		dataType:"json",  
		success: function (data) {  
			if(data.err == ''){
				var html ="登入中...";
				top.location.href=data.url;
			}
			else if(data.err == 'login_err'){
				var html = "登录用户名或密码错误，请重新输入！";
			}
			else if(data.err == 'login_lock'){
				var html = "无法登录，用户已被锁定！";
			}
			else if(data.err == 'checkcode')
			{
				var html = "您输入的验证码错误，请重新输入！";
			}
			else {
				var html = "出现系统错误，无法登陆！";
			}		 
			$('#text').html(html);
		}  
	});  
	

}
