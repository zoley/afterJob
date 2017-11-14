//jquery
$(document).ready(function(){
	// 首页 两个h
	move("#welcome h1").set("margin-top","0px").duration("2s").end();
	move(".photo").scale(0.1).duration("0.5s").then().scale(10).duration("1.5s").pop().end();
	// nav
	$(".logo div").hover(function(){
		$(this).find("p:eq(0)").html("F2E");
		$(this).find("p:eq(1)").html("个人简历");
	},function(){
		$(this).find("p:eq(0)").html("resume");
		$(this).find("p:eq(1)").html("前端工程师");
	})
	var menuOff=true;
	$(".menu").click(function(){
		if(menuOff){
			$("#nav ul").slideDown(300);
		}else{
			$("#nav ul").slideUp(300);
		}
		menuOff=!menuOff;
	})
	document.addEventListener("touchstart",function(e){
		var scrollTop=document.documentElement.scrollTop || document.body.scrollTop;
		var H=document.documentElement.clientHeight;
		var h=$("#nav ul").height()+$("#nav").height();
		if(scrollTop>=H){
			if(!menuOff){
				var hY=e.touches[0].clientY;
				if(hY>h){
					$("#nav ul").slideUp(300);
					menuOff=!menuOff;
				}
			}
		}
	})
	$("#nav ul li:gt(2)").click(function(){
		alert("正在拼命建设中...请稍候");
	})
	//小星星
	var W=document.documentElement.clientWidth;
	if(W<=768){
		// new CanvasStar().init({
		// 	initStarNum:50
		// });	
	}else{
		new CanvasStar().init({
			initStarNum:150
		});	
	}
	//demo
	$(".demos .kkwrap").hover(function(){
		$(this).find("a").removeClass("hidden");
		$(this).find("a p").animate({"width":"100%","height":"40px"},500,"linear")
	},function(){
		$(this).find("a").addClass("hidden");
		$(this).find("a p").animate({"width":"0%","height":"0px"},100,"linear")
	})
	//experience
	$(".handPiano .exp").on("click",function(){
		$(".handPiano .exp").css("width","0%");
		$(this).css("width","72%");
	})
	//audio
	var onOff=false;
	$("#au i").on("click",function(){
		if(onOff){
			play();	
		}else{
			$("#audio").get(0).pause();
			$(this).css("background","url(img/au1.png)");
			$(this).next().css("background","url(img/au3.png) no-repeat center center");				
		}
		onOff=!onOff;
	})
	function play(){
		$("#audio").get(0).play();
		$("#au i").css("background","url(img/au2.png)");
		$("#au i").next().css("background","url(img/au4.gif) no-repeat center center");
	}
	play();
	$("#welcome ul li").eq(0).show();
	if(W>768){
		//首页背景
		var bgImgNum=0;
		setInterval(function(){
			bgImgNum++;
			$("#welcome ul li").eq(bgImgNum%4).fadeIn().siblings().hide();
		},5000)
	}
		//滚动特效
	var once=1;
	window.onscroll=function(){
		var scrollTop=document.documentElement.scrollTop || document.body.scrollTop;
		// document.title=scrollTop
		var H=document.documentElement.clientHeight;
		if(scrollTop>=H-50){
			$(".info").css("display","block");
			$("#nav").css({"position":"fixed","left":"0px","top":"0px","zIndex":"100"});
		}else{
			$("#nav").css({"position":"relative"});
			$(".info").css("display","none");
		}
		if(W>768){
			if(scrollTop>H-200){
				move(".aboutMe>p").set("width","200px").duration("0.7s").then().set("height","50px").ease("in").duration("0.4s").pop().end();
				$(".said").fadeIn(450,function(){
					$(this).next().fadeIn(450,function(){
						$(this).next().fadeIn(450,function(){		
							$(this).next().fadeIn(450);
						})	
					})
				})
			}
			if(scrollTop>2*H-400){
				move(".skill>p").set("width","200px").duration("1s").then().set("height","50px").ease("in").duration("0.5s").pop().end();
				move(".skill>h4").set("width","100%").duration("1s").end();
				move(".list1").rotate(360).duration("0.5s").end(function(){
					move(".list2").rotate(360).duration("0.5s").end(function(){
						move(".list3").rotate(360).duration("0.5s").end(function(){
							move(".list4").rotate(360).duration("0.5s").end(function(){
								move(".list5").rotate(360).duration("0.5s").end(function(){
									move(".list6").rotate(360).duration("0.5s").end();
								});
							})
						})
					})
				})
			}
			if(scrollTop>3*H-600){
				move(".demo>p").set("width","200px").duration("1s").then().set("height","50px").ease("in").duration("0.5s").pop().end();
				$(".demos .kkwrap:eq(0)").slideDown(500,function(){
					$(".demos .kkwrap:eq(1)").slideDown(500,function(){
						$(".demos .kkwrap:eq(2)").slideDown(500,function(){
							$(".demos .kkwrap:eq(3)").slideDown(500,function(){
								$(".demos .kkwrap:eq(4)").slideDown(500,function(){
									$(".demos .kkwrap:eq(5)").slideDown(500,function(){
										$(".demos .kkwrap:eq(6)").slideDown(500,function(){
											$(".demos .kkwrap:eq(7)").slideDown(500,function(){
												$(".demos .kkwrap:eq(8)").slideDown(500,function(){
													$(".demos .kkwrap:eq(9)").slideDown(500,function(){
														$(".demos .kkwrap:eq(10)").slideDown(500,function(){
															$(".demos .kkwrap:eq(11)").slideDown(500);
														});
													});
												})
											})
										})
									})
								})
							})
						})
					})
				})
			}
			if(scrollTop>4*H-400){
				move(".experience>p").set("width","200px").duration("1s").then().set("height","50px").ease("in").duration("0.5s").pop().end();
				if(once==1){
					move(".handPiano .three").set("width","0").end(function(){
						move(".handPiano .two").set("width","72%").end(function(){
							move(".handPiano .two").set("width","0").end(function(){
								move(".handPiano .one").set("width","72%").end(function(){
									move(".handPiano .three").set("width","72%").end();
									move(".handPiano .two").set("width","0").end();
									move(".handPiano .one").set("width","0").end();
								})
							})
						})
					})
					once=0;
				}
			}
			if(scrollTop>5*H-600){
				move(".contact>p").set("width","200px").duration("1s").then().set("height","50px").ease("in").duration("0.5s").pop().end();
				move(".declare p").rotate(720).end();
				$(".said2").fadeIn(600,function(){
					$(this).next().fadeIn(600,function(){
						$(this).next().fadeIn(600,function(){		
							$(this).next().fadeIn(600);
						})	
					})
				})
			}
		}
	}

	
	$(document).bind("contextmenu",function(e){return false;});
	$(document).bind("keydown",function(e){e=window.event||e; if(e.keyCode==123){e.keyCode = 0;return  false;} }); 
	console.log("欢迎光临我的个人小站！有任何问题可以给我发邮件哦，地址上面有~~~");

})