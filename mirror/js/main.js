$(document).ready(function(){

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