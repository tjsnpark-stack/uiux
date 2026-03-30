$(document).ready(function(){
	const visual_swiper = new Swiper('.visual .swiper', { /* 팝업을 감싼는 요소의 class명 */

        autoplay: {  /* 팝업 자동 실행 */
            delay: 5000,
            disableOnInteraction: true,
        },

        effect: "fade", /* fade 효과 */

        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */
    });


        /*****************menu에 over했을때 ******************* */
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

    /****************lang 오버했을때*************** */

    $('.header .util .lang .language_open').on('click', function(){
        $('.lang').toggleClass('open')
    })

    /****************************** */

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

    const service_swiper = new Swiper('.service .swiper', { /* 팝업을 감싼는 요소의 class명 */


        //effect: "fade", /* fade 효과 */

        loop: false,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */
        

        navigation: {  /* 이전, 다음 버튼 */
            nextEl: '.service .next',  /* 다음 버튼의 클래스명 */
            prevEl: '.service .prev',  
        },

        slidesPerView: 1, /* 한번에 보일 팝업의 수 - 모바일 제일 작은 사이즈일때 */
        spaceBetween: 16, /* 팝업과 팝업 사이 여백 */
        breakpoints: {
            426: {    /* 640px 이상일때 적용 */
                slidesPerView: 2,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 24,
            },
            769: {    /* 640px 이상일때 적용 */
                slidesPerView: 1,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 24,
            },
        },

    });

    /***********************place 하나씩 넘기는 팝업********************** */

    const place_swiper = new Swiper('.place .swiper', { /* 팝업을 감싼는 요소의 class명 */

        slidesPerView: 1, /* 한번에 보일 팝업의 수 - 모바일 제일 작은 사이즈일때 */
        spaceBetween: 16, /* 팝업과 팝업 사이 여백 */
        breakpoints: {
            499: {    /* 640px 이상일때 적용 */
                slidesPerView: 2,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 24,
            },
            650: {    /* 640px 이상일때 적용 */
                slidesPerView: 3,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 12,
            },
            1050: {    /* 640px 이상일때 적용 */
                slidesPerView: 5,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 12,
            },
        },

    });


    /***********************place 하나씩 넘기는 팝업********************** */

    const insta_swiper = new Swiper('.insta .swiper', { /* 팝업을 감싼는 요소의 class명 */
        slidesPerView: 2, /* 한번에 보일 팝업의 수 - 모바일 제일 작은 사이즈일때 */
        spaceBetween: 16, /* 팝업과 팝업 사이 여백 */
        breakpoints: {
            499: {    /* 640px 이상일때 적용 */
                slidesPerView: 3,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 12,
            },
            769: {    /* 640px 이상일때 적용 */
                slidesPerView: 5,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 12,
            },
            1025: {    /* 640px 이상일때 적용 */
                slidesPerView: 6,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 12,
            },
        },
    });
    


    let reserve_select
    $('.reserve .tab_list ul li').on('click', function(){
        reserve_select = $(this).attr('data-name')
		// console.log(reserve_select)
        $('.reserve .tab_list ul li').removeClass('active')
        $(this).addClass('active')
        $('.reserve .tab_contents .tab_item').removeClass('active')
        $('.reserve .tab_contents .tab_item.' + reserve_select).addClass('active')
	});


    
    $('.quick_menu .quick_open').on('click', function(e){
		e.preventDefault();		/* a 태그의 href를 작동 시키지 않음 */
        if($(this).parent().hasClass('open') == true){
            $(this).parent().removeClass('open')
        }else{
            $('.quick_menu .quick_open').removeClass('open')
            $(this).parent().addClass('open')
        }
	});
    $('.quick_menu .quick_open').on('click', function(){
        $('.quick_menu').addClass('open')
    })
    $('.quick_menu .quick_close').on('click', function(){
        $('.quick_menu').removeClass('open')
    })
    
});