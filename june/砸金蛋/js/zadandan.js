//时间循环
function tiaotiao(){
	var c = 0;
	var d = 0;
//	蛋蛋循环
	timer_a = setInterval(function(){
		c>5?c=0:c=c;
		$(".egg").eq(c).addClass(" jump").siblings(".egg").removeClass(" jump");
		c++;
	},400)
//	锤子循环
	timer_c = setInterval(function(){
		var d1 = d%2
		d1==1?$(".hammer").addClass(" swing"):$(".hammer").removeClass(" swing");
		d++;
	},400)
}
//点击蛋蛋事件
$(".egg").on("click",function(){
	var c = 0;
	var d = 0;
	var b =$(this);
	var index = $(this).index()+1;/*获取当前蛋蛋序列号*/
	var x = (index-1) % 3+1 ; /*获取蛋蛋x坐标*/
	var y =Math.ceil(index/3);/*获取蛋蛋y坐标*/
	Left = x * 33 - 17;
	Top = y==1?3:55;
	clearInterval(timer_a);
	clearInterval(timer_c);
	$(".egg").removeClass(" jump");

//	锤子移动
	$(".hammer").css({"left":""+Left+"%","top":""+Top+"%"});
//	移动后砸蛋蛋
	setTimeout(function(){
		timer_d=setInterval(function(){
			d>2?d=clearInterval(timer_d):d=d;
			var d1 = d%2
			d1==0?$(".hammer").addClass(" swing"):$(".hammer").removeClass(" swing");
			d++;
		},200)
	},300)
	
	setTimeout(function(){
		timer_b=setInterval(function(){
			c>2?c=clearInterval(timer_b):c=c;
			var d = c % 2
			d==0?b.addClass(" knock"):b.removeClass(" knock");
			c++;
		},200)
	},300)
//	砸蛋后弹出框
	setTimeout(function(){
		$("#zj_contain").show();
	},1200)
})
$("#close_btn").on("click",function(){
	$("#zj_contain").hide();
	tiaotiao();
	$(".hammer").css({"left":"87%","top":"-14%"});
})
tiaotiao();

$("#zj_btn").click(function(){
	window.location.href="http://www.baidu.com";
})

