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