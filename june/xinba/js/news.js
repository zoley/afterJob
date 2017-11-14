$(document).ready(function(){
	$("#news .news-tab a").click(function(){
		$("#news .news-tab a").removeClass("active");
		$(this).addClass("active");
	})
})