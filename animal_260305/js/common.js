/********************
 * header와 footer 공통 사항에 들어가는 스크립트
 *********************************/
$(document).ready(function () {
    let device_status; //mo:모바일, pc:pc버전
    let mobile_size = 1024;
    let window_w; //브라우저 넓이

    function device_chk() {
        //함수의 정의
        window_w = $(window).width();
        if (window_w > mobile_size) {
            device_status = "pc";
        } else {
            device_status = "mo";
        }
        console.log(device_status);
    }

    device_chk(); //문서가 로딩되었을때 단 1번 실행
    $(window).resize(function () {
        device_chk(); //브라우저가 리사이즈 될때마다 1번 실행
    });

    $(".header .gnb ul.depth1 > li:has(ul.depth2)").on("mouseenter focusin", function () {
        if (device_status == "pc") {
            $(".header").addClass("menu_over");
            $(this).addClass("over");
            $(this).find("ul.depth2").slideDown();
        }
    });
    $(".header .gnb ul.depth1 > li").on("mouseleave", function () {
        if (device_status == "pc") {
            $(this).removeClass("over");
            $(this).find("ul.depth2").slideUp();
        }
    });
    $(".header").on("mouseleave", function () {
        if (device_status == "pc") {
            $(".header").removeClass("menu_over");
        }
    });
    $(".header .util .mypage").on("focusin", function () {
        if (device_status == "pc") {
            $(".header").removeClass("menu_over");
            $(".header .gnb ul.depth1 > li:has(ul.depth2)").removeClass('over')
            $(".header .gnb ul.depth1 > li:has(ul.depth2) > ul.depth2").slideUp();
        }
    });


    let scrolling

    function scroll_chk(){
        scrolling = $(window).scrollTop()
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

    $('.header .util .sitemap_btn').on('click', function(){
        $('.header').toggleClass('menu_open')
        if($('.header').hasClass('menu_open') == true){
            $(this).attr('title', '메뉴 닫기')
        }else{
            $(this).attr('title', '메뉴 열기')
        }
    })

    $('.header .sitemap .sitemap_wrap ul.depth1 > li:has(ul.depth2)').on('click', function(){
        if (device_status == "mo") {
            if($(this).hasClass('open') == true){
                $(this).removeClass('open')
                $(this).find('ul.depth2').slideUp(300, function(){
                    $(this).removeAttr('style')
                })
            }else{
                $('.header .sitemap .sitemap_wrap ul.depth1 > li:has(ul.depth2)').removeClass('open')
                $('.header .sitemap .sitemap_wrap ul.depth1 > li:has(ul.depth2) > ul.depth2').slideUp(300, function(){
                    $(this).removeAttr('style')
                })
                $(this).addClass('open')
                $(this).find('ul.depth2').slideDown()
            }
        }
    })
    $('.header .sitemap .sitemap_bg').on('click', function(){
        if (device_status == "mo") {
             $('.header').removeClass('menu_open')
        }
    })

});
