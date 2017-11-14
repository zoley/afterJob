require.config({
	baseUrl:'js',
	paths:{
		'jquery':'jquery.min',
		'fullpage':'fullpage.min',
		'move':'move.min'
	},
	shim:{
		'fullpage':{
			deps:['jquery'],
			exports:'fullpage'
		}		
	}
})
require(['jquery','fullpage','move'],function($,fullpage,move){
	$(document).ready(function(){
		var W=$(window).width();
		//cloud-->go
		function cloudGo(){
			move("#head .cloud2").translate(100).ease("linear").duration("6s").end();
			move("#head .cloud1").translate(100).ease("linear").duration("6s").end(function(){
				move("#head .cloud1").translate(-100).duration("6s").end();
				move("#head .cloud2").translate(-100).duration("6s").end(function(){
					setTimeout(cloudGo,1);
				});
			});
		}
		function cloudGo2(){
			move("#head .cloud3").translate(-100).ease("linear").duration("6s").end();
			move("#head .cloud4").translate(-100).ease("linear").duration("6s").end(function(){
				move("#head .cloud3").translate(100).duration("6s").end();
				move("#head .cloud4").translate(100).duration("6s").end(function(){
					setTimeout(cloudGo2,1);
				});
			});
		}
		if(W>768){
			cloudGo();
			cloudGo2();
		}else{
			cloudGo2();
		}
		//nav
		$(".menu li").each(function(index){
			if(index<5){
				var uw=$(".menu .underline").width();
				var ul=$(".menu .underline").position().left;
				$(this).hover(function(){
					$(".menu .underline").css({"width":$(this).width(),"left":$(this).position().left+20});
				},function(){
					$(".menu .underline").css({"width":uw,"left":ul});
				})
			}
		})
		function show(){
			$("#assist .art2").animate({"opacity":1},300,"linear",function(){
				$("#assist .art3").animate({"opacity":1},300,"linear",function(){
					$("#assist .art4").animate({"opacity":1},300,"linear",function(){
						$("#assist .art5").animate({"opacity":1},300,"linear",function(){
							$("#assist .art6").animate({"opacity":1},300,"linear",function(){
								$("#assist .art6").animate({"opacity":0},300,"linear",function(){
									$("#assist .art5").animate({"opacity":0},300,"linear",function(){
										$("#assist .art4").animate({"opacity":0},300,"linear",function(){
											$("#assist .art3").animate({"opacity":0},300,"linear",function(){
												$("#assist .art2").animate({"opacity":0},300,"linear",function(){
													show();
												})
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
		show();
		if(W>768){
			$("#main").fullpage({
				verticalCentered:false,
				css3:true,
				scrollingSpeed:600,
				navigation:false,
				afterLoad:function(links,index){
					switch(index){
						case 1:
							move("#head h1").scale(0.1).duration("0.5s").then().scale(10).duration("1.5s").pop().end();
							$("#head h4").css({"margin-top":"40px","transition":"2s all ease-in-out"});	
							break;
						case 2:
							$("#introduce .container>h2").css({"margin-top":"118px","transition":"1.5s all linear"});
							break;
						case 3:
							$("#assist>h2").css({"margin-top":"118px","transition":"1.5s all linear"});
							$("#assist .a-left").css({"margin-left":"0px","transition":"2s all ease-in-out"});
							$("#assist .a-right").css({"margin-right":"0px","transition":"2s all ease-in-out"});
							// move("#assist>h2").set("margin-top","118px").duration("1.5s").end();
							// move("#assist .a-left").set("margin-left","0px").duration("1.5s").end();
							// move("#assist .a-right").set("margin-right","0px").duration("1.5s").end();
							break;
						case 4:
							$("#choice h3").css({"width":"100%","height":"40px","transition":"2s all ease-in-out"});
							$("#choice>a").css({"margin":"30px auto","transition":"2s all ease-in-out"});
							break;
						case 5:
							break;
					}
				}
				// onLeave(links,index){
				// 	switch(index){
				// 		case 1:
				// 			$("#head h4").css({"margin-top":"500px","transition":"0.01s all"});
				// 			break;
				// 		case 2:
				// 			$("#introduce .container>h2").css({"margin-top":"805px","transition":"0.01s all"});
				// 			break;
				// 		case 3:
				// 			$("#assist>h2").css({"margin-top":"505px","transition":"0.01s all"});
				// 			$("#assist .a-left").css({"margin-left":"-800px","transition":"0.01s all"});
				// 			$("#assist .a-right").css({"margin-right":"-600px","transition":"0.01s all"});
				// 			// move("#assist>h2").set("margin-top","505px").duration("0.01s").end();
				// 			// move("#assist .a-left").set("margin-left","-800px").duration("0.01s").end();
				// 			// move("#assist .a-right").set("margin-right","-600px").duration("0.01s").end();
				// 			break;
				// 		case 4:
				// 			$("#choice h3").css({"width":"0","height":"0","transition":"0.01s all"});
				// 			$("#choice>a").css({"margin":"400px auto","transition":"0.01s all"});
				// 			break;
				// 		case 5:
				// 			break;
				// 	}
				// }
			})
		}else{
			move("#head h1").scale(0.1).duration("0.5s").then().scale(10).duration("1.5s").pop().end();
			$("#head h4").css({"margin-top":"40px","transition":"2s all ease-in-out"});	
			$(document).scroll(function(){
				if($(window).scrollTop()>2200){
					$("#choice h3").css({"width":"80%","height":"60px","transition":"1.5s all ease-in-out"});
					$("#choice>a").css({"margin":"30px auto","transition":"1.5s all ease-in-out"});
				}
			})
		}
		// if(W <768){
		// 	$.fn.fullpage.setAutoScrolling(false);
		// } else {
		// 	$.fn.fullpage.setAutoScrolling(true);		
		// }

	})



})
