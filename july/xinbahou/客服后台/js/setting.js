//	修改表单
$("#change_form").on("click",function(){
	$(".changeable").removeAttr("readonly").css({"border-color":"black","box-shadow":"0 0 1px gray"});
	for(i=0;i<5;i++){
		var c = $(".changeable").eq(i).attr("value");
		$(".changeable").eq(i).attr("placeholder",""+c+"");
	}
	$("#submit").css("backgroundColor","#3981E0");
})
//修改密码
$(".change_pwd").on("click",function(){
	$("#s_password").toggle();
})
//密码验证
$('#s_password button').on('click', function(option) {
     var oldpassword =   $('#oldpassword').val();
	  var password =   $('#password').val();
	  var password_confirm =   $('#password_confirm').val();
	  if(oldpassword=='' || password=='' || password_confirm==''){
	  		alert("三项必填,请重新输入");
			return false;
	  }
	  if(password!=password_confirm){
	  		alert("两次输入的密码不一样,请重新输入");
			return false;
	  }
	   $.post("/index.php?e=aff/account.edit_password", { oldpassword:oldpassword,password:password,password_confirm:password_confirm},
			function (data, textStatus){
				if(data){
					if(data=='err_pw'){
						alert("原始密码不能认证，无法修改")
					}
					if(data=='err_re'){
						alert("两次输入的密码不一样,请重新输入");
					}
					if(data=='ok'){
						 $('#s_password').hide();
						 $('.alert-info').show();
					}
				}
	 }, "text")}); 