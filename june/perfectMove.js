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