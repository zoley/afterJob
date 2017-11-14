$(document).ready(function(){
	//小星星
	var W=document.documentElement.clientWidth;
	if(W<=768){
		// new CanvasStar().init({
		// 	initStarNum:30
		// });	
	}else{
		new CanvasStar().init({
			initStarNum:150
		});	
	}
	var onOff=1;
	$(".btn").click(function(){
		if(onOff){
			$(".btn .icon").addClass("checked");
			$(".mask").css("display","block");
			$("#nav").animate({"right":"0"},300,"swing");
			$(".btn").css("backgroundColor","#867D7D");
		}else{
			$(".btn .icon").removeClass("checked");
			$(".mask").css("display","none");
			$("#nav").animate({"right":"-80%"},300,"swing");
			$(".btn").css("backgroundColor","transparent");
		}
		onOff=!onOff;
	})
	setInterval(function(){
		var lh=$(".con-left").height();
		$(".con-middle").css("height",lh);
		$(".con-right").css("height",lh);
	},100)

	//article-1----------
	var dPage=document.getElementById("dividePage");
	if(dPage){
		dividePage(1,7);
	}
	//synataxy----
	var exist=document.getElementsByClassName("codebox");
	if(exist.length){
		$(".codebox").syntaxy({});
	}


	//扫码打赏
	$(".shang>a").click(function(){
		$(".shangs").css("display","block");
	})
	$(".shangs>i").click(function(){
		$(".shangs").css("display","none");
	})
	$(".shangs .choose label:nth-of-type(1)").click(function(){
		$(".shangs .ercode .wei").css("display","block");
		$(".shangs .ercode .zhi").css("display","none");
		$(".shangs .dashang").html("打开微信扫一扫，即可进行扫码打赏哦");
	})
	$(".shangs .choose label:nth-of-type(2)").click(function(){
		$(".shangs .ercode .wei").css("display","none");
		$(".shangs .ercode .zhi").css("display","block");
		$(".shangs .dashang").html("打开支付宝扫一扫，即可进行扫码打赏哦");
	})

	$(document).bind("contextmenu",function(e){return false;});
	$(document).bind("keydown",function(e){e=window.event||e; if(e.keyCode==123){e.keyCode = 0;return  false;} }); 

	//up-----------------------
	$(document).scroll(function(){
		if($(window).scrollTop()>700){
			$("#up").fadeIn();
		}else{
			$("#up").fadeOut();
		}
	})
	$("#up").click(function(){
		$("html,body").animate({"scrollTop":"0"},500,"swing");
	})
	//zan------------------
	var time;
	$(".zan").click(function(){
		x=this.getAttribute("data-num");
		var ihtml=this.childNodes[0].innerHTML;
		if(window.localStorage.getItem("z-time"+x)){
			var stri=window.localStorage.getItem("z-time"+x);
			time=stri.split(",");
		}else{
			time=[];
		}
		var dd=parseInt(new Date().getDate());
		if(time){
			if(dd!=parseInt(time[0])){
				window.localStorage.removeItem("z-time");
				time=[];
			}	
		}
		if(time[time.length-1]!=parseInt(time[0])){
			window.localStorage.removeItem("z-time"+x);
			time=[];
			this.className="zan zans";
			ihtml++;
			$(this).find("i").fadeIn(450,function(){
				$(this).fadeOut(1000,function(){
					$(this).prev().html(ihtml);
				});
			})
			$.ajax({
				type:"post",
				data:{zan:ihtml,id:x},
				url:"http://zoley.me/contact.php",
				success:function(){

				}
			})

		}else{
			alert("大爷，您已经点过赞了，明儿再点吧");
		}
		var d=new Date()
		time.push(d.getDate());
		window.localStorage.setItem("z-time"+x,time);
	})

	//============canvas旋转小星星========================
	var cnss=document.getElementById("cnss");
	if(cnss){

		cnssFn();
		function cnssFn(){
			var ctxx=cnss.getContext("2d");
			var num=0;
			var num2=0;
			var dir=1;
			setInterval(function(){
				num++;
				if(num2==150){
					dir=-1;
				}else if(num2==0){
					dir=1;
				}
				num2+=dir;
				ctxx.save();
				ctxx.beginPath();
				ctxx.clearRect(0,0,cnss.width,cnss.height);
				ctxx.fillStyle="#FFF200";
				ctxx.strokeStyle = 'rgb(0,0,100)';
				ctxx.lineWidth = "1";
				ctxx.translate(70,70);//★一定要放在。save里面
				ctxx.rotate(num*Math.PI/180);
				ctxx.scale(num2*1/50,num2*1/50);
				// ctxx.translate(-100*Math.cos(18*Math.PI/180),-100*Math.sin(18*Math.PI/180));
				// ctxx.fillRect(0,0,200,200);
				var deg = Math.PI / 15 * 12;

				for (var i = 0; i < 30; i++) {
					var x = Math.sin(i * deg);
					var y = Math.cos(i * deg);
					ctxx.lineTo(0 + x * 20, 0 + y * 20);
				}
				ctxx.fill();
				// ctxx.stroke();
				ctxx.closePath();
				ctxx.restore();
			},1000/60)
		}
	}
})

function dividePage(currentPage,perPageNum){
	var dPage=document.getElementById("dividePage");
	var oSel=dPage.getElementsByClassName("select")[0];
	var oUl=dPage.getElementsByTagName("ul")[0];
	var totalNum=data.data[0].con.length;
	var totalPage=null;
	//判断总数据个数/总页数是否可以取整，否则下一页
	if(totalNum/perPageNum!=parseInt(totalNum/perPageNum)){
		totalPage=parseInt(totalNum/perPageNum)+1;
	}else{
		totalPage=parseInt(totalNum/perPageNum);
	}
	//判断最后一个数据是否小于总数据
	var upNum=(currentPage-1)*perPageNum+1;
	var downNum=currentPage*perPageNum;
	downNum=(downNum>totalNum)?totalNum:downNum;
	var str="";
	for(var i=upNum-1;i<downNum;i++){
		str+="<li><h4>"+data.data[0].con[i].title+"</h4><p>"+data.data[0].con[i].content+"</p></li>"
	}
	oUl.innerHTML=str;
	var strr="共有"+totalNum+"记录，分"+totalPage+"页，当前是第"+currentPage+"页  ";
	if(currentPage>1){
		strr+="<a href='javascript:;' onclick='dividePage(1,"+perPageNum+")'>首页</a> ";
		strr+=" <a href='javascript:;' onclick='dividePage("+(currentPage-1)+","+perPageNum+")'>上一页</a> ";
	}else{
		strr+="首页  上一页";
	}
	if(currentPage<totalPage){
		strr+=" <a href='javascript:;' onclick='dividePage("+(currentPage+1)+","+perPageNum+")'>下一页</a>";
		strr+=" <a href='javascript:;' onclick='dividePage("+totalPage+","+perPageNum+")'>尾页</a> ";
	}else{
		strr+="下一页  尾页";
	}
	oSel.innerHTML=strr;
}


