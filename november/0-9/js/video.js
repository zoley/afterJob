;!function(){
	var zbox=document.createElement('div');
	var s = 'a'+Math.random().toString(36).slice(2,12);
	zbox.id=s;
	zbox.style.cssText='z-index:999999999999999;position:absolute;left:0;top:0;right:0;bottom:0;background:black;';
	zbox.innerHTML='<a href="http://zoley.me" style="-webkit-tap-highlight-color:transparent;display:block;width:100%;height:100%;margin:0;padding:0;"><img src="http://kw.gjzmtq.com/2/jobs.gif" style="width:100%;height:100%;vertical-align:top;"></a><p style="margin:0;padding:0;position:absolute;top:5px;right:5px;width:30%;height:25px;border-radius:25px;background:rgba(0,0,0,0.7);color:white;text-align: center;line-height:25px;font:normal normal 14px arial;padding-top: 4px;box-sizing: border-box;"><span></span><strong id="remaint">15</strong> <span>秒</span> &nbsp; <i style="font-style:normal;">跳过广告</i></p>'
	var remaintn=15;
	var timerr=setInterval(function(){
		remaintn--;
		remaint.innerHTML=remaintn;
		if(remaintn==0){
			var x=document.getElementById(s);
			var oV=document.getElementById('v');
			x.style.display='none';
			oV.play();
			clearInterval(timerr);
		}
	},1000)
	document.write(zbox.outerHTML);
	// var oVV=document.getElementById('vv');
	// console.log(oVV.id);
	// oVV.play();
	//http://wefire.qq.com/act/a20150826kris/pc/index.swf
	//<video id="vv" src="http://kw.gjzmtq.com/2/a.d.mp4" autoplay="" webkit-playsinline="true" x-webkit-airplay="true" playsinline="true" x5-video-player-fullscreen="false" width="100%" height="100%" preload="auto"  poster="" style="object-fit:fill;"></video>
	//<embed src="http://wefire.qq.com/act/a20150826kris/pc/index.swf" width="100%">
}();