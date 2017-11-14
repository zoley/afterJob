$(document).ready(function(){
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

$(".choose .date").on('click', function(option) {
	$(".box").show()         
	 
});

$(".box .cancel").on('click', function(e) {
		e.stopPropagation();
		$(".box").hide();

});

  $('#report').on('change', function(option) {
        var v = $(this).val();
        var url="/index.php?e=aff/report.get_list&timerange=2017-5-31_2017-06-29&type="+v;
		location.href = url;
    });
  
var aRa=$("#report-choose a");
if(aRa){
	aRa.click(function(){
		aRa.removeClass("active");
		$(this).addClass("active");
	})
}   

var chart=new Highcharts.Chart("container",{
		// $("#container").highcharts({//需要引入jQuery
			chart:{
				type:"column"
			},
			title: {
				text: '不同城市的月平均气温',
				x: -20,
				y:20,
				style:{
					fontSize:"30px",
					color:"#f40",
				}
			},
			subtitle: {
				text: '数据来源: WorldClimate.com',
				x: -20,
			},
			xAxis: {
				categories: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
			},
			yAxis: {
				title: {
					text: '温度 (°C)'
				}
			},
			tooltip: {
				valueSuffix: '°C'
			},
			legend: {
				layout: 'vertical',
				align: 'right',
				verticalAlign: 'top',
				borderWidth: 1
			},
			series: [{
				name: '东京',
				// colorByPoint:true,//多个颜色
				data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
			}, {
				name: '纽约',
				data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
			}, {
				name: '柏林',
				data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
			}, {
				name: '伦敦',
				data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
			}],
			credits:{enabled:false}
		})
		// var title={
		// 	text:"哈哈哈哈哈哈哈哈哈",
		// 	style:{
		// 		color:"#946"
		// 	}
		// }
		// chart.setTitle(title)



})
