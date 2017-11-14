// JavaScript Document

	// function $(zoe) {
	// 	if(typeof zoe==="function"){
	// 		return window.onload=zoe;
	// 	}else if(typeof zoe==="string"){
	// 		return document.getElementById(zoe);
	// 	}else if(typeof zoe==="object"){
	// 		return zoe;
	// 	}
	// }
//获取标签属性CSS值//    getStyle(oDiv,"display")
	function getStyle(obj,attr) {
		return obj.currentStyle ?obj.currentStyle[attr]:window.getComputedStyle(obj,false)[attr];
	}
//通过className来获取标签元素---非标准浏览器下不支持getElementsByClassName()
	function getElementsByClassName(parent,className){
		var arr=[];
		var aEles=parent.getElementsByTagName("*");
		for(var i=0;i<aEles.length;i++){
			var arrT=aEles[i].className.split(" ");
			for(var j=0;j<arrT.length;j++){
				if(arrT[j]==className){
					arr.push(aEles[i]);
					break;
				}
			}
		}
		return arr;
	}
//添加className的方法！--jq里有了
	function addClass(obj,className){
		if(obj.className==""){
			obj.className=className;
		}else{
			var _index=classIndexOf(obj,className);
			if(_index==-1){
				obj.className+=" "+className;
			}
		}
	}
	function classIndexOf(obj,className){
		var arrClassName=obj.className.split(" ");
		for(var i=0;i<arrClassName.length;i++){
			if(arrClassName[i]==className){
				return i;
			}
		}
		return -1;
	}
// 删除className的方法--jq
	function removeClass(obj,className){
		if(obj.className!=""){
			var _index=classIndexOf(obj,className);
			if(_index!=-1){
				var arrClassName=obj.className.split(" ");
				arrClassName.splice(_index,1);
				obj.className=arrClassName.join(" ");
			}
		}
	}
//删除所有子节点！！！！
	function removeAllChild(obj){
		//当div下还存在子节点时 循环继续
		while(obj.hasChildNodes()){
			obj.removeChild(obj.firstChild);
		}
	}
//事件绑定的第二种方式
	function bind(obj,ename,fn){
		if(obj.addEventListener){
			obj.addEventListener(ename,fn,false);
		}else{
			obj.attachEvent("on"+ename,function(){
				fn.call(obj);
			});
		}
	}
//前后或者上下匀速移动
	function move(obj,attr,per,target,endFn){
		per=parseInt(getStyle(obj,attr))<target?per:-per;
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			var len=parseInt(getStyle(obj,attr))+per;
			obj.isMoving=true;
			if(len>target && per>0 || len<target && per<0){
				len=target;
				obj.isMoving=false;
				clearInterval(obj.timer);
				endFn && endFn();
			}
			obj.style[attr]=len+"px";
		},30);
	}
//缓冲运动———任意值框架——包括opacity
	function bufferMove(obj,attr,target,endFn){
		clearInterval(obj.timer1)
		obj.timer1=setInterval(function(){
			obj.isMoving=true;
			var iCur=0;
			if(attr=="opacity"){
				iCur=Math.round(parseFloat(getStyle(obj,attr))*100);
			}else{
				iCur=parseInt(getStyle(obj,attr));
			}
			var speed=(target-iCur)/7;//除数越小，速度越快
			speed=speed>0?Math.ceil(speed):Math.floor(speed);//ie8，ie7会出现NaN
			if(iCur==target){
				obj.isMoving=false;
				clearInterval(obj.timer1);
				endFn && endFn();
			}else{
				if(attr=="opacity"){
					obj.style.filter="alpha(opacity="+(iCur+speed)+")";
					obj.style[attr]=(iCur+speed)/100;
				}else{
					obj.style[attr]=iCur+speed+"px";			
				}
			}
			// document.title=speed

		},30)
			
	}
