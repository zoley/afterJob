window.onload=function(){
	var Con=document.getElementById("content");
	var h=document.documentElement.clientHeight;
	if(Con.offsetHeight>h){
		main.style.height=Con.offsetHeight+56+"px";
	}
	//news---
	var newsTable=document.getElementById("news-table");
	if(newsTable){
		if(newsTable.offsetHeight<h-165){
			newsTable.style.height=h-169+"px";
		}
	}
	var newsTable1=document.getElementById("news-table1");
	if(newsTable1){
		if(newsTable1.offsetHeight<h-215){
			newsTable1.style.height=h-240+"px";
		}
	}
	setInterval(function(){
        var Con=document.getElementById("content");
        var h=document.documentElement.clientHeight;
        if(Con.offsetHeight+56>h){
            main.style.height=Con.offsetHeight+56+"px";
        }
    },100)
    var photoChange=document.getElementById("change-photo");
    var photo=document.getElementById("photo");
    var aLi=photoChange.getElementsByTagName("li");
    var photoCancel=document.getElementById("photo-cancel");
    var photoBtn=document.getElementById("photo-btn");
    photoCancel.onclick=function(){
    	photoChange.style.display="none";
    }
    photo.onclick=function(){
    	photoChange.style.display="block";
    }
    var now=0;
    for (var i =0;i<aLi.length;i++){
    	aLi[i].index=i;
    	aLi[i].onclick=function(){
    		for (var i =0;i<aLi.length;i++){
    			aLi[i].classList.remove("active");
    		}
    		this.classList.add("active");
    		now=this.index;
    	}
    }
    photoBtn.onclick=function(){
    	photo.src=aLi[now].children[0].src;
    	photoChange.style.display="none";
		var xhr=new XMLHttpRequest();
		// xhr.open("get","1php1.php?user=nishishabo&pass=123&"+new Date().getTime(),true);
		// xhr.send(null);
		xhr.open("post","1111",true);
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		xhr.send("src="+aLi[now].children[0].src);
		xhr.onreadystatechange=function(){
			if(xhr.readyState==4){
				if(xhr.status==200){
					console.log(xhr.responseText)
				}else{
					console.log("wrong"+xhr.status)
				}
			}
		}

    }


    /////
    // 温馨提示//
    /////
    $(".ts-close").click(function(){
    	if($("#ts-nomore").is(":checked")){
    		$.ajax({
    			type:"post",
    			data:{},
    			url:"",
    			success:function(){}
    		})
    	}else{
    		// alert(2)
    	}
    	$("#ts-mask").css("display","none");
    })
    // setTimeout(function(){
    // 	$("#ts-mask").css("display","block");
    // },2000)
    
}
