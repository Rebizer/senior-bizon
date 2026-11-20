import Lenis from '../lib/lenis/lenis.mjs';

const lenis = new Lenis({
    duration: 1.5,
    smoothWheel: !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    syncTouch: false,
});

window.lenis = lenis;
// ScrollTrigger 사용 화면에서도 RAF는 아래 한 곳에서만 실행한다.
if (window.ScrollTrigger) {
    lenis.on('scroll', () => window.ScrollTrigger.update());
}

$(function () {
    startLenis();


    let startY = 0;

    $('body').on('touchstart', '.scroll', function (e) {
        startY = e.originalEvent.touches[0].clientY;
    });

    $('body').on('touchmove', '.scroll', function (e) {
        const $scroll = $(this);
        const currentY = e.originalEvent.touches[0].clientY;
        const deltaY = startY - currentY;

        const up = deltaY < 0;
        const down = deltaY > 0;

        const scrollTop = $scroll.scrollTop();
        const atTop = scrollTop === 0;
        const atBottom = $scroll.prop('scrollHeight') - $scroll.prop('clientHeight') === scrollTop;

        // 터치 스크롤 막기
        if ((up && !atTop) || (down && !atBottom)) {
            e.stopPropagation();
        }
    });

    $('body').on('wheel', '.scroll', function (e) {
        const $scroll = $(this);
        const delta = e.originalEvent.deltaY;
        const up = delta < 0;
        const down = delta > 0;

        const scrollTop = $scroll.scrollTop();
        const atTop = scrollTop === 0;
        const atBottom = $scroll.prop('scrollHeight') - $scroll.prop('clientHeight') === scrollTop;

        if ((up && !atTop) || (down && !atBottom)) {
            e.stopPropagation();
        }
    });
});


function startLenis() {
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
}
