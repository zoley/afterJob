
$(function(){
	var onOff=true;
	$("#show-menu").on("touchend",function(){
		if(onOff){
			$("#side").slideDown(300);
		}else{
			$("#side").slideUp(300);
		}
		onOff=!onOff;			
	})
	var h=$("#side").height()+$("#head").height();
	document.addEventListener("touchstart",function(e){
		if(!onOff){
			var hY=e.touches[0].clientY;
			if(hY>h){
				$("#side").slideUp(300);
				onOff=!onOff;
			}
		}
	})

//index--一键复制
	if($("#z-copy")){
		$("#z-copy").on("click",function(){
			var Url1=document.getElementById("copytext");
			Url1.select(); // 选择对象
			document.execCommand("Copy"); // 执行浏览器复制命令
		})
	}

//审核--锁定
	if($(".z-del")){
		$(".z-del").on("touchend",function(){
			$(this).parentsUntil("tbody").remove();
		})
	}
	if($(".z-review")){
		$(".z-review").on("touchend",function(){
			$(this).parentsUntil("tbody").remove();
		})
	}	
	if($(".zz-review")){
		$(".zz-review").on("touchend",function(){
			$(".con_del1").show();
			$(".con_del3").show();
			c=$(this);
		})
		$(".bnt51a35").on("click",function(){
			$(".con_del1").hide();
			$(".con_del3").hide();
			c.parent().next().find("tbody").remove();
		});
		$(".modal_close,.rowbnt").on("click",function(){
			$(".con_del1").hide();
			$(".con_del3").hide();
		});		
	}

	//  锁定不删除
	if($(".z-dell")){
		$(".z-dell").on("touchend",function(){
			if($(this).hasClass("red")){
				$(this).removeClass("red");
				$(this).html("未锁定");
			}else{
				$(this).addClass("red");
				$(this).html("已锁定");
			}
			
		})
	}	
	//choose
	if($(".choose")){
		$(".choose a").on("touchend",function(){
			$(".choose a").removeClass("active");
			$(this).addClass("active");
		})
	}

})





