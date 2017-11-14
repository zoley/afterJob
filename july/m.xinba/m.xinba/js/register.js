
window.onload=function(){
    var aid=["user","email","tel","qq","password","user2","email2","tel2","qq2","password2"];
    var aObj=[];
    for(var i=0;i<aid.length;i++){
        check(aid[i]);
    }
    var sub=document.getElementById("sub");
    var sub2=document.getElementById("sub2");
    sub.onclick=function(){
        for(var i=0;i<5;i++){
            if(aObj[i].nextSibling.style.display=="block" || aObj[i].value==""){
                return false;
            }
        }   
    } 
    sub2.onclick=function(){
        for(var i=5;i<aObj.length;i++){
            if(aObj[i].nextSibling.style.display=="block" || aObj[i].value==""){
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
        var re5=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;//email
        var re6=/^[\u4e00-\u9fa5]{2,}$/;//收款人
        var re7=/^[0-9]{4,}/;//收款账号
        aObj.push(obj);
        obj.onblur=function(){
            if(id=="user" || id=="user2"){
                if(re1.test(obj.value)){
                    this.nextSibling.style.display="none";
                }else{
                    this.nextSibling.style.display="block";
                    this.nextSibling.innerHTML="长度为4-16位非中文字符"
                }
            }else if(id=="password" || id=="password2"){
                if(re2.test(obj.value)){
                    this.nextSibling.style.display="none";
                }else{
                    this.nextSibling.style.display="block";
                    this.nextSibling.innerHTML="长度为6-16位非中文字符";
                }
            }else if(id=="tel" || id=="tel2"){
                if(re3.test(obj.value)){
                    this.nextSibling.style.display="none";
                }else{
                    this.nextSibling.style.display="block";
                    this.nextSibling.innerHTML="请输入正确手机号码";
                }
            }else if(id=="qq" || id=="qq2"){
                if(re4.test(obj.value)){
                    this.nextSibling.style.display="none";
                }else{
                    this.nextSibling.style.display="block";
                    this.nextSibling.innerHTML="请输入正确QQ号码";
                }
            }else if(id=="email" || id=="email2"){
                if(re5.test(obj.value)){
                    this.nextSibling.style.display="none";
                }else{
                    this.nextSibling.style.display="block";
                    this.nextSibling.innerHTML="请输入正确邮箱";
                }
            }
        }
    }
    var aLabel=document.getElementsByClassName("catagory")[0].getElementsByTagName("label");
    var aForm=document.getElementsByClassName("form");
    for(var i=0;i<aLabel.length;i++){
        aLabel[i].index=i;
        aLabel[i].onclick=function(){
            for(var j=0;j<aLabel.length;j++){
                aLabel[j].classList.remove("active");
                aForm[j].classList.remove("active");
            }
            this.className="active";
            aForm[this.index].className="form active";
        }
    }
}

