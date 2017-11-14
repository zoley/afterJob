//二楼
var doc = $(document);


var _touches_point1 = 0;
var _touches_point2 = 0;
addEventListener("touchstart",
    function(e) {
        _touches_point1 = e.touches[0].pageY;
    });
addEventListener("touchmove",
    function(e) {

        _touches_point2 = e.touches[0].pageY;
        if (doc.scrollTop() <= 0 && _touches_point1 < _touches_point2) {
            e.preventDefault();
            if ($('#floor2').length <= 0) {
                console.log($('#floor2').length)
                $('body').prepend('<div id="floor2" style="text-align:center;background-color:#272b2e;color:#65696c;height:0px;padding-top:15px;line-height:26px;font-size:12px;overflow:hidden;"><p>网页由 zoley.me 提供</p><p>google浏览器提供技术支持</p></div>');
            }
            $('#floor2').height((_touches_point2 - _touches_point1));

        }
    });

addEventListener("touchend",
    function(e) {
        $('#floor2').slideUp('normal', function() {
            $('#floor2').remove();
        });
    });