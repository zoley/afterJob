$(document).ready(function(){
	//resource
	$("#resource li").hover(function(){
		$(this).find("div").css({"transform":"rotate(720deg)"});
	},function(){
		$(this).find("div").css("transform","rotate(0deg)");
	})
})