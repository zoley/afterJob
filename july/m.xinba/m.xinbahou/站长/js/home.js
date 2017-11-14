
$(function(){
	var onOff=true;
	$("#show-menu").on("click",function(){
		if(onOff){
			$("#side").slideDown(300);
		}else{
			$("#side").slideUp(300);
		}
		onOff=!onOff;			
	})
	var h=$("#side").height()+$("#head").height();
	document.addEventListener("click",function(e){
		if(!onOff){
			var hY=e.clientY;
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
		$(".z-del").on("click",function(){
			$(this).parentsUntil("tbody").remove();
		})
	}
	if($(".z-review")){
		$(".z-review").on("click",function(){
			$(this).parentsUntil("tbody").remove();
		})
	}	
	if($(".zz-review")){
		$(".zz-review").on("click",function(){
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
		$(".z-dell").on("click",function(){
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
		$(".choose a").on("click",function(){
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
		$(".delete").on("click",function(){
			$(".con_del1").show();
			$(".con_del2").show();
			c=$(this);
		})
		$(".bnt51a35").on("click",function(){
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
		$(".getcode").on("click",function(){
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







  if(document.getElementById("set-form")){

		//	修改表单
		$("#change_form").on("click",function(){
			$(".changeable").removeAttr("readonly").css({"border-color":"black","box-shadow":"0 0 1px gray"});
			for(i=0;i<5;i++){
				var c = $(".changeable").eq(i).attr("value");
				$(".changeable").eq(i).attr("placeholder",""+c+"");
			}
			$("#submit").css("backgroundColor","#3981E0");
		})
		//修改密码
		$(".change_pwd").on("click",function(){
			$(".mask").show();
		})
		$(".mask>b").on("click",function(){
			$(".mask").hide();
		})
		//密码验证
		$('#s_password button').on('click', function(option) {
		     var oldpassword =   $('#oldpassword').val();
			  var password =   $('#password').val();
			  var password_confirm =   $('#password_confirm').val();
			  if(oldpassword=='' || password=='' || password_confirm==''){
			  		alert("三项必填,请重新输入");
					return false;
			  }
			  if(password!=password_confirm){
			  		alert("两次输入的密码不一样,请重新输入");
					return false;
			  }
			   $.post("/index.php?e=aff/account.edit_password", { oldpassword:oldpassword,password:password,password_confirm:password_confirm},
					function (data, textStatus){
						if(data){
							if(data=='err_pw'){
								alert("原始密码不能认证，无法修改")
							}
							if(data=='err_re'){
								alert("两次输入的密码不一样,请重新输入");
							}
							if(data=='ok'){
								$(".mask").hide();
								$('#s_password').hide();
							}
						}
			 }, "text")}); 

  }

})





