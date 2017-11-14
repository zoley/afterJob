
window.onload=function(){
	var mySwiper = new Swiper ('.swiper-container', {
		direction: 'horizontal',
		loop: true,
		loopAdditionalSlides : 1,

	    // 如果需要分页器
	    // pagination: '.swiper-pagination',
	    // paginationClickable:true,
	    // paginationType:'bullets',
	    
	    // 如果需要前进后退按钮
	    // nextButton: '.swiper-button-next',
	    // prevButton: '.swiper-button-prev',
	    
	    // 如果需要滚动条
	    scrollbar: '.swiper-scrollbar',
	    scrollbarHide:false,
	    //防止边界模糊
	    roundLengths : true,
	    //网格分布
	    slidesPerView :1.5,
	    spaceBetween : 50,
	    centeredSlides : true,
	    //自动播放
	    autoplay:2000,
	    autoplayDisableOnInteraction : false
	}) 
}