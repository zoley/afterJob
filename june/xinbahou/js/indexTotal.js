$(".menubutton").on('click', function(option) { 
     
	 var d = $(this).attr("data_href");
	 location.href = '/index.php?e=aff/report.get_list&type=all&id=&timerange=' + d;
	 
});

$(".staendbutton").on('click', function(option) {  
	 var sta = $("#sta").val();
	 var end = $("#end").val();
	 if( (sta && !end) ||(!sta && end) ){
		 alert("开始时间和结束时间不能为空");
		 
	 }else{
	 	var d = sta+'_'+end;
	 	location.href = '/index.php?e=aff/report.get_list&type=all&id=&timerange=' + d;
	 }
	
	 
});

$(".report_menu").on('click', function(option) {
	$(".report_menu_html").show();           
    var offset = $(this).offset();
    $('.report_menu_html').css('left',offset.left - 175+ 'px').css('top',offset.top+15+ 'px');
	 
});

$(".down > a").on('click', function(option) {
	$(".report_menu_html").hide(); 
	 
});

$("#fold_close").click(function(){
	var o = $('#container'); 
	if(o.css("display")=='none'){
		o.show(); 
	    $(this).css("backgroundImage","url(/templates/main/images/fold_t.jpg)");
		var v ='show';
		highcharts();
	}else {
		o.hide();
	    $(this).css("backgroundImage","url(/templates/main/images/fold_m.jpg)");
		var v ='hide';
	}
	$.get("/index.php?e=aff/report.highcharts&v="+v);
});


 
  $('input:radio[name="report_view_type"]').on('click', function(option) {
        var v = $(this).val();
        var url="/index.php?e=aff/report.get_list&timerange=2017-5-31_2017-06-29&type="+v;
		location.href = url;
    });
   
   $('.search').on('click', function(option) {
        var v = $("#searchval").val();
		var s = $("#searchtime").val();
		 
        var url="/index.php?e=aff/report.get_list&type=all&id="+v+'&timerange='+s;
		location.href = url;
    });
	
	$('.defaul_report').on('click', function(option) {  
        var url="/index.php?e=aff/report.set_defaul_report&type=all";
		$.get(url);
		alert("设置成功");
    });