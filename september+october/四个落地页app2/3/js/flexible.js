/*
 * author: amfe
 * git: https:github.com/amfe/lib-flexble
 * version: 0.3.3
 * update: 20170216 toby 
*/
;(function(win, flexible) {
    var doc = win.document;
    var docEl = doc.documentElement;
    var metaEl = doc.querySelector('meta[name="viewport"]');
    var flexibleEl = doc.querySelector('meta[name="flexible"]');
    var dpr = 0;
    var design = 750;
    var scale = 0;
    var tid;
    var bias = 1;

    var viewMatch = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
    scale = parseFloat(viewMatch[1]);
    dpr = parseInt(1 / scale);
    if (flexibleEl) {
        design = flexibleEl.getAttribute('content').match(/design\-width=([\d\.]+)/)[1]*1;
    }

    //字体大小计算
    function refreshRem(){
        var width = docEl.getBoundingClientRect().width;
        var rem = width / (design/100) * bias;
        docEl.style.fontSize = rem + 'px';
        flexible.rem = win.rem = rem;
    }

    //计算偏差
    function calcBias() {
        var ele = document.createElement("div");
        ele.style.width = design/100 +"rem";
        doc.body.insertBefore(ele, null);
        var width = window.getComputedStyle(ele, null).width.replace(/px$/gi,"")*1;
        doc.body.removeChild(ele);
        var deviation = docEl.getBoundingClientRect().width / width;
        if (Math.abs(deviation-1) > 0.05) {
            bias = deviation;
            refreshRem();
        }
    }

    win.addEventListener('resize', function() {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
    }, false);
    win.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);

    doc.addEventListener('DOMContentLoaded', function(e) {
        doc.body.style.fontSize = 12 * dpr + 'px';
        calcBias();
    }, false);


    refreshRem();

    flexible.refreshRem = refreshRem;
    flexible.design = design;
    flexible.rem2px = function(d) {
        var val = parseFloat(d) * this.rem;
        if (typeof d === 'string' && d.match(/rem$/)) {
            val += 'px';
        }
        return val;
    }
    flexible.px2rem = function(d) {
        var val = parseFloat(d) / this.rem;
        if (typeof d === 'string' && d.match(/px$/)) {
            val += 'rem';
        }
        return val;
    }


})(window, window['flexible'] || (window['flexible'] = {}));