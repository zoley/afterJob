;!function($){
    //运动趋势，可参考easing.js
    $.extend($.easing,{
        easeOutElastic: function (x, t, b, c, d){
            var s = 1.70158; var p = 0; var a = c;
            if (t == 0) return b; if ((t /= d) == 1) return b + c; if (!p) p = d * .3;
            if (a < Math.abs(c)) { a = c; var s = p / 4; }
            else var s = p / (2 * Math.PI) * Math.asin(c / a);
            return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
        }
    })
    $.fn.qin=function(opt){
        var options={
            dis:25, //上下拉伸最大距离 
            duration:500, //晃动时间
            reduce:0.1 //递减频率
        }
        var config=$.extend({},options,opt);
        return this.each(function(index){
            var $el=$(this);
            storeSpan($el);
            animateSpan($el,config);
        })
    }
    function storeSpan($el){
        var con=$el.html(),str='';
        for(var i=0;i<con.length;i++){
            // str+='<span>'+con[i]+'</span>';
            str+='<span>'+con.substring(i,i+1)+'</span>';
        }
        $el.html(str);
        var posArr=[];//位置数组
        $el.children().each(function(){
            var position = $(this).position();
            posArr.push(position);
            $(this).css({
                'top':position.top+'px',
                'left':position.left+'px'
            })
        })
        //布局转换
        $el.children().css('position','absolute');
        $el.data('storePos',posArr);        
    }
    function animateSpan($el,opt){
        var posArr=$el.data('storePos');
        var disX=disY=0;
        $el.mouseenter(function(e) {
            disX = e.clientX - $(this).offset().left;
            disY = e.clientY - $(this).offset().top;
        })
        $el.mousemove(function(e){
            var DX = e.clientX - $(this).offset().left;
            var DY = e.clientY - $(this).offset().top;
            var gapY=DY-disY;
            if(Math.abs(gapY)>opt.dis)return;
            var goDown=gapY>0;//假定向下
            $el.children().each(function(index){
                var position=posArr[index];
                var reduceY=Math.abs(DX-position.left)*opt.reduce;
                reduceY=goDown?reduceY:-reduceY;
                var final=position.top+gapY-reduceY;
                if(goDown && final<position.top){
                    final = position.top;
                } else if (!goDown && final > position.top){
                    final = position.top;
                }
                $(this).css('top',final);
            })
        })
        $el.mouseleave(function(){
            $(this).children().each(function(index){
                $(this).stop(true).animate({ 'top': posArr[index].top }, opt.duration,'easeOutElastic')
            })
        })
    }
}(jQuery)