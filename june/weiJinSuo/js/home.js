$(function(){
	function resize(){
		var wid=$(window).width();
		var isSmallScreen=wid<768;
		$("#banner .carousel-inner .item").each(function(i,item){
			var $item=$(item)
			var src=isSmallScreen?$item.data('src-sm'):$item.data('src-lg');
			$item.css("background","url("+src+") no-repeat center center");
			if(isSmallScreen){
				$item.html("<img src='"+src+"'>");
			}else{
				$item.empty();
			}
		})
	}
	$(window).resize(resize).trigger("resize");
})
