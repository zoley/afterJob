
$(function(){
	var onOff=true;
	$("#show-menu").on("touchend",function(){
		if(onOff){
			$("#side").slideDown(300);
		}else{
			$("#side").slideUp(300);
		}
		onOff=!onOff;			
	})
	var h=$("#side").height()+$("#head").height();
	document.addEventListener("touchstart",function(e){
		if(!onOff){
			var hY=e.touches[0].clientY;
			if(hY>h){
				$("#side").slideUp(300);
				onOff=!onOff;
			}
		}
	})
	var W=document.documentElement.clientWidth;

//index--一键复制
	if($("#z-copy")){
		$("#z-copy").on("click",function(){
			var Url1=document.getElementById("copytext");
			Url1.select(); // 选择对象
			document.execCommand("Copy"); // 执行浏览器复制命令
		})
	}
//develop--p 显示问题
	if($(".develop")){
		if($(".develop p").width()<320){
			$(".develop p:nth-of-type(1) span").html("");
		}
	}
	
//审核--锁定
	if($(".z-del")){
		$(".z-del").on("touchend",function(){
			$(this).parentsUntil("tbody").remove();
		})
	}
	if($(".z-review")){
		$(".z-review").on("touchend",function(){
			$(this).parentsUntil("tbody").remove();
		})
	}	
	if($(".zz-review")){
		$(".zz-review").on("touchend",function(){
			$(".con_del1").show();
			$(".con_del3").show();
			c=$(this);
		})
		$(".bnt51a35").on("click",function(){
			$(".con_del1").hide();
			$(".con_del3").hide();
			c.parent().next().find("tbody").remove();
		});
		$(".modal_close,.rowbnt").on("click",function(){
			$(".con_del1").hide();
			$(".con_del3").hide();
		});		
	}

	//  锁定不删除
	if($(".z-dell")){
		$(".z-dell").on("touchend",function(){
			if($(this).hasClass("red")){
				$(this).removeClass("red");
				$(this).html("未锁定");
			}else{
				$(this).addClass("red");
				$(this).html("已锁定");
			}
			
		})
	}	
	//choose
	if($(".choose")){
		$(".choose a").on("touchend",function(){
			$(".choose a").removeClass("active");
			$(this).addClass("active");
		})
	}
	//---highcharts
	if(document.getElementById("container")){
		var chart=new Highcharts.Chart("container",{
		// $("#container").highcharts({//需要引入jQuery
			chart:{
				type:"line"
			},
			title: {
				text: '',
				x: -20,
				y:40,
				style:{
					fontSize:"1rem",
					color:"#f40",
				}
			},
			subtitle: {
				text: '',
				x: -20,
			},
			xAxis: {
				categories: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
			},
			yAxis: {
				title: {
					text: ''
				}
			},
			tooltip: {
				valueSuffix: '°C'
			},
			legend: {
				layout: 'vertical',
				align: 'right',
				verticalAlign: 'top',
				borderWidth: 1,
				enabled:false
			},
			series: [{
				name: '东京',
				// colorByPoint:true,//多个颜色
				data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
			}, {
				name: '纽约',
				data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
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
	}


//获取代码--删除
	if(document.getElementsByClassName("delete")){
		$(".delete").on("touchend",function(){
			$(".con_del1").show();
			$(".con_del2").show();
			c=$(this);
		})
		$(".bnt51a35").on("touchend",function(){
			$(".con_del1").hide();
			$(".con_del2").hide();
			c.parentsUntil("tbody").remove();
		});
		$(".modal_close,.rowbnt").on("click",function(){
			$(".con_del1").hide();
			$(".con_del2").hide();
		});	
	}
	if(document.getElementsByClassName("getcode")){
		$(".getcode").on("touchend",function(){
			$(".con_del1").show();
			$(".con_del3").show();
			c=$(this);
		})
		$(".modal_close,.rowbnt").on("click",function(){
			$(".con_del1").hide();
			$(".con_del3").hide();
		});	
		$('#getcode').on('click', function(option) {  
			var Url1=document.getElementById("log_text");
				Url1.select(); // 选择对象
				document.execCommand("Copy"); // 执行浏览器复制命令
				$("._ok1").css("display","inline-block");
			});

		$('#getjscode').on('click', function(option) {  
			var Url2=document.getElementById("log_js_text");
				Url2.select(); // 选择对象
				document.execCommand("Copy"); // 执行浏览器复制命令
				$("._ok2").css("display","inline-block");
			});	
	}

	if(document.getElementsByClassName("con-con")){
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

		$(".date").on('click', function(option) {
			$(".box").show()         

		});

		$(".box .cancel").on('click', function(e) {
			e.stopPropagation();
			$(".box").hide();

		});

		$('.chooose input').on('click', function(option) {
			var v = $(this).val();
			var url="/index.php?e=aff/report.get_list&timerange=2017-5-31_2017-06-29&type="+v;
			location.href = url;
		}); 
	}
	//一键提交---广告管理
	if(document.getElementsByClassName("zz-revieww")){
		$(".zz-revieww").on("touchend",function(){
			$("tbody tr:nth-of-type(2n) form div:nth-of-type(2)").html($("tbody tr:nth-of-type(2) form div:nth-of-type(2)").html());
		})

	}

})