//----------------------------------------------------------------------
//完美运动框架，可以同时处理多种运动
	function perfectMove(obj,json,endFn){								
		clearInterval(obj.timer2);							
		obj.timer2=setInterval(function(){							
			var bStop=true;		//这一次运动就结束了――所有的值都到达了				
			for(var attr in json){						
				//1.取当前的值					
				var iCur=0;					
				if(attr=="opacity"){					
					iCur=Math.ceil(parseFloat(getStyle(obj,attr))*100);				
				}else{					
					iCur=parseInt(getStyle(obj,attr));				
				}					
				//2.算速度					
				var speed=(json[attr]-iCur)/7;					
				speed=speed>0?Math.ceil(speed):Math.floor(speed);					
				//3.检测停止					
				if(iCur!=json[attr]){					
					bStop=false;				
				}					
				if(attr=="opacity"){					
					obj.style.filter="alpha(opacity="+(iCur+speed)+")";				
					obj.style.opacity=(iCur+speed)/100;				
				}else{					
					obj.style[attr]=iCur+speed+"px";				
				}					
			}						
			if(bStop){						
				clearInterval(obj.timer2);					
				endFn && endFn();					
			}						
		},30)							
	}
//弹性运动
	function elasticMove(obj,target){
		var speed=0;
		var left=obj.offsetLeft;
		clearInterval(obj.timer3);
		obj.timer3=setInterval(function(){
			speed+=(target-left)/5;
			speed*=0.7;
			left+=speed;
			if(Math.abs(speed)<1 && Math.abs(left-target)<1){
				clearInterval(obj.timer3);
				obj.style.left=target+"px";
			}else{
				obj.style.left=left+"px";				
			}
		},30)
	}
//抖起来啊亲shake
	function shake(obj,attr,endFn){
		if(obj.onoff){return}//判断是否抖完
		obj.onoff=true;
		var pos=parseInt(getStyle(obj,attr));
		var arr=[];
		var num=0;
		for(var i=10;i>0;i-=2){
			arr.push(i,-i)
		}
		arr.push(0);

		clearInterval(obj.ztimer);
		obj.ztimer=setInterval(function(){
			obj.style[attr]=pos+arr[num]+"px";
			num++;
			if(num===arr.length){
				clearInterval(obj.ztimer);
				obj.onoff=false;
				endFn && endFn();
			}
		},50);
	}
//透明度设置，time是从1-0所需要的时间
	function fadeOut(obj,time,endFn){
		var rate=30;//递减频率
		var reduce=parseFloat(getStyle(obj,"opacity")) / time *rate;
		clearInterval(obj.xtimer);
		obj.xtimer=setInterval(function(){
			var remain=parseFloat(getStyle(obj,"opacity"))-reduce;
			obj.style.opacity=remain;
			obj.style.filter="alpha(opacity="+remain*100+")";
			if(remain<=0){
				remain=0;
				clearInterval(obj.xtimer);
				endFn && endFn();
			}
		},rate);
	}

	function fadeIn(obj,time,endFn){
		var rate=30;//递增频率
		var add=(1-parseFloat(getStyle(obj,"opacity"))) / time *rate;
		clearInterval(obj.ytimer);
		obj.ytimer=setInterval(function(){
			var remain=parseFloat(getStyle(obj,"opacity"))+add;
			obj.style.opacity=remain;
			obj.style.filter="alpha(opacity="+remain*100+")";
			if(remain>=1){
				remain=1;
				clearInterval(obj.ytimer);
				endFn && endFn();
			}
		},rate);
	}
//cookie的方面，设置，获取以及删除
	//封装设置cookie
	function setCookie(key,value,t){
		var oDate=new Date();
		oDate.setDate(oDate.getDate()+t);
		document.cookie=key+"="+encodeURI(value)+";expires="+oDate.toUTCString();
	}
	//获得每一个cookie的值，而不是整体获取
	function getCookie(key){
		var arr1=document.cookie.split("; ");
		for(var i=0;i<arr1.length;i++){
			var arr2=arr1[i].split("=");
			if(arr2[0]==key){
				return decodeURI(arr2[1]);
			}
		}
	}
	//删除cookie
	function removeCookie(key){
		setCookie(key,"",-1);
	}

