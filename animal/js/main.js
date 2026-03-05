/*************************
* main.js는 메인페이지에서만 구동되는 스크립트를 저장..
***********************/
$(document).ready(function(){
    $('.visual .popup_wrap .popup').slick({
        autoplay: true, //팝업 자동 실행
        autoplaySpeed: 5000, //팝업이 머무는 시간
        speed: 500, //팝업 전환 속도
        //fade: true,  //페이드 효과 적용
        dots: true, //하단 페이지 버튼 (true, false)
        arrows: false,  //다음, 이전팝업 (true, false)
        //pauseOnHover: true, //마우스호버시 일시정지
        //infinite: false, //무한반복
    });

    $('.visual .ctrl_wrap .stop').on('click', function(){
        $('.visual .popup_wrap .popup').slick('slickPause');  /* 일시정지 기능 */
        $(this).hide()
        $('.visual .ctrl_wrap .play').show()
    })
    $('.visual .ctrl_wrap .play').on('click', function(){
        $('.visual .popup_wrap .popup').slick('slickPlay');  /* 재생 기능 */
        $(this).hide()
        $('.visual .ctrl_wrap .stop').show()
    })
})