var main=document.getElementById("main");
var conCon=main.getElementsByClassName("con-con")[0];
var h=document.documentElement.clientHeight;
if(conCon.offsetHeight>h){
	main.style.height=conCon.offsetHeight+56+"px";
}