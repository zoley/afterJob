require.config({
	paths:{
		'jquery':'jquery.min',
		'move':'move.min'
	}
})
require(['jquery','move'],function($,move){
	$(document).ready(function(){
		var W=$(window).width();
		var H=$(window).height();
		//cloud-->go
		if(W>768){
			function cloudGo(){
				move("#head .cloud2").translate(W).ease("linear").duration("60s").end();
				move("#head .cloud1").translate(W).ease("linear").duration("60s").end(function(){
					move("#head .cloud1").translate(-300).duration("0s").end();
					move("#head .cloud2").translate(-300).duration("0s").end();
					setTimeout(cloudGo,1);
				});
			}
			cloudGo();
			function cloudGo2(){
				move("#head .cloud3").translate(-W).ease("linear").duration("60s").end();
				move("#head .cloud4").translate(-W).ease("linear").duration("60s").end(function(){
					move("#head .cloud3").translate(300).duration("0s").end();
					move("#head .cloud4").translate(300).duration("0s").end();
					setTimeout(cloudGo2,1);
				});
			}
			cloudGo2();
		}else{
			function cloudGo(){
				move("#head .cloud2").translate(W).ease("linear").duration("20s").end();
				move("#head .cloud1").translate(W).ease("linear").duration("20s").end(function(){
					move("#head .cloud1").translate(-100).duration("0s").end();
					move("#head .cloud2").translate(-100).duration("0s").end();
					setTimeout(cloudGo,1);
				});
			}
			cloudGo();
		}

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
		show()
		$(document).scroll(function(){
			// document.title=$(window).scrollTop();
			if($(window).scrollTop()>700){
				$("#up").fadeIn();
			}else{
				$("#up").fadeOut();
			}
			//--------------
			if(W>768){
				if($(window).scrollTop()>500){
					$("#introduce .container>h2").css("margin-top","115px");
				}
				if($(window).scrollTop()>1400){
					$("#assist>h2").css("margin-top","85px");
					$("#assist .a-left").css("margin-left","0px");
					$("#assist .a-right").css("margin-right","0px");
				}
				if($(window).scrollTop()>2200){
					$("#choice h3").css({"width":"100%","height":"40px"});
				}
				if($(window).scrollTop()>2400){
					$("#choice>a").css({"margin":"30px auto"});
				}
			}else{
				if($(window).scrollTop()>2200){
					$("#choice h3").css({"width":"80%","height":"60px"});
				}
				if($(window).scrollTop()>2350){
					$("#choice>a").css({"margin":"30px auto"});
				}
			}
		})

		move("#head h1").scale(0.1).duration("0.5s").then().scale(10).duration("1.5s").pop().end();
		move("#head h4").set("margin-top","40px").duration("2s").end();
		$("#up").click(function(){
			$("html,body").animate({"scrollTop":"0"},500,"swing");
		})

	})

})
