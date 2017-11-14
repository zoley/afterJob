$(function(){
	$("#nav_ab ul li").on("click",function(){
		var c=$(this).index();
		$(this).css({"background-color": "#008DE8","color": "white",}).siblings("li").css({"background-color": "white","color": "gray",});
		$(".main_ab ul li").eq(c).css("display","block").siblings("li").css("display","none");
	})
})
