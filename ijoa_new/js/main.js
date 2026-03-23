$(document).ready(function(){
	const visual_swiper = new Swiper('.visual .swiper', { /* 팝업을 감싼는 요소의 class명 */

        autoplay: {  /* 팝업 자동 실행 */
            delay: 5000,
            disableOnInteraction: true,
        },

        effect: "fade", /* fade 효과 */

        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */
    });


    /**************header fixed 스크롤이 아래로 내려갈때************* */
    let scrolling
    function scroll_chk(){
        scrolling = $(window).scrollTop()
        // console.log(scrolling) 
        if(scrolling > 0){
            $('.header').addClass('fixed')
        }else{
            $('.header').removeClass('fixed')
        }
    }
    scroll_chk()
    $(window).scroll(function(){
        scroll_chk()
    })

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
    $('.header .gnb').on('mouseleave', function(){
        $('.header').removeClass('menu_over')
        $('.header .gnb .gnb_wrap ul.depth1 > li').removeClass('over')
    })

    /****************lang 오버했을때*************** */

    $('.header .util .lang .language_open').on('click', function(){
        $('.lang').toggleClass('open')
    })
});