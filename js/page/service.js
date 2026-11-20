$(function () {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const $recruitPill = $('.recruit_pill');
    if ($recruitPill.length && window.gsap) {
        gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', function () {
            const content = $recruitPill.children().get();
            gsap.timeline()
                .set($recruitPill.get(0), { '--recruit-inset': 1 })
                .set(content, { autoAlpha: 0, y: 6 }, 0)
                .to($recruitPill.get(0), { '--recruit-inset': 0, duration: 0.55, ease: 'power2.inOut' }, 0.12)
                .to(content, { autoAlpha: 1, y: 0, duration: 0.28, ease: 'power2.out', clearProps: 'opacity,visibility,transform' }, 0.6);
        });
    }

    const footer = $('.site_footer').get(0);
    if ($recruitPill.length && footer && window.ScrollTrigger) {
        function syncRecruitPill(trigger) {
            const hide = trigger.scroll() >= trigger.start;
            $recruitPill.toggleClass('recruit_pill_hidden', hide).prop('inert', hide);
        }

        ScrollTrigger.create({
            trigger: footer,
            start: 'top bottom',
            end: 'bottom top',
            onToggle: syncRecruitPill,
            onRefresh: syncRecruitPill
        });
    }

    function closeQuestion($question, duration) {
        $question.addClass('faq_closing').children('.faq_list_desc').stop(true).slideUp(duration, function () {
            $question.prop('open', false).removeClass('faq_closing');
            $(this).css('display', '');
        });
    }

    $('.faq_list').on('click', 'summary', function (event) {
        event.preventDefault();

        const $question = $(this).parent();
        const duration = reducedMotion.matches ? 0 : 240;

        if ($question.prop('open') && !$question.hasClass('faq_closing')) {
            closeQuestion($question, duration);
            return;
        }

        $question.siblings('details[open]:not(.faq_closing)').each(function () {
            closeQuestion($(this), duration);
        });

        const $answer = $question.children('.faq_list_desc').stop(true);
        if (!$question.prop('open')) {
            $answer.hide();
            $question.prop('open', true);
        }
        $question.removeClass('faq_closing');
        $answer.slideDown(duration);
    });
});
