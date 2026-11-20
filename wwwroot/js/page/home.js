$(function () {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const $hero = $('.hero_slides');
    const $pause = $hero.find('[data-hero-pause]');
    const $playbackIcon = $pause.find('img');
    const $heroCounter = $hero.find('[data-hero-count]');
    let autoplayEnabled = !motion.matches;

    function syncHero(swiper) {
        updateCounter($heroCounter, swiper);
        $(swiper.slides).prop('inert', index => {
            return index !== swiper.activeIndex;
        });
    }

    function updateCounter($counter, swiper) {
        const format = number => String(number).padStart(2, '0');
        $counter.text(format(swiper.realIndex + 1) + ' / ' + format(swiper.slides.length));
    }

    const heroSwiper = new Swiper($hero.get(0), {
        effect: 'fade',
        fadeEffect: { crossFade: true },
        speed: motion.matches ? 0 : 750,
        loop: true,
        autoplay: { delay: 6500, disableOnInteraction: false },
        navigation: {
            prevEl: $hero.find('[data-hero-prev]').get(0),
            nextEl: $hero.find('[data-hero-next]').get(0)
        },
        a11y: { prevSlideMessage: '이전 슬라이드', nextSlideMessage: '다음 슬라이드' },
        on: { init: syncHero, slideChange: syncHero }
    });

    function syncAutoplay() {
        $pause.attr({
            'aria-pressed': String(!autoplayEnabled),
            'aria-label': autoplayEnabled ? '자동 재생 정지' : '자동 재생 시작'
        });
        $playbackIcon.attr('src', autoplayEnabled ? '/images/icon-pause.svg' : '/images/icon-play.svg');
        const heroHasFocus = $($document.prop('activeElement')).closest($hero).length;
        if (autoplayEnabled && !$document.prop('hidden') && !heroHasFocus && !$hero.is(':hover')) {
            heroSwiper.autoplay.start();
        } else {
            heroSwiper.autoplay.stop();
        }
    }

    const $document = $(document);
    $pause.on('click', () => {
        autoplayEnabled = !autoplayEnabled;
        syncAutoplay();
        if (autoplayEnabled && !$document.prop('hidden')) heroSwiper.autoplay.start();
    });
    $hero.on('mouseenter mouseleave focusin', syncAutoplay);
    $hero.on('focusout', () => requestAnimationFrame(syncAutoplay));
    $document.on('visibilitychange', syncAutoplay);
    syncAutoplay();

    const cardSwipers = [
        createCardSwiper('.home_products', 'product', '제품'),
        createCardSwiper('.insights_carousel', 'insight', '인사이트')
    ];

    function createCardSwiper(selector, name, label) {
        const $counter = $('[data-' + name + '-count]');
        const update = swiper => updateCounter($counter, swiper);
        const updateOffset = swiper => {
            const $carousel = $(swiper.el);
            const firstSlideWidth = $carousel.find('.swiper-slide').first().outerWidth();
            swiper.params.slidesOffsetAfter = Math.max(0, $carousel.prop('clientWidth') - firstSlideWidth);
        };
        return new Swiper(selector, {
            slidesPerView: 'auto',
            slidesPerGroupAuto: false,
            spaceBetween: 20,
            loop: true,
            loopadditionalslides: 1,
            speed: motion.matches ? 0 : 450,
            breakpoints: { 769: { spaceBetween: 30 } },
            navigation: {
                prevEl: $('[data-' + name + '-prev]').get(0),
                nextEl: $('[data-' + name + '-next]').get(0)
            },
            a11y: { prevSlideMessage: '이전 ' + label, nextSlideMessage: '다음 ' + label },
            on: {
                beforeInit: updateOffset,
                init: update,
                slideChange: update,
                resize(swiper) {
                    updateOffset(swiper);
                    swiper.update();
                    update(swiper);
                }
            }
        });
    }

    $(motion).on('change', () => {
        autoplayEnabled = !motion.matches;
        heroSwiper.params.speed = motion.matches ? 0 : 750;
        cardSwipers.forEach(swiper => { swiper.params.speed = motion.matches ? 0 : 450; });
        syncAutoplay();
    });
});

$(function () {
    const $tabs = $('[data-service]');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const serviceSwiper = new Swiper('.service_carousel', {
        effect: 'fade',
        fadeEffect: { crossFade: true },
        autoHeight: true,
        speed: reducedMotion.matches ? 0 : 350,
        on: {
            init: syncService,
            slideChange: syncService
        }
    });

    function syncService(swiper) {
        const $selected = $tabs.eq(swiper.activeIndex);
        $tabs.not($selected).attr('aria-selected', 'false').prop('tabIndex', -1);
        $selected.attr('aria-selected', 'true').prop('tabIndex', 0);
        $(swiper.slides).prop('inert', index => index !== swiper.activeIndex);
    }

    $tabs.on('click', function () {
        serviceSwiper.slideTo($tabs.index(this));
    });

    $tabs.on('keydown', function (event) {
        const index = $tabs.index(this);
        let nextIndex;
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % $tabs.length;
        else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index + $tabs.length - 1) % $tabs.length;
        else if (event.key === 'Home') nextIndex = 0;
        else if (event.key === 'End') nextIndex = $tabs.length - 1;
        else return;
        event.preventDefault();
        serviceSwiper.slideTo(nextIndex);
        $tabs.eq(nextIndex).trigger('focus');
    });
});
