$(function(){
	$(".pl_title").on("click",function(){
		var c = $(this).index()/2;
		$(this).css("color","#008DE8").find("img").prop("src","img/more_unfold.png");
		$(this).siblings().css("color","black").find("img").prop("src","img/more.png");
		$(".pl_item").eq(c).show().siblings(".pl_item").hide();
	})
	$(".pl_item:first-of-type li").on("click",function(){
		var c =$(this).index();
		$(".problem_right").eq(c).show().siblings(".problem_right").hide();
	})
    $(".pl_item:nth-of-type(2) li").on("click",function(){
        var c =$(this).index()+7;
        $(".problem_right").eq(c).show().siblings(".problem_right").hide();
    })	
    $(".pl_item:nth-of-type(3) li").on("click",function(){
		var c =$(this).index()+18;
		console.log(c)
		$(".problem_right").eq(c).show().siblings(".problem_right").hide();
	})
})
    var form = document.querySelector('form');
    form.addEventListener('invalid',function(event){
        var elem = event.target;
        var vali = elem.validity;
        var name = elem.name;


        switch (name){
            case 'Name':
                if(vali.valueMissing){
                    elem.setCustomValidity('昵称不能为空');
                }else{
                    elem.setCustomValidity('');
                }
                break;
			case 'phone':
                if(vali.valueMissing){
                    elem.setCustomValidity('手机号码不能为空');
                }else{
                    elem.setCustomValidity('');
                }
                break;
        }
    },true)