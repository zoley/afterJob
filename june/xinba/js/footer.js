
function lunban(){
						var dlist=[];
					var zhiban = new Array("大K","十四","辣条");
					var date = new Date(); 
					var year = date.getFullYear(); 
					var mouth = date.getMonth() + 1; 
					var days ;
					if(mouth == 2){
						days= year % 4 == 0 ? 29 : 28;
					}
					else if(mouth == 1 || mouth == 3 || mouth == 5 || mouth == 7 || mouth == 8 || mouth == 10 || mouth == 12){
						days= 31;
					}
					else{
						days= 30;         
					}  
						for(var i=1;i<days;i++){
							var x = new Date(''+year+'-'+mouth+'-'+i).getDay();
								dlist.push(i);			
						}
						var m =0;
						for(var j=0;j<dlist.length;j++){
							if(j%3 == 0){
								m=0;	
							}else{
								m++;
							}
							if (dlist[j] == date.getDate()) {
							
							
							if (zhiban[m] == "大K") {
				                $(".li0").show();
				                $(".li1").hide();
				                $(".li2").hide();
				            }
				            if (zhiban[m] == "十四") {
				                $(".li0").hide();
				                $(".li1").show();
				                $(".li2").hide();
				            }
				            if (zhiban[m] == "辣条"){
				                $(".li0").hide();
				                $(".li1").hide();
				                $(".li2").show();
				            }
							
							}	
						}
}
lunban();

+function (){
	var mon=new Date().getMonth()+1;
	var day=new Date().getDate();
	if(mon==10){
		switch(day){
			case 1:
				$(".tel-lun").html("17606165678");
				$("#fixed .z-contact").html('<a style="color:#333;" href="javascript:;">国庆值班人员</a><a href="tencent://message/?uin=525664459&amp;Site=&amp;Menu=yes"><img src="img/qq1.png">凯文 </a>');
				break;
			case 2:
				$(".tel-lun").html("18652195035");
				$("#fixed .z-contact").html('<a style="color:#333;" href="javascript:;">国庆值班人员</a><a href="tencent://message/?uin=54561178&amp;Site=&amp;Menu=yes"><img src="img/qq1.png">百草 </a>');
				break;
			case 3:
				$(".tel-lun").html("18796265196");
				$("#fixed .z-contact").html('<a style="color:#333;" href="javascript:;">国庆值班人员</a><a href="tencent://message/?uin=568546062&amp;Site=&amp;Menu=yes"><img src="img/qq1.png">浩仔 </a>');
				break;
			case 4:
				$(".tel-lun").html("13816712412");
				$("#fixed .z-contact").html('<a style="color:#333;" href="javascript:;">国庆值班人员</a><a href="tencent://message/?uin=597663880&amp;Site=&amp;Menu=yes"><img src="img/qq1.png">瑶瑶 </a>');
				break;
			case 5:
				$(".tel-lun").html("18796246096");
				$("#fixed .z-contact").html('<a style="color:#333;" href="javascript:;">国庆值班人员</a><a href="tencent://message/?uin=2056635680&amp;Site=&amp;Menu=yes"><img src="img/qq1.png">小树 </a>');
				break;
			case 6:
				$(".tel-lun").html("15950668698");
				$("#fixed .z-contact").html('<a style="color:#333;" href="javascript:;">国庆值班人员</a><a href="tencent://message/?uin=448685298&amp;Site=&amp;Menu=yes"><img src="img/qq1.png">小牛 </a>');
				break;
			case 7:
				$(".tel-lun").html("15105205071");
				$("#fixed .z-contact").html('<a style="color:#333;" href="javascript:;">国庆值班人员</a><a href="tencent://message/?uin=2249201539&amp;Site=&amp;Menu=yes"><img src="img/qq1.png">喵喵 </a>');
				break;
			case 8:
				$(".tel-lun").html("15950677031");
				$("#fixed .z-contact").html('<a style="color:#333;" href="javascript:;">国庆值班人员</a><a href="tencent://message/?uin=1654390436&amp;Site=&amp;Menu=yes"><img src="img/qq1.png">守候 </a>');
				break;
		}
	}
}();


var len=$("#fixed .z-contact a").length;
var timerr=null;
$("#top1 a:first-child").hover(function(){
	$("#fixed .z-contact").css("height",(40*len+len+1)+"px");
},function(){
	timerr=setTimeout(function(){
		$("#fixed .z-contact").css("height",(0)+"px");
	},500)
});
$("#fixed .z-contact").hover(function(){
	clearInterval(timerr);
	// $("#fixed .z-contact").css("height",(40*len+len+1)+"px");
},function(){
	setTimeout(function(){
		$("#fixed .z-contact").css("height",(0)+"px");
	},500)
});

