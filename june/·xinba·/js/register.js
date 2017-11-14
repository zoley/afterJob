$(function(){
	$(".register_title").on("click",function(){
		var c = $(this).index();
		$(this).css({"border-bottom-color":"#008DE8","color":"#008DE8",}).siblings().css({"border-bottom-color":"#eeeeee","color":"#999999",});
		$(".register_main").eq(c).show().siblings(".register_main").hide();
	})
})
//注册验证
var form1 = document.querySelector('#form1');
var form2 = document.querySelector('#form2');
    form1.addEventListener('invalid',function(event){
        var elem = event.target;
        var vali = elem.validity;
        var name = elem.name;
		var pwd1 = document.getElementById("password1")
		var repwd1 = document.getElementById("repassword1")
		var pwd = document.getElementById("password")
		var repwd = document.getElementById("repassword")

        switch (name){
            case 'Name':
                if(vali.valueMissing){
                    elem.setCustomValidity('用户名不能为空');
                }else if(vali.patternMismatch){
                    elem.setCustomValidity('用户名必须是英文、数字长度为4-16个字符');
                }else{
                    elem.setCustomValidity('');
                }
                break;
            case 'password':
                if(vali.valueMissing){
                    elem.setCustomValidity('密码不能为空');
                }else if(vali.patternMismatch){
                    elem.setCustomValidity('密码必须是英文、数字长度为6-16个字符');
                }else{
                    elem.setCustomValidity('');
                }
                break;
            case 'repassword':
                if(pwd1.value!=repwd1.value){
                    elem.setCustomValidity('两次密码必须一致');
                }else{
                    elem.setCustomValidity('');
                }
                break;
			case 'tel_name':
                if(vali.valueMissing){
                    elem.setCustomValidity('联系人不能为空');
                }else{
                    elem.setCustomValidity('');
                }
                break;
			case 'tel_num':
                if(vali.valueMissing){
                    elem.setCustomValidity('号码不能为空');
                }else if(vali.typeMismatch){
                    elem.setCustomValidity('号码的格式不正确，请重新输入');
                }else{
                    elem.setCustomValidity('');
                }
                break;  
			case 'tel_num':
                if(vali.valueMissing){
                    elem.setCustomValidity('QQ不能为空');
                }else if(vali.typeMismatch){
                    elem.setCustomValidity('QQ号码的格式不正确，请重新输入');
                }else{
                    elem.setCustomValidity('');
                }
                break;                
			case 'email':
                if(vali.valueMissing){
                    elem.setCustomValidity('邮箱不能为空');
                }else if(vali.typeMismatch){
                    elem.setCustomValidity('邮箱的格式不正确，请重新输入');
                }else{
                    elem.setCustomValidity('');
                }
                break;


        }
    },true)
    form2.addEventListener('invalid',function(event){
        var elem = event.target;
        var vali = elem.validity;
        var name = elem.name;
		var pwd = document.getElementById("password")
		var repwd = document.getElementById("repassword")

        switch (name){
            case 'Name':
                if(vali.valueMissing){
                    elem.setCustomValidity('用户名不能为空');
                }else if(vali.patternMismatch){
                    elem.setCustomValidity('用户名必须是英文、数字长度为4-16个字符');
                }else{
                    elem.setCustomValidity('');
                }
                break;
            case 'password':
                if(vali.valueMissing){
                    elem.setCustomValidity('密码不能为空');
                }else if(vali.patternMismatch){
                    elem.setCustomValidity('密码必须是英文、数字长度为6-16个字符');
                }else{
                    elem.setCustomValidity('');
                }
                break;
            case 'repassword':
                if(pwd.value!=repwd.value){
                    elem.setCustomValidity('两次密码必须一致');
                }else{
                    elem.setCustomValidity('');
                }
                break;
			case 'tel_name':
                if(vali.valueMissing){
                    elem.setCustomValidity('联系人不能为空');
                }else{
                    elem.setCustomValidity('');
                }
                break;
			case 'tel_num':
                if(vali.valueMissing){
                    elem.setCustomValidity('号码不能为空');
                }else if(vali.typeMismatch){
                    elem.setCustomValidity('号码的格式不正确，请重新输入');
                }else{
                    elem.setCustomValidity('');
                }
                break;  
			case 'tel_num':
                if(vali.valueMissing){
                    elem.setCustomValidity('QQ不能为空');
                }else if(vali.typeMismatch){
                    elem.setCustomValidity('QQ号码的格式不正确，请重新输入');
                }else{
                    elem.setCustomValidity('');
                }
                break;                
			case 'email':
                if(vali.valueMissing){
                    elem.setCustomValidity('邮箱不能为空');
                }else if(vali.typeMismatch){
                    elem.setCustomValidity('邮箱的格式不正确，请重新输入');
                }else{
                    elem.setCustomValidity('');
                }
                break;
			case 'collection_name':
                if(vali.valueMissing){
                    elem.setCustomValidity('收款人不能为空');
                }else if(vali.typeMismatch){
                    elem.setCustomValidity('收款人的格式不正确，请重新输入');
                }else{
                    elem.setCustomValidity('');
                }
                break;
			case 'open_bank':
                if(vali.valueMissing){
                    elem.setCustomValidity('开户行不能为空');
                }else if(vali.typeMismatch){
                    elem.setCustomValidity('格式不正确，请重新输入');
                }else{
                    elem.setCustomValidity('');
                }
                break;
			case 'bank_num':
                if(vali.valueMissing){
                    elem.setCustomValidity('收款账号不能为空');
                }else if(vali.typeMismatch){
                    elem.setCustomValidity('格式不正确，请重新输入');
                }else{
                    elem.setCustomValidity('');
                }
                break;

        }
    },true)