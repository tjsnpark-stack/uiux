$(document).ready(function(){

let device_status
    let window_w
    let mobile_size = 1024
    function device_chk(){
        window_w = $(window).width()
        if(window_w > mobile_size){
            device_status = 'pc'
        }else{
            device_status = 'mo'
        }
        console.log(device_status)
    }
    device_chk()
    $(window).resize(function(){
        device_chk()
    })
    $('.header .gnb .gnb_wrap ul.depth1 > li').on('mouseenter', function(){
        $('.header').addClass('menu_over')
        $('.header .gnb .gnb_wrap ul.depth1 > li').removeClass('over')
        $(this).addClass('over')
    })
    $('.header .gnb .gnb_wrap').on('mouseleave', function(){
        $('.header').removeClass('menu_over')
        $('.header .gnb .gnb_wrap ul.depth1 > li').removeClass('over')
    })


    $('.header .gnb .gnb_wrap ul.depth1 > li > a').on('click', function(e){
		e.preventDefault();		/* a 태그의 href를 작동 시키지 않음 */
        if($(this).parent().hasClass('open') == true){
            $(this).parent().removeClass('open')
        }else{  
            $('.header .gnb .gnb_wrap ul.depth1 > li').removeClass('open')
            $(this).parent().addClass('open')
        }
	});
    $('.header .gnb .gnb_open').on('click', function(){
        $('.header').addClass('menu_open')
    })
    $('.header .gnb .gnb_wrap .gnb_close').on('click', function(){
        $('.header').removeClass('menu_open')
    })




var c_type_swiper = new Swiper(".c_type .swiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    loop: true,
});


const most_swiper = new Swiper('.most .swiper', { /* 팝업을 감싼는 요소의 class명 */

    slidesPerView: 1, /* 한번에 보일 팝업의 수 - 모바일 제일 작은 사이즈일때 */
    spaceBetween: 16, /* 팝업과 팝업 사이 여백 */
    breakpoints: {
        499: {    /* 640px 이상일때 적용 */
            slidesPerView: 2,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
            spaceBetween: 16,
        },
        699: {    /* 640px 이상일때 적용 */
            slidesPerView: 3,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
            spaceBetween: 16,
        },
        769: {    /* 640px 이상일때 적용 */
            slidesPerView: 4,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
            spaceBetween: 24,
        },
    },

});

const new_swiper = new Swiper('.new .swiper', { /* 팝업을 감싼는 요소의 class명 */

    slidesPerView: 1, /* 한번에 보일 팝업의 수 - 모바일 제일 작은 사이즈일때 */
    spaceBetween: 16, /* 팝업과 팝업 사이 여백 */
    breakpoints: {
        499: {    /* 640px 이상일때 적용 */
            slidesPerView: 2,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
            spaceBetween: 16,
        },
        769: {    /* 640px 이상일때 적용 */
            slidesPerView: 4,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
            spaceBetween: 24,
        },
    },

});

    
    
    
});