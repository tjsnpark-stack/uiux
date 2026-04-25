if ('scrollRestoration' in history) {
    // 브라우저는 보통 "뒤로 가기"를 하면 이전 스크롤 위치를 자동 복원한다.
    // 이 페이지는 스크롤 위치에 따라 애니메이션이 강하게 바뀌기 때문에,
    // 새로 들어왔을 때는 항상 맨 위에서 시작하도록 기본 동작을 끈다.
    history.scrollRestoration = 'manual';
}

$(document).ready(function () {
    // HTML을 모두 읽은 뒤에 실행한다.
    // 아직 화면 요소가 준비되지 않은 상태에서 애니메이션 코드를 실행하면 위치 계산이 어긋날 수 있다.
    window.scrollTo(0, 0);

    // GSAP의 ScrollTrigger 기능을 사용하겠다고 먼저 등록한다.
    // 쉽게 말해 "스크롤할 때 요소를 어떻게 움직일지"를 다루는 도구를 켜는 단계다.
    gsap.registerPlugin(ScrollTrigger);

    // .visual 안에는 여러 장면(future, today, life, act)이 들어 있다.
    // 그중 스크롤 안내 아이콘(.scroll_down)은 제외하고 실제 장면들만 배열로 가져온다.
    const visualSections = gsap.utils.toArray(".visual > div[class]:not(.scroll_down)");

    if (visualSections.length > 0) {
        const visualTl = gsap.timeline({
            scrollTrigger: {
                // .visual 영역이 화면 맨 위에 닿는 순간부터 애니메이션을 시작한다.
                trigger: ".visual",
                start: "top top",
                // 스크롤을 어느 정도 더 진행했을 때 애니메이션을 끝낼지 정한다.
                // 숫자가 클수록 사용자는 더 오래 스크롤하면서 장면 전환을 보게 된다.
                end: "+=400%",
                // pin: true 이면 해당 섹션이 화면에 잠시 고정된 것처럼 보인다.
                pin: true,
                // scrub: true 이면 애니메이션이 자동 재생되지 않고,
                // 사용자의 스크롤 양에 비례해서 조금씩 진행된다.
                scrub: true,
                // 화면 크기가 바뀌면 시작/끝 지점을 다시 계산한다.
                invalidateOnRefresh: true
            }
        });

        visualSections.forEach((section, i) => {
            if (i > 0) {
                // 첫 장면은 처음부터 보이고 있으므로, 두 번째 장면부터 차례대로 연다.
                // clipPath가 점점 풀리면서 "다음 화면이 위에서 덮이며 등장하는" 느낌을 만든다.
                visualTl.to(section, {
                    clipPath: "inset(0% 0% 0% 0%)",
                    ease: "none"
                });
            }
        });
    }


    // activity 섹션은 "왼쪽 설명 글"과 "오른쪽 이미지 슬라이드"가 따로 움직인다.
    // 이 슬라이더는 사용자가 직접 넘기는 용도가 아니라,
    // 오른쪽 이미지 슬라이드의 현재 순서를 따라가며 설명 문구만 바꿔 주는 역할이다.
    const swiper_paging = new Swiper('.activity .txt .swiper_paging', {
        effect: "fade",
        allowTouchMove: false,
        slidesPerView: 1,
    });

    // 실제로 사용자가 보게 되는 카드 슬라이더다.
    // 가운데 카드가 강조되어 보이도록 centeredSlides를 사용하고,
    // 끝까지 가면 다시 처음으로 자연스럽게 이어지도록 loop를 켠다.
    const activity_swiper = new Swiper('.activity .list .swiper', {
        slidesPerView: 'auto',
        spaceBetween: 0,
        centeredSlides: true,
        loop: true,
    });

    activity_swiper.on('slideChange', () => {
        // 오른쪽 이미지 슬라이드가 바뀌면 왼쪽 설명도 같은 순서로 맞춰 준다.
        swiper_paging.slideToLoop(activity_swiper.realIndex);
    });


    // 아래부터는 goal 섹션의 스크롤 연출을 위한 변수들이다.
    // 사진이 작은 카드 상태에서 시작해서 점점 커지며 화면 전체를 덮고,
    // 동시에 글자 색과 텍스트 배치도 바뀌도록 제어한다.
    let obj_area = $('.goal')
    let obj_wrap = $('.goal .photo_wrap')  // 사진 전체를 감싸는 바깥 상자
    let obj_name = $('.goal .photo_wrap .photo_move')  // 실제로 크기/위치가 바뀌는 안쪽 요소
    let end_class = 'scroll'  // 특정 구간에 들어왔는지 CSS 쪽에서 표시할 때 사용할 class
    let brd_radius = 30  // 처음 카드 모서리 둥글기 값
    let ani_percent = 1.5  // 확대 애니메이션이 섹션 길이 중 어디까지 진행될지 정하는 비율

    let scrolling // 현재 사용자가 얼마나 아래로 스크롤했는지
    let win_h // 브라우저 화면 높이
    let win_w // 브라우저 화면 너비
    let ani_start // goal 섹션 애니메이션이 시작되는 스크롤 위치
    let ani_end // goal 섹션 애니메이션이 끝나는 스크롤 위치
    let ani_ratio // 0~1 사이 진행률. 0이면 시작, 1이면 완료
    let obj_start_w // 사진이 처음에 갖고 있던 너비
    let obj_start_h // 사진이 처음에 갖고 있던 높이
    let obj_start_x // 사진 시작 x좌표
    let obj_start_y // 사진 시작 y좌표
    let obj_w // 스크롤 중 계산된 현재 너비
    let obj_h // 스크롤 중 계산된 현재 높이
    let obj_x // 스크롤 중 계산된 현재 x 이동값
    let obj_y // 스크롤 중 계산된 현재 y 이동값
    let rgb_start = 29 // 어두운 시작 색상 값
    let rgb_end = 255 // 밝은 끝 색상 값
    let rgb_now // 제목용 현재 색상 값
    let rgb_now2 // 본문/버튼용 현재 색상 값
    let rgb_start2 = 61 // 본문은 제목보다 조금 밝은 값에서 시작
    let rgb_obj = $('.goal .txt h2') // 큰 제목
    let rgb_obj2 = $('.goal .txt .tit') // 제목/설명 묶음
    let rgb_obj3 = $('.goal .txt .more a') // more 버튼
    let obj_wrapper = $('.goal .wrapper') // 텍스트와 사진을 같이 감싸는 기준 상자
    let obj_txt = $('.goal .txt') // 텍스트 전체 영역
    let obj_tit = $('.goal .txt .tit') // 제목 영역
    let obj_more = $('.goal .txt .more') // more 버튼 영역
    let obj_list = $('.goal .list') // 마지막에 나타나는 리스트
    let txt_fixed_top = 100 // 텍스트를 화면 상단에서 얼마나 떨어뜨릴지
    let goal_padding_top = 0 // 섹션 상단 여백값

    // 텍스트를 화면에 붙여 두는 함수다.
    // position: fixed 는 문서 흐름을 떠나서 "브라우저 화면"을 기준으로 고정시키는 방식이다.
    // 그래서 사용자가 더 스크롤해도 텍스트가 같은 자리에 머무는 것처럼 보인다.
    function set_goal_text_fixed() {
        obj_txt.css({
            position: 'fixed',
            top: txt_fixed_top + 'px',
            left: obj_wrapper.offset().left + 'px',
            width: obj_wrapper.width() + 'px'
        })
    }

    // 애니메이션이 끝난 뒤에는 텍스트를 다시 섹션 안에 놓아야 한다.
    // 계속 fixed 상태로 두면 다음 섹션 위에 겹쳐 보이기 때문에,
    // absolute 로 바꿔 "goal 섹션 안의 마지막 위치"에 고정해 둔다.
    function set_goal_text_end() {
        obj_txt.css({
            position: 'absolute',
            top: (ani_end - ani_start + txt_fixed_top - goal_padding_top) + 'px',
            left: 0,
            width: obj_wrapper.width() + 'px'
        })
    }

    // 사진이 화면 전체로 커진 뒤, 애니메이션 종료 시점의 최종 상태를 만드는 함수다.
    // 여기서도 fixed 를 계속 유지하지 않고 absolute 로 정리해 둬야
    // 이후 레이아웃이 자연스럽게 이어진다.
    function set_goal_media_end() {
        obj_wrap.css({
            position: 'absolute',
            top: (ani_end - ani_start - goal_padding_top) + 'px',
            left: -obj_wrapper.offset().left + 'px',
            right: 'auto',
            width: win_w + 'px',
            height: win_h + 'px'
        })
        obj_name.css({
            position: 'absolute',
            left: 0,
            top: 0,
            transform: 'none',
            width: '100%',
            height: '100%',
            borderRadius: 0
        })
    }

    // 스크립트가 직접 넣었던 글자색을 지우는 함수다.
    // ''(빈값)을 넣으면 CSS 파일에 원래 적혀 있던 기본 색상으로 돌아간다.
    function reset_goal_colors() {
        rgb_obj.css('color', '')
        rgb_obj2.css('color', '')
        rgb_obj3.css({
            color: '',
            borderColor: ''
        })
    }

    // 사진이 화면 전체를 덮는 순간에는 배경이 어두워질 수 있으므로,
    // 텍스트가 잘 보이도록 흰색으로 강제로 맞춘다.
    function set_goal_fixed_colors() {
        rgb_obj.css('color', 'rgb(255, 255, 255)')
        rgb_obj2.css('color', 'rgb(255, 255, 255)')
        rgb_obj3.css({
            color: 'rgb(255, 255, 255)',
            borderColor: 'rgb(255, 255, 255)'
        })
    }

    function scale_img() {
        // 화면이 너무 작으면 복잡한 확대/고정 연출이 오히려 불편할 수 있다.
        // 그래서 태블릿 이하에서는 인라인 스타일을 모두 지우고
        // 일반적인 세로 흐름 레이아웃만 남긴다.
        if ($(window).width() <= 1024) {
            obj_wrap.removeAttr('style')
            obj_name.removeAttr('style')
            obj_txt.removeAttr('style')
            reset_goal_colors()
            obj_tit.css({ transition: '', opacity: '' })
            obj_more.css({ transition: '', opacity: '' })
            obj_list.css({ transition: '', opacity: 1 })
            obj_area.removeClass(end_class)
            return
        }

        // 스크롤 계산에 필요한 현재 상태를 매번 다시 읽어 온다.
        scrolling = $(window).scrollTop()
        win_w = $(window).width()
        win_h = $(window).height()
        ani_start = obj_area.offset().top
        ani_end = ani_start + obj_area.innerHeight() - win_h
        goal_padding_top = parseFloat(obj_area.css('padding-top')) || 0

        // 확대가 끝난 뒤에는 obj_wrap 에 absolute/fixed 스타일이 남아 있을 수 있다.
        // 다시 스크롤을 위로 올렸을 때 이전 상태가 섞이지 않도록 먼저 비워 준다.
        if (scrolling <= ani_end) {
            obj_wrap.removeAttr('style')
        }

        // 사진이 "원래 어디 있었는지"를 기준값으로 저장한다.
        // 이 시작 위치가 있어야 작은 카드에서 큰 화면으로 커지는 계산이 가능하다.
        obj_start_x = obj_wrap.offset().left
        obj_start_y = obj_wrap.offset().top
        obj_start_w = obj_wrap.width()
        obj_start_h = obj_wrap.height()

        // 1단계: 아직 goal 섹션에 도달하기 전
        // 아무 애니메이션도 하지 않고 처음 디자인 상태를 유지한다.
        if (scrolling < ani_start) {
            obj_wrap.removeAttr('style')
            obj_name.removeAttr('style')
            obj_area.removeClass(end_class)
            obj_txt.removeAttr('style')
            reset_goal_colors()
            obj_tit.css({ transition: 'none', opacity: 1 })
            obj_more.css({ transition: 'none', opacity: 1 })
            obj_list.css({ transition: 'none', opacity: 0 })
        } else if (scrolling > ani_end) {
            // 4단계: 애니메이션이 완전히 끝난 뒤
            // 사진과 텍스트를 "마지막 상태"로 정리하고 리스트를 모두 보여 준다.
            obj_area.addClass(end_class)
            set_goal_media_end()
            set_goal_text_end()
            set_goal_fixed_colors()
            obj_tit.css({ transition: 'none', opacity: 1 })
            obj_more.css({ transition: 'none', opacity: 1 })
            obj_list.css({ transition: 'none', opacity: 1 })
        } else {
            // 2단계와 3단계는 애니메이션이 실제로 진행되는 중간 구간이다.
            // 먼저 사진이 커지는 구간과, 다 커진 뒤 내용을 보여 주는 구간으로 나눈다.
            if (scrolling < ani_start + (obj_area.innerHeight() / ani_percent) - win_h) {
                // ani_ratio는 진행률이다.
                // 0이면 시작 상태, 1이면 "사진이 화면 전체가 된 상태"라고 생각하면 된다.
                ani_ratio = (scrolling - ani_start) / ((ani_start + (obj_area.innerHeight() / ani_percent) - win_h) - ani_start)
                ani_ratio = Math.max(0, Math.min(1, ani_ratio))

                // 진행률에 따라 사진의 너비/높이를 조금씩 키운다.
                obj_w = obj_start_w + (win_w - obj_start_w) * ani_ratio
                obj_h = obj_start_h + (win_h - obj_start_h) * ani_ratio

                // 사진이 원래 카드 위치에서 화면 맨 왼쪽/맨 위 방향으로 이동하도록 계산한다.
                obj_x = - obj_start_x * ani_ratio
                obj_y = - obj_start_y * ani_ratio + (scrolling - ani_start * (1 - ani_ratio))
                obj_name.css({
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    transform: `translate(${obj_x}px, ${obj_y}px)`,
                    width: obj_w + 'px',
                    height: obj_h + 'px',
                    borderRadius: brd_radius - (brd_radius * ani_ratio)
                })

                // 사진이 커질수록 텍스트 색상도 어두운색에서 밝은색으로 부드럽게 바뀐다.
                rgb_now = rgb_start + (rgb_end - rgb_start) * ani_ratio
                rgb_now2 = rgb_start2 + (rgb_end - rgb_start2) * ani_ratio
                rgb_obj.css('color', 'rgb(' + rgb_now + ', ' + rgb_now + ', ' + rgb_now + ')')
                rgb_obj2.css('color', 'rgb(' + rgb_now2 + ', ' + rgb_now2 + ', ' + rgb_now2 + ')')
                rgb_obj3.css({
                    color: 'rgb(' + rgb_now2 + ', ' + rgb_now2 + ', ' + rgb_now2 + ')',
                    borderColor: 'rgb(' + rgb_now2 + ', ' + rgb_now2 + ', ' + rgb_now2 + ')'
                })

                // 텍스트는 제자리에 붙여 두고,
                // 기존 제목/버튼은 서서히 사라지게 해서 시선이 사진 확대에 집중되게 한다.
                set_goal_text_fixed()
                obj_tit.css({ transition: 'none', opacity: Math.max(0, 1 - ani_ratio * 2) })
                obj_more.css({ transition: 'none', opacity: Math.max(0, 1 - ani_ratio * 2) })
                obj_list.css({ transition: 'none', opacity: 0 })
                obj_area.removeClass(end_class)
            } else {
                // 3단계: 사진이 이미 화면 전체가 된 뒤
                // 이제 사진은 고정해 두고, 텍스트와 리스트를 보이게 만든다.
                obj_name.css({
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    transform: 'translate(0, 0)',
                    width: win_w + 'px',
                    height: win_h + 'px',
                    borderRadius: 0
                })
                set_goal_text_fixed()
                set_goal_fixed_colors()
                obj_tit.css({ transition: 'opacity 0.6s ease', opacity: 1 })
                obj_more.css({ transition: 'opacity 0.6s ease', opacity: 1 })
                obj_list.css({ transition: 'opacity 0.6s ease', opacity: 1 })
                obj_area.addClass(end_class)
            }

        }
    }

    // 처음 페이지에 들어왔을 때 한 번 실행하고,
    // 이후 스크롤할 때와 창 크기가 바뀔 때마다 같은 계산을 다시 돌린다.
    scale_img()
    $(window).scroll(function () {
        scale_img()
    })
    $(window).resize(function () {
        scale_img()
    })

    // 뉴스 슬라이드는 비교적 단순하다.
    // 화면이 넓어질수록 한 번에 보여 주는 카드 개수만 늘려 준다.
    const news_swiper = new Swiper('.news .swiper', { /* 팝업을 감싼는 요소의 class명 */
        slidesPerView: 2, /* 한번에 보일 팝업의 수 - 모바일 제일 작은 사이즈일때 */
        spaceBetween: 16, /* 팝업과 팝업 사이 여백 */
        breakpoints: {
            880: {    /* 640px 이상일때 적용 */
                slidesPerView: 3,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 16,
            },
            1025: {    /* 640px 이상일때 적용 */
                slidesPerView: 4,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 16,
            },
        },
    });

});
