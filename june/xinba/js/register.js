$(function(){
	$(".register_title").on("click",function(){
		var c = $(this).index();
		$(this).css({"border-bottom-color":"#008DE8","color":"#008DE8",}).siblings().css({"border-bottom-color":"#eeeeee","color":"#999999",});
		$(".register_main").eq(c).show().siblings(".register_main").hide();
	})
    var aid=["Name2","Name","password","password2","repassword","repassword2","tel_name2","tel_name","tel_num2","tel_num","QQ2","QQ","email2","email","collection_name2","open_bank2","bank_num2"]
    var aObj=[];
    for(var i=0;i<aid.length;i++){
        check(aid[i]);
    }
    var sub1=document.getElementById("f_submit");
    var sub2=document.getElementById("f_submit2");
    sub1.onclick=function(){
        for(var i=0;i<aObj.length;i++){
            if(aObj[i].style.borderColor=="red"){
               
                return false;
            }
        }   
    }     
    sub2.onclick=function(){
        for(var i=0;i<aObj.length;i++){
            if(aObj[i].style.borderColor=="red"){
                
                return false;
            }
        }   
    }     
   
    function check(id){
        var obj=document.getElementById(id);
        var re1=/^[a-zA-Z0-9]{4,16}/;//Name
        var re2=/^[a-zA-Z0-9]{6,16}/;//password
        var re3=/^1[34578]\d{9}$/;//tel
        var re4=/^[1-9][0-9]{4,}/;//QQ
        var re5=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;//emal
        var re6=/^[\u4e00-\u9fa5]{2,}$/;//收款人
        var re7=/^[0-9]{4,}/;//收款账号
        aObj.push(obj);
        obj.onblur=function(){
            if(!obj.value){
                this.style.borderColor="red";

            }
            if(id=="Name2" || id=="Name" ){
                if(re1.test(obj.value)){
                    this.style.borderColor="green";
                    this.nextSibling.innerHTML="";
                }else{
                    this.style.borderColor="red";
                    this.nextSibling.innerHTML="长度为4-16位非中文字符"
                }
            }else if(id=="password" || id=="password2"){
                if(re2.test(obj.value)){
                    this.style.borderColor="green";
                    this.nextSibling.innerHTML="";
                }else{
                    this.style.borderColor="red";
                    this.nextSibling.innerHTML="长度为6-16位非中文字符";
                }
            }else if(id=="repassword"){
                if(this.value==document.getElementById("password").value){
                    this.style.borderColor="green";
                    this.nextSibling.innerHTML="";
                }else{
                    this.style.borderColor="red";
                    this.nextSibling.innerHTML="两次密码不一致";
                }
            }else if(id=="repassword2"){
                if(this.value==document.getElementById("password2").value){
                    this.style.borderColor="green";
                    this.nextSibling.innerHTML="";
                }else{
                    this.style.borderColor="red";
                    this.nextSibling.innerHTML="两次密码不一致";
                }
            }else if(id=="tel_name2" || id=="tel_name"){
                if(this.value){
                    this.style.borderColor="green";
                    this.nextSibling.innerHTML="";
                }
            }else if(id=="tel_num2" || id=="tel_num"){
                if(re3.test(obj.value)){
                    this.style.borderColor="green";
                    this.nextSibling.innerHTML="";
                }else{
                    this.style.borderColor="red";
                    this.nextSibling.innerHTML="请输入正确手机号码";
                }
            }else if(id=="QQ2" || id=="QQ"){
                if(re4.test(obj.value)){
                    this.style.borderColor="green";
                    this.nextSibling.innerHTML="";
                }else{
                    this.style.borderColor="red";
                    this.nextSibling.innerHTML="请输入正确QQ号码";
                }
            }else if(id=="email" || id=="email2"){
                if(re5.test(obj.value)){
                    this.style.borderColor="green";
                    this.nextSibling.innerHTML="";
                }else{
                    this.style.borderColor="red";
                    this.nextSibling.innerHTML="请输入正确邮箱";
                }
            }else if(id=="collection_name2"  || id=="open_bank2"){
                if(re6.test(obj.value)){
                    this.style.borderColor="green";
                    this.nextSibling.innerHTML="";
                }else{
                    this.style.borderColor="red";
                    this.nextSibling.innerHTML="请输入2位以上汉字";
                }
            }else if(id=="bank_num2"){
                if(re7.test(obj.value)){
                    this.style.borderColor="green";
                    this.nextSibling.innerHTML="";
                }else{
                    this.style.borderColor="red";
                    this.nextSibling.innerHTML="请输入正确银行卡号";
                }
            }
        }
    }
})

