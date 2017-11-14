
$(function(){
	var cns1=document.getElementById("cns1");
	var ctx=cns1.getContext("2d");
	var field=document.getElementById("fieldset");
	var H=field.offsetHeight;
	var W=field.offsetWidth;
	cns1.height=H-30;
	cns1.width=W-10;
	drawStar(ctx,20,20,20,"darkcyan");
	drawStar(ctx,30,70,70,"yellow");
	function drawStar(context, r, x, y,color) {
		context.lineWidth = 2;
		context.beginPath();
		var dit = Math.PI * 4 / 5;
		var sin = Math.sin(0) * r + y;
		var cos = Math.cos(0) * r + x;
		context.moveTo(cos, sin);
		for (var i = 0; i < 5; i++) {
			var tempDit = dit * i;
			sin = Math.sin(tempDit) * r + y;
			cos = Math.cos(tempDit) * r + x;
			context.lineTo(cos, sin);

		}
		// context.strokeStyle = "red";
		context.shadowOffsetX=5;//默认为0;
		context.shadowOffsetY=5;//默认为0;
		context.shadowColor="black";
		context.shadowBlur=10;
		context.fillStyle =color;
		context.closePath();
		context.fill();
		// context.stroke();
	}
	drawStar2(ctx,30,50,150,50,3,3,"#996969","#D18821");//rot顺时针旋转角度
	drawStar2(ctx,10,25,220,110,3,3,"#2855D3","#D620E8");//rot顺时针旋转角度
	function drawStar2( cxt , r , R , x , y , rot , borderWidth , borderStyle , fillStyle){
		cxt.beginPath();
		for( var i = 0 ; i < 5 ; i ++){
			cxt.lineTo(Math.cos((18+72*i - rot)/180*Math.PI) * R + x ,- Math.sin((18+72*i - rot )/180*Math.PI) * R + y);
			cxt.lineTo(Math.cos((54+72*i - rot)/180*Math.PI) * r + x ,- Math.sin((54+72*i - rot )/180*Math.PI) * r + y);
		}
		cxt.closePath();

		cxt.lineWidth = borderWidth;
		cxt.strokeStyle = borderStyle;
		cxt.fillStyle = fillStyle;
		cxt.fill();
		cxt.stroke();
	}

	var cns2=document.getElementById("cns2");
	var ctx2=cns2.getContext("2d");
	var field2=document.getElementById("fieldset2");
	var H2=field2.offsetHeight;
	var W2=field2.offsetWidth;
	cns2.height=H2;
	cns2.width=W2;

	draw(ctx2,30,40,40,10);
	draw(ctx2,30,100,50,12);
	draw(ctx2,30,180,50,6);
	draw(ctx2,30,250,50,5);
	draw(ctx2,40,50,130,7);
	draw(ctx2,40,150,130,9);
	draw(ctx2,40,250,130,11);
	function draw(cxx,r,dx,dy,numdeg){
    var s = r;
    cxx.beginPath();
    cxx.fillStyle = 'pink';
    cxx.strokeStyle = 'rgb(0,0,100)';
    var deg = Math.PI / 15 * numdeg;
    for (var i = 0; i < 30; i++) {
        var x = Math.sin(i * deg);
        var y = Math.cos(i * deg);
        cxx.lineTo(dx + x * s, dy + y * s);
    }
    cxx.closePath();
    cxx.fill();
    cxx.stroke();
}

})


