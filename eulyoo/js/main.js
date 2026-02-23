$(document).ready(function(){
    let visual_bar_w
    const visual_swiper = new Swiper('.visual .swiper', { /* 팝업을 감싼는 요소의 class명 */

        autoplay: {  /* 팝업 자동 실행 */
            delay: 5000,
            disableOnInteraction: false,
        },

        //effect: "fade", /* fade 효과 */

        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */

        pagination: {  /* 몇개의 팝업이 있는지 보여주는 동그라미 */
            el: '.swiper-pagination', /* 해당 요소의 class명 */
            clickable: true,  /* 클릭하면 해당 팝업으로 이동할 것인지 값 */
            type: 'fraction',  /* type fraction을 주면 paging이 숫자로 표시됨 */
            renderBullet: function (index, className) {   /* paging에 특정 코드 넣기 */
                return '<span class="' + className + '">' + (index + 1) + "</span>";
            },
        },
        

        navigation: {  /* 이전, 다음 버튼 */
            nextEl: '.visual .ctrl_right .next',  /* 다음 버튼의 클래스명 */
            prevEl: '.visual .ctrl_right .prev',  
        },
         on: {
            autoplayTimeLeft(s, time, progress) {
                /*  1 -> 0 
                   0% ~ 100% */
                visual_bar_w = 100 - (100 * progress)
                $('.visual .ctrl_left .bar span').width(visual_bar_w + '%')
            }
        }

    });

    $('.visual .ctrl_left .stop').on('click', function(){
        // console.log('정지')
        visual_swiper.autoplay.stop();  /* 일시정지 기능 */
        $(this).hide()    
        $('.visual .ctrl_left .play').show()
    })
    $('.visual .ctrl_left .play').on('click', function(){
        // console.log('재생')
        visual_swiper.autoplay.start(); /* 재생 기능 */
        $(this).hide()
        $('.visual .ctrl_left .stop').show()
    })
})//document ready//