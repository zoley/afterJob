$(document).ready(function(){
	// $(window).resize(function(){
	// 	window.location.reload();
	// })
	//nav-ul
	// $("#nav-ul li").click(function(){
	// 	$("#nav-ul li").removeClass("active");
	// 	$(this).addClass("active");
	// })
	//
	//advantage
	var arr=["#FF2626","#8500B2","#00B285"];
	$("#advantage li").each(function(){
		$(this).hover(function(){
			$(this).css("border-color",arr[$(this).index()%arr.length]);
			$(this).find("h3").css("transform","rotate(360deg)");
		},function(){
			$(this).css("border-color","#777");
			$(this).find("h3").css("transform","rotate(-360deg)");
		})
	})
	//style
	var oBig=$("#style .style-text .big").get(0);
	var Bli=oBig.getElementsByTagName("li");
	oBig.innerHTML+=oBig.innerHTML;
	oBig.style.width=Bli.length*100+"%";
	for(var i=0;i<Bli.length;i++){
		Bli[i].style.width=1/Bli.length*100+"%";
	}
	var dis=-Bli[0].offsetWidth;
	var now=0;
	var isOn=1;
	$("#style .style-text .small li").mouseover(function(){
		now=$(this).index();
		$("#style .style-text .big").animate({"left":dis*now},300,"linear",function(){
			isOn=1;
		})
		$("#style .style-text .small li").removeClass("active");
		$("#style .style-text .tab a").removeClass("active");
		$(this).addClass("active");
		$("#style .style-text .tab a").eq(now).addClass("active");
		isOn=0;
	})	
	$("#style .style-text .tab a").mouseover(function(){
		now=$(this).index();
		$("#style .style-text .big").animate({"left":dis*now},300,"linear",function(){
			isOn=1;
		})
		$("#style .style-text .small li").removeClass("active");
		$("#style .style-text .tab a").removeClass("active");
		$(this).addClass("active");
		$("#style .style-text .small li").eq(now).addClass("active");
		isOn=0;
	})
	$("#style .style-text .lunbo").hover(function(){
		clearInterval(oBig.timer);
	},function(){
		oBig.timer=setInterval(function(){
			moveLeft2();
		},3000)
	})
	oBig.timer=setInterval(function(){
		moveLeft2();
	},3000)	
	function moveLeft2(){
		if(isOn){
			now++;
			if(now==6){
				now=1;
				$("#style .style-text .big").css("left","0px");
			}
			$("#style .style-text .big").animate({"left":dis*now},300,"linear",function(){
				isOn=1;
			})
			isOn=0;
			$("#style .style-text .small li").removeClass("active");
			$("#style .style-text .tab a").removeClass("active");
			$("#style .style-text .tab a").eq(now%5).addClass("active");
			$("#style .style-text .small li").eq(now%5).addClass("active");	
		}
	}

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