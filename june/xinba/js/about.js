$(function(){
	$("#nav_ab ul li").on("click",function(){
		var c=$(this).index();
		$(this).addClass("change").siblings("li").removeClass("change");
		$(".main_ab ul li").eq(c).css("display","block").siblings("li").css("display","none");
	})
	function map(){
		//contact_map
	    var y=117.2267634360;
	    var x=34.2475122144;
	    var map=new BMap.Map("contact_map");
	    var pp=new BMap.Point(y,x);
	    map.centerAndZoom(pp,14);
	    map.enableScrollWheelZoom();
	    var marker1=new BMap.Marker(pp);
	    map.addOverlay(marker1);
	}
	$("#s-map").on("click",function(){
		map();
	})
})
