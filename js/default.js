$(function () {
    const $scrollProgress = $('.scroll_progress');
    const scrollingElement = document.scrollingElement;

    function updateScrollProgress() {
        const scrollDistance = scrollingElement.scrollHeight - scrollingElement.clientHeight;
        const progress = scrollDistance > 0 ? scrollingElement.scrollTop / scrollDistance : 0;
        const percentage = Math.min(1, Math.max(0, progress)) * 100;
        $scrollProgress.css('width', percentage + '%').attr('aria-valuenow', Math.round(percentage));
    }

    $(window).on('scroll resize load pageshow', updateScrollProgress);
    new ResizeObserver(updateScrollProgress).observe(document.body);
    updateScrollProgress();

    const $menu = $('.main_nav');
    const $toggle = $('.menu_toggle');
    const $backdrop = $('.menu_backdrop');
    const $newsMenu = $menu.find('.news_menu');
    const $newsDropdown = $newsMenu.children('.news_dropdown');
    const mobileLayout = window.matchMedia('(max-width: 1000px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let newsOpen = false;
    let menuLenis;

    function setMobileMenu(open) {
        $menu.toggleClass('open', open).prop('inert', mobileLayout.matches && !open);
        $backdrop.toggleClass('open', open);
        $toggle.attr({
            'aria-expanded': String(open),
            'aria-label': open ? '메뉴 닫기' : '메뉴 열기'
        });
        $('html').toggleClass('mobile_menu_open', open);

        const lenis = window.lenis;
        if (open && lenis && !lenis.isStopped) {
            menuLenis = lenis;
            menuLenis.stop();
        } else if (!open && menuLenis) {
            menuLenis.start();
            menuLenis = undefined;
        }
    }

    $toggle.on('click', function () {
        setMobileMenu(!$menu.hasClass('open'));
    });

    $backdrop.on('click', function () {
        $toggle.trigger('focus');
        setMobileMenu(false);
    });

    $(document).on('focusin', function (event) {
        if ($menu.hasClass('open') && !$(event.target).closest('.main_nav, .menu_toggle').length) {
            setMobileMenu(false);
        }
    });

    function setNewsDropdown(open) {
        if (mobileLayout.matches || newsOpen === open) return;
        newsOpen = open;
        const duration = reducedMotion.matches ? 0 : 200;
        $newsDropdown.stop(true)[open ? 'slideDown' : 'slideUp'](duration);
    }

    $newsMenu.addClass('dropdown_animated')
        .on('mouseenter focusin', () => setNewsDropdown(true))
        .on('mouseleave', function () {
            if (!$newsMenu.find(':focus').length) setNewsDropdown(false);
        })
        .on('focusout', function (event) {
            if (!$newsMenu.has(event.relatedTarget).length && !$newsMenu.is(':hover')) {
                setNewsDropdown(false);
            }
        });

    $(document).on('keydown', function (event) {
        if (event.key !== 'Escape') return;
        if ($menu.hasClass('open')) {
            $toggle.trigger('focus');
            setMobileMenu(false);
        } else if (newsOpen) {
            if ($newsMenu.find(':focus').length) $newsMenu.children('a').trigger('focus');
            setNewsDropdown(false);
        }
    });

    $(mobileLayout).on('change', function () {
        setMobileMenu(false);
        newsOpen = false;
        $newsDropdown.stop(true, true).css('display', '');
    });

    setMobileMenu(false);

    $(document).on('click', '[data-unavailable]', event => event.preventDefault());

    const $shareToast = $('.share_toast');
    let shareToastTimer;

    window.showToast = function (message) {
        clearTimeout(shareToastTimer);
        $shareToast.text(message).prop('hidden', false);
        shareToastTimer = setTimeout(() => $shareToast.prop('hidden', true), 2200);
    };

    async function copyPageUrl() {
        if (navigator.clipboard?.writeText) {
            try {
                await navigator.clipboard.writeText(location.href);
                return;
            } catch {
                // HTTP 서버나 클립보드 권한 제한에서는 기본 복사 명령을 사용합니다.
            }
        }
        const previousFocus = document.activeElement;
        const $input = $('<textarea>')
            .addClass('clipboard_input')
            .val(location.href)
            .prop({ readOnly: true, tabIndex: -1 })
            .appendTo('body');
        $input.trigger('select');
        try {
            if (!document.execCommand('copy')) throw new Error('URL copy failed');
        } finally {
            $input.remove();
            previousFocus?.focus({ preventScroll: true });
        }
    }

    $(document).on('click', '[data-share]', async function () {
        try {
            await copyPageUrl();
            window.showToast('URL이 복사되었습니다.');
        } catch {
            window.showToast('URL 복사에 실패했습니다. 브라우저 주소창에서 복사해 주세요.');
        }
    });
    if (window.gsap && window.ScrollTrigger) {
        gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', function () {
            const footer = $('.site_footer').get(0);
            if (footer) {
                gsap.fromTo(footer, { '--footer-background-y': '100%' }, {
                    '--footer-background-y': '0%',
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: footer,
                        start: '90% bottom',
                        end: 'bottom bottom',
                        scrub: 1
                    }
                });
            }

            $('.trigger').each(function () {
                const section = this;
                const items = $(section).find('.section_scroll');
                if (!items.length) return;
                gsap.to(items, {
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 70%'
                    },
                    opacity: 1,
                    y: 0,
                    stagger: .1,
                    duration: .6
                });
            });
        });
    }
});
