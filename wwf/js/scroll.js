$(document).ready(function () {
    // 이 파일은 support 섹션 전용 스크롤 애니메이션이다.
    // 작은 이미지가 점점 커져 화면을 채우고,
    // 텍스트와 버튼이 타이밍에 맞춰 나타나도록 제어한다.
    let obj_area = $('.support')
    let obj_wrapper = $('.support .wrapper')
    let obj_txt = $('.support .txt')
    let obj_tit = $('.support .txt .tit')
    let obj_now = $('.support .txt .now')
    let obj_wrap = $('.support .photo_wrap')
    let obj_name = $('.support .photo_wrap .photo_move')
    let end_class = 'scroll' // 애니메이션 구간에 들어왔는지 CSS에서 구분할 때 쓰는 class
    let brd_radius = 30 // 처음 카드 모서리 둥글기
    let ani_percent = 1.5 // 확대가 support 섹션 길이 중 어디까지 진행될지 정하는 비율

    let scrolling // 현재 스크롤 위치
    let win_h // 브라우저 화면 높이
    let win_w // 브라우저 화면 너비
    let ani_start // support 연출 시작 위치
    let ani_end // support 연출 종료 위치
    let ani_ratio // 0~1 진행률
    let obj_start_w // 이미지 시작 너비
    let obj_start_h // 이미지 시작 높이
    let obj_start_x // 이미지 시작 x좌표
    let obj_start_y // 이미지 시작 y좌표
    let obj_w // 진행 중 현재 너비
    let obj_h // 진행 중 현재 높이
    let obj_x // 진행 중 현재 x 이동값
    let obj_y // 진행 중 현재 y 이동값
    let rgb_start = 29 // 어두운 시작 색상
    let rgb_end = 255 // 밝은 끝 색상
    let rgb_now // 제목용 현재 색상
    let rgb_now2 // 본문/버튼용 현재 색상
    let rgb_start2 = 61 // 본문 계열 시작 색상
    let rgb_obj = $('.support .txt .tit h2') // 큰 제목
    let rgb_obj2 = $('.support .txt') // 텍스트 전체
    let rgb_obj3 = $('.support .txt .now a') // CTA 버튼
    let support_padding_top = 0 // wrapper의 상단 여백
    let support_fixed_top = 40 // 텍스트를 화면 몇 % 높이에 둘지
    let support_reveal_gap = 0 // 버튼이 등장하기 전 잠깐 기다리는 거리
    let support_text_shift = 0 // 텍스트가 아래에서 위로 움직일 거리
    let support_text_start_top = 0 // 텍스트의 시작 고정 위치
    let support_media_start_top = 0 // 이미지가 fixed 될 때 시작 기준 top
    let support_text_end_offset = 0 // 종료 시 텍스트 보정값
    let support_text_base_offset = 0 // 텍스트 시작 위치 보정값

    // 확대 초반에는 텍스트를 약간 아래에서 위로 끌어올린다.
    // 사용자는 "글이 스르르 제자리로 올라오는" 느낌을 보게 된다.
    function set_support_text_progress(offset) {
        obj_txt.css({
            position: 'fixed',
            top: support_text_start_top + 'px',
            left: obj_wrapper.offset().left + 'px',
            width: obj_wrapper.width() + 'px',
            transform: `translateY(${offset}px)`
        })
    }

    // 이미지 바깥 상자를 화면에 고정해 두는 함수다.
    // 이 단계에서는 이미지를 바로 전체화면으로 보내지 않고,
    // 원래 위치 근처에서부터 자연스럽게 커지도록 기준점을 잡아 준다.
    function set_support_media_progress() {
        obj_wrap.css({
            position: 'fixed',
            top: support_media_start_top + 'px',
            left: obj_start_x + 'px',
            width: obj_start_w + 'px',
            height: obj_start_h + 'px',
            margin: 0
        })
    }

    // 이미지가 충분히 커진 뒤에는 텍스트를 화면 중앙 근처에 고정한다.
    // top: 40% 와 translateY(-50%)를 함께 써서 "대략 중앙보다 조금 위"에 배치한다.
    function set_support_text_fixed() {
        obj_txt.css({
            position: 'fixed',
            top: support_fixed_top + '%',
            left: obj_wrapper.offset().left + 'px',
            width: obj_wrapper.width() + 'px',
            transform: 'translateY(-50%)'
        })
    }

    // 애니메이션이 끝난 뒤에는 fixed 상태를 풀고,
    // support 섹션 내부의 마지막 위치에 텍스트를 놓는다.
    // 그래야 다음 섹션으로 넘어갈 때 요소가 겹치지 않는다.
    function set_support_text_end() {
        obj_txt.css({
            position: 'absolute',
            top: (ani_end - ani_start + (win_h * (support_fixed_top / 100)) - support_padding_top + support_text_end_offset) + 'px',
            left: 0,
            width: obj_wrapper.width() + 'px',
            transform: 'translateY(-50%)'
        })
    }

    // 이미지도 같은 이유로 마지막에는 absolute 상태로 정리한다.
    // 스크롤 애니메이션이 끝난 뒤의 "정지 화면"을 만드는 셈이다.
    function set_support_media_end() {
        obj_wrap.css({
            position: 'absolute',
            top: (ani_end - ani_start - support_padding_top) + 'px',
            left: -obj_wrapper.offset().left + 'px',
            right: 'auto',
            width: win_w + 'px',
            height: win_h + 'px',
            margin: 0
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

    // 스크립트가 바꿔 놓은 글자색을 지우고 원래 CSS 색상으로 되돌린다.
    function reset_support_colors() {
        rgb_obj.css('color', '')
        rgb_obj2.css('color', '')
        rgb_obj3.css({
            color: '',
            borderColor: ''
        })
    }

    // 이미지가 화면 전체를 덮으면 배경이 어두워질 가능성이 높기 때문에,
    // 텍스트와 버튼을 흰색으로 바꿔 가독성을 확보한다.
    function set_support_fixed_colors() {
        rgb_obj.css('color', 'rgb(255, 255, 255)')
        rgb_obj2.css('color', 'rgb(255, 255, 255)')
        rgb_obj3.css({
            color: 'rgb(255, 255, 255)',
            borderColor: 'rgb(255, 255, 255)'
        })
    }

    function scale_img() {
        // 모바일/태블릿에서는 복잡한 fixed 연출을 끄고 기본 레이아웃만 보여 준다.
        // 작은 화면에서 과한 스크롤 연출은 오히려 불편하거나 계산이 흔들릴 수 있기 때문이다.
        if ($(window).width() <= 1024) {
            obj_wrap.removeAttr('style')
            obj_name.removeAttr('style')
            obj_txt.removeAttr('style')
            reset_support_colors()
            obj_tit.css({ transition: '', opacity: '' })
            obj_now.css({ transition: '', opacity: '', pointerEvents: '' })
            obj_area.removeClass(end_class)
            return
        }

        // 현재 화면 크기와 스크롤 위치를 다시 읽는다.
        scrolling = $(window).scrollTop()
        win_w = $(window).width()
        win_h = $(window).height()
        ani_start = obj_area.offset().top
        ani_end = ani_start + obj_area.innerHeight() - win_h
        support_padding_top = parseFloat(obj_wrapper.css('padding-top')) || 0
        support_reveal_gap = win_h * 0.08
        support_text_shift = Math.min(win_h * 0.18, 180)
        support_text_base_offset = Math.min(win_h * 0.1, 96) + 50
        support_text_end_offset = Math.min(win_h * 0.08, 72)
        support_text_start_top = support_padding_top + support_text_base_offset

        // 아래로 갔다가 다시 위로 올라올 수 있으므로,
        // 이전에 넣었던 absolute/fixed 스타일을 먼저 지워 상태가 꼬이지 않게 한다.
        if (scrolling <= ani_end) {
            obj_wrap.removeAttr('style')
        }

        // 이미지가 원래 있던 위치와 크기를 저장한다.
        // 이 값이 있어야 "작은 카드 -> 큰 화면"으로 확대되는 계산이 가능하다.
        obj_start_x = obj_wrap.offset().left
        obj_start_y = obj_wrap.offset().top
        obj_start_w = obj_wrap.width()
        obj_start_h = obj_wrap.height()
        support_media_start_top = support_padding_top + obj_txt.outerHeight(true)

        // 1단계: 아직 support 섹션에 도착하기 전
        // 원래 레이아웃을 유지하고, CTA 버튼은 숨겨 둔다.
        if (scrolling < ani_start) {
            obj_wrap.removeAttr('style')
            obj_name.removeAttr('style')
            obj_txt.removeAttr('style')
            reset_support_colors()
            obj_tit.css({ transition: 'none', opacity: 1 })
            obj_now.css({ transition: 'none', opacity: 0, pointerEvents: 'none' })
            obj_area.removeClass(end_class)
        } else if (scrolling > ani_end) {
            set_support_media_end()
            set_support_text_end()
            set_support_fixed_colors()
            obj_tit.css({ transition: 'none', opacity: 1 })
            obj_now.css({ transition: 'opacity 0.4s ease', opacity: 1, pointerEvents: 'auto' })
            obj_area.addClass(end_class)
        } else {
            // 2단계와 3단계는 실제 애니메이션 구간이다.
            // 먼저 이미지를 키우는 단계, 그 다음 전체화면을 유지하며 버튼을 보여 주는 단계로 나눈다.
            if (scrolling < ani_start + (obj_area.innerHeight() / ani_percent) - win_h) {
                // 진행률 계산: 0이면 시작, 1이면 확대 완료
                ani_ratio = (scrolling - ani_start) / ((ani_start + (obj_area.innerHeight() / ani_percent) - win_h) - ani_start)
                ani_ratio = Math.max(0, Math.min(1, ani_ratio))

                // 이미지 크기를 조금씩 키운다.
                obj_w = obj_start_w + (win_w - obj_start_w) * ani_ratio
                obj_h = obj_start_h + (win_h - obj_start_h) * ani_ratio

                // 이미지가 원래 자리에서 화면 기준 위치로 이동하도록 보정한다.
                obj_x = -obj_start_x * ani_ratio
                obj_y = -obj_start_y * ani_ratio + (scrolling - ani_start * (1 - ani_ratio))
                obj_name.css({
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    transform: `translate(${obj_x}px, ${-support_media_start_top * ani_ratio}px)`,
                    width: obj_w + 'px',
                    height: obj_h + 'px',
                    borderRadius: brd_radius - (brd_radius * ani_ratio)
                })

                // 진행률에 맞춰 글자색도 점차 밝게 바꾼다.
                rgb_now = rgb_start + (rgb_end - rgb_start) * ani_ratio
                rgb_now2 = rgb_start2 + (rgb_end - rgb_start2) * ani_ratio
                rgb_obj.css('color', 'rgb(' + rgb_now + ', ' + rgb_now + ', ' + rgb_now + ')')
                rgb_obj2.css('color', 'rgb(' + rgb_now2 + ', ' + rgb_now2 + ', ' + rgb_now2 + ')')
                rgb_obj3.css({
                    color: 'rgb(' + rgb_now2 + ', ' + rgb_now2 + ', ' + rgb_now2 + ')',
                    borderColor: 'rgb(' + rgb_now2 + ', ' + rgb_now2 + ', ' + rgb_now2 + ')'
                })

                // 텍스트는 살짝 위로 이동시키고,
                // CTA 버튼은 아직 보여 주지 않아 시선이 이미지 확대에 먼저 가도록 한다.
                set_support_media_progress()
                set_support_text_progress(support_text_shift * ani_ratio)
                obj_tit.css({ transition: 'none', opacity: Math.max(0, 1 - ani_ratio * 2) })
                obj_now.css({ transition: 'none', opacity: 0, pointerEvents: 'none' })
                obj_area.removeClass(end_class)
            } else {
                // 3단계: 이미지가 이미 화면을 가득 채운 상태
                // 여기서는 이미지를 고정해 두고, 일정 스크롤 지점을 넘으면 버튼을 보여 준다.
                obj_name.css({
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    transform: 'translate(0, 0)',
                    width: win_w + 'px',
                    height: win_h + 'px',
                    borderRadius: 0
                })
                set_support_text_fixed()
                set_support_fixed_colors()
                obj_tit.css({ transition: 'opacity 0.6s ease', opacity: 1 })
                if (scrolling >= ani_start + (obj_area.innerHeight() / ani_percent) - win_h + support_reveal_gap) {
                    // 버튼은 살짝 늦게 등장시켜 전체 화면 이미지와 제목을 먼저 인식하게 한다.
                    obj_now.css({ transition: 'opacity 0.4s ease', opacity: 1, pointerEvents: 'auto' })
                } else {
                    obj_now.css({ transition: 'none', opacity: 0, pointerEvents: 'none' })
                }
                obj_area.addClass(end_class)
            }
        }
    }

    // 페이지 처음 진입할 때 한 번 실행하고,
    // 이후 스크롤하거나 창 크기가 바뀔 때마다 같은 계산을 반복한다.
    scale_img()
    $(window).scroll(function () {
        scale_img()
    })
    $(window).resize(function () {
        scale_img()
    })
})
