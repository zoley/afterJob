/**
 * Created by Administrator on 2016/8/14.
 */
//构造函数
function Move(op){
    this.op = op;
    //tween.js 因为东西不多，所以就干脆直接拿到自己的js里面，省的页面去多加载一个js
    this.Tween = {
        linear: function (t, b, c, d){  //匀速
            return c*t/d + b;
        },
        easeIn: function(t, b, c, d){  //加速曲线
            return c*(t/=d)*t + b;
        },
        easeOut: function(t, b, c, d){  //减速曲线
            return -c *(t/=d)*(t-2) + b;
        },
        easeBoth: function(t, b, c, d){  //加速减速曲线
            if ((t/=d/2) < 1) {
                return c/2*t*t + b;
            }
            return -c/2 * ((--t)*(t-2) - 1) + b;
        },
        easeInStrong: function(t, b, c, d){  //加加速曲线
            return c*(t/=d)*t*t*t + b;
        },
        easeOutStrong: function(t, b, c, d){  //减减速曲线
            return -c * ((t=t/d-1)*t*t*t - 1) + b;
        },
        easeBothStrong: function(t, b, c, d){  //加加速减减速曲线
            if ((t/=d/2) < 1) {
                return c/2*t*t*t*t + b;
            }
            return -c/2 * ((t-=2)*t*t*t - 2) + b;
        },
        elasticIn: function(t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
            if (t === 0) {
                return b;
            }
            if ( (t /= d) == 1 ) {
                return b+c;
            }
            if (!p) {
                p=d*0.3;
            }
            if (!a || a < Math.abs(c)) {
                a = c;
                var s = p/4;
            } else {
                var s = p/(2*Math.PI) * Math.asin (c/a);
            }
            return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        },
        elasticOut: function(t, b, c, d, a, p){    //正弦增强曲线（弹动渐出）
            if (t === 0) {
                return b;
            }
            if ( (t /= d) == 1 ) {
                return b+c;
            }
            if (!p) {
                p=d*0.3;
            }
            if (!a || a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            } else {
                var s = p/(2*Math.PI) * Math.asin (c/a);
            }
            return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
        },
        elasticBoth: function(t, b, c, d, a, p){
            if (t === 0) {
                return b;
            }
            if ( (t /= d/2) == 2 ) {
                return b+c;
            }
            if (!p) {
                p = d*(0.3*1.5);
            }
            if ( !a || a < Math.abs(c) ) {
                a = c;
                var s = p/4;
            }
            else {
                var s = p/(2*Math.PI) * Math.asin (c/a);
            }
            if (t < 1) {
                return - 0.5*(a*Math.pow(2,10*(t-=1)) *
                    Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
            }
            return a*Math.pow(2,-10*(t-=1)) *
                Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
        },
        backIn: function(t, b, c, d, s){     //回退加速（回退渐入）
            if (typeof s == 'undefined') {
                s = 1.70158;
            }
            return c*(t/=d)*t*((s+1)*t - s) + b;
        },
        backOut: function(t, b, c, d, s){
            if (typeof s == 'undefined') {
                s = 3.70158;  //回缩的距离
            }
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        },
        backBoth: function(t, b, c, d, s){
            if (typeof s == 'undefined') {
                s = 1.70158;
            }
            if ((t /= d/2 ) < 1) {
                return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
            }
            return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
        },
        bounceIn: function(t, b, c, d){    //弹球减振（弹球渐出）
            return c - Tween['bounceOut'](d-t, 0, c, d) + b;
        },
        bounceOut: function(t, b, c, d){
            if ((t/=d) < (1/2.75)) {
                return c*(7.5625*t*t) + b;
            } else if (t < (2/2.75)) {
                return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
            } else if (t < (2.5/2.75)) {
                return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
            }
            return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
        },
        bounceBoth: function(t, b, c, d){
            if (t < d/2) {
                return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
            }
            return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
        }
    };

    //获取旋转角度
    this.getmatrix = function(a,b,c,d,e,f){
        var aa=Math.round(180*Math.asin(a)/ Math.PI);
        var bb=Math.round(180*Math.acos(b)/ Math.PI);
        var cc=Math.round(180*Math.asin(c)/ Math.PI);
        var dd=Math.round(180*Math.acos(d)/ Math.PI);
        var deg=0;
        if(aa==bb||-aa==bb){
            deg=dd;
        }else if(-aa+bb==180){
            deg=180+cc;
        }else if(aa+bb==180){
            deg=360-cc||360-dd;
        }
        return deg>=360?0:deg;
    };
    //获取样式
    this.GetStyle = function(elem,style){
        return elem.currentStyle?obj.currentStyle[style]:window.getComputedStyle(elem)[style];
    };
};

Move.prototype.Go = function(){
    var _this = this;
    var elem = document.querySelectorAll(this.op.elem);
    var currentTime = new Date();
    //判断结果单位
    var company = '';
    switch (_this.op.style){
        case 'rotate' :
            this.op.style = 'transform';
            company = 'deg';
            break;
        case 'opacity' :
            company = '';
            break;
        default :
            company = 'px'
    };
    for(var i=0;i<elem.length;i++){
        clearInterval(elem[i].setInterval);
        //获得旋转角度
        var getRotate = eval( 'this.get' + this.GetStyle(elem[i],this.op.style));
        //获取样式（如果得到旋转角度得出的是矩阵。调用getRotate方法得到角度）
        var initValue = getRotate?getRotate:(parseInt(this.GetStyle(elem[i],this.op.style)) || 0);
        (function(i){
            //每个元素要运动的元素身上添加定时器，不与其他定时器冲突
            elem[i].setInterval = setInterval(function(){
                var t = new Date() - currentTime;
                var c = parseFloat(_this.op.target) - initValue;
                var Return;
                if(t >= _this.op.time){
                    t=_this.op.time;
                    clearInterval(elem[i].setInterval);
                    _this.op.callback&&_this.op.callback();
                };
                //调用Tween方法计算公式得出每次运行的值
                Return = _this.Tween[_this.op.type](t,initValue,c,_this.op.time) + company;
                elem[i].style[_this.op.style] = company == 'deg'?'rotate('+Return+')': Return ;
            },13);
        })(i);
    };
};