//拖拽封装-----
	function drag(child,parent,endFn){
			child.onmousedown=function(e){
				var e=e||event;
				var disX=e.clientX;
				var disY=e.clientY;
				var tempX=disX-this.offsetLeft;
				var tempY=disY-this.offsetTop;
				var maxLeft=parent.clientWidth-child.offsetWidth;
				var maxTop=parent.clientHeight-child.offsetHeight;
				//设置全局捕获，兼容非标准ie
				if(child.setCapture){
					child.setCapture();
				}
				document.onmousemove=function(e){
					var e=e||event;
					var left1=e.clientX-tempX;
					var top1=e.clientY-tempY;
					//限制范围-s,并磁性吸附
					if(left1<0){
						left1=0;
					}else if(left1>maxLeft){
						left1=maxLeft;
					}
					if(top1<0){
						top1=0;
					}else if(top1>maxTop){
						top1=maxTop;
					}
					//限制范围-e				
					child.style.left=left1+"px";
					child.style.top=top1+"px";
				}
				document.onmouseup=function(){
					document.onmousemove=document.onmouseup=null;
					//释放全局捕获
					if(child.setCapture){
						child.releaseCapture();
					}
				}
				return false;
			}
		}
//复杂运动，拖拽+碰撞+重力，传入一个obj,随意扔
	function complexMove(obj){
		var beforeX=0;//加入惯性
		var beforeY=0;//加入惯性
		obj.onmousedown=function(e){
			var e=e||event;
			var disX=e.clientX-obj.offsetLeft;
			var disY=e.clientY-obj.offsetTop;
			document.onmousemove=function(e){
				var e=e||event;
				var iL=e.clientX-disX;
				var iT=e.clientY-disY
				obj.style.left=iL+"px";
				obj.style.top=iT+"px";
				speedX=iL-beforeX;
				speedY=iT-beforeY;
				beforeX=iL;
				beforeY=iT;
			}
			document.onmouseup=function(){
				document.onmousemove=null;
				document.onmouseup=null;
				hitMove();
			}
			clearInterval(obj.timer4);
			return false;
		}
		var speedX=8;
		var speedY=10;
		function hitMove(){
			clearInterval(obj.timer4);
			obj.timer4=setInterval(function(){
				// speedX+=1;
				speedY+=4;
				var l=obj.offsetLeft+speedX;
				var t=obj.offsetTop+speedY
				// speedY+=10;//放在l,t之上和之下是两种效果-之上是带有摩擦力，之下是增加速度无摩擦
				if(t>=document.documentElement.clientHeight-obj.offsetHeight){
					speedY*=-0.7;
					speedX*=0.7;
					t=document.documentElement.clientHeight-obj.offsetHeight;
				}else if(t<=0){
					speedY*=-0.7;
					t=0;
				}
				if(l>=document.documentElement.clientWidth-obj.offsetWidth){
					speedX*=-0.7;
					l=document.documentElement.clientWidth-obj.offsetWidth;
				}else if(l<=0){
					speedX*=-0.7;
					l=0;
				}
				if(Math.abs(speedX)<1){
					speedX=0;
				}
				if(Math.abs(speedY)<1){
					speedY=0;
				}
				if(speedX==0 && speedY==0 && t==document.documentElement.clientHeight-obj.offsetHeight){
					clearInterval(obj.timer4);
				}


				obj.style.left=l+"px";
				obj.style.top=t+"px";
			},30)
		}
	}
//canvas-----获取，和设置坐标（像素）
	function getXY(obj,x,y){
		var w=obj.width;
		var h=obj.height;
		var d=obj.data;
		var color=[];
		color[0]=d[(y*w+x)*4];
		color[1]=d[(y*w+x)*4+1];
		color[2]=d[(y*w+x)*4+2];
		color[3]=d[(y*w+x)*4+3];
		return color;
	}
	function setXY(obj,x,y,color){
		var w=obj.width;
		var h=obj.height;
		var d=obj.data;
		d[(y*w+x)*4]=color[0];
		d[(y*w+x)*4+1]=color[1];
		d[(y*w+x)*4+2]=color[2];
		d[(y*w+x)*4+3]=color[3];
	}

//时间戳转换时间格式
	function getLocalTime(nS) {     
		return new Date(parseInt(nS) * 1000).toLocaleString('chinese',{hour12:false}).replace(/:\d{1,2}$/,' ');
	}     
// alert(getLocalTime(1293072805));
//结果是2010年12月23日 10:53

//找到obj到顶部的绝对距离
	function toTop(obj){
		var iTop=0;
		while(obj){
			iTop+=obj.offsetTop;
			obj=obj.offsetParent;
		}
		return iTop;
	}
//给字符串添加原型方法（去除首尾空格）
	String.prototype.trim=function(){
		return this.replace(/^\s+|\s+$/g,"");
	}