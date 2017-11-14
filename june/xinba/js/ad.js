$(document).ready(function(){
	//resource
	$("#resource .tab a").mouseover(function(){
		$("#resource .tab a").each(function(){
			$(this).removeClass("active");
		})
		$(this).addClass("active");		
		$("#resource .pic img").each(function(){
			$(this).removeClass("active");
		})
		$("#resource .pic img").eq($(this).index()).addClass("active")
		$("#resource .con .con-text").each(function(){
			$(this).removeClass("active");
		})
		$("#resource .con .con-text").eq($(this).index()).addClass("active");
		
	})
	//banner2
	var oUl=$("#banner2 .bannerTab ul").get(0);
	var aLi=oUl.getElementsByTagName("li");
	oUl.innerHTML+=oUl.innerHTML;
	oUl.style.width=aLi[0].offsetWidth*aLi.length+"px";
	var reduce=-aLi[0].offsetWidth;
	var num=0;
	var onOff=1;
	$("#prev").click(function(){
		moveLeft();
	})
	$("#next").click(function(){
		if(onOff){
			if(num==0){
				num=2
				$("#banner2 .bannerTab ul").css("left",2*reduce+"px");
			}
			num--;
			$("#banner2 .bannerTab ul").animate({"left":reduce*num},700,"swing",function(){
				onOff=1;
			})
			onOff=0;		
		}
	})
	function moveLeft(){
		if(onOff){
			num++;
			if(num==3){
				num=1;
				$("#banner2 .bannerTab ul").css("left","0px");
			}
			$("#banner2 .bannerTab ul").animate({"left":reduce*num},700,"swing",function(){
				onOff=1;
			})
			onOff=0;		
		}
	}
	oUl.timer=setInterval(function(){
		moveLeft();
	},2000)
	$(".frame").hover(function(){
		clearInterval(oUl.timer);
	},function(){
		oUl.timer=setInterval(function(){
			moveLeft();
		},2000)
	})
	

})