$(document).ready(function(){
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
})