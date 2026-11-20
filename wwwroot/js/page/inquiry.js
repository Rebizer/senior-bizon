$(function () {
    const $form = $('.inquiry_form');
    const $panel = $('#inquiry');
    const $loading = $('.inquiry_loading');
    const $submitButton = $form.find('.form_submit');
    const $phone = $form.find('[name=phone]');
    const $tabs = $('[role="tab"][data-contact]');
    const $header = $('.site_header');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const types = {
        exam: ['자영업지도사\n응시 문의', '자격과 시험 준비가 궁금하다면 내용을 남겨주세요.\n확인된 시험 정보와 준비 절차를 안내해 드립니다.', '응시 안내 신청하기'],
        education: ['오프라인\n창업교육 신청', '관심 있는 정책 주제를 선택하고 신청해 주세요.\n교육 참여 방법을 안내해 드립니다.', '무료교육 신청하기'],
        product: ['실버 헬스케어\n제품 문의', '관심 있는 제품과 궁금한 내용을 남겨주세요.\n확인 후 제품 정보를 안내해 드립니다.', '제품 문의하기'],
        partner: ['시니어비즈온\n파트너 참여 신청', '시니어비즈온과 함께하는 활동이 궁금하다면 신청해 주세요.\n활동 내용과 참여 조건을 안내해 드립니다.', '파트너 참여 신청하기'],
        general: ['일반 문의', '시니어비즈온에 궁금한 점을 남겨주세요.\n내용을 확인한 뒤 안내해 드립니다.', '문의하기']
    };
    let contactType;
    let scrollFrame;
    let submitting = false;

    function scrollToField($target, headerAdjustment = 50) {
        cancelAnimationFrame(scrollFrame);
        const lenis = window.lenis;
        lenis?.stop();
        scrollFrame = requestAnimationFrame(() => {
            const top = $target.offset().top + headerAdjustment - $header.outerHeight();
            if (lenis) {
                lenis.resize();
                lenis.scrollTo(top, {
                    force: true,
                    duration: 1.5,
                    immediate: reducedMotion.matches,
                    onComplete: () => lenis.start()
                });
            } else {
                window.scrollTo({
                    top,
                    behavior: reducedMotion.matches ? 'instant' : 'smooth'
                });
            }
        });
    }

    function setContact(type, updateUrl) {
        if (!Object.hasOwn(types, type)) return;
        contactType = type;
        const data = types[contactType];
        $('[data-form-title]').text(data[0]);
        $('[data-form-desc]').text(data[1]);
        $submitButton.text(data[2]);
        const $selectedTab = $tabs.filter('[data-contact="' + contactType + '"]');
        $tabs.attr({
            id() {
                return 'contact_type_' + $(this).attr('data-contact');
            },
            'aria-selected': 'false'
        }).prop('tabIndex', -1);
        $selectedTab.attr('aria-selected', 'true');
        ($selectedTab.length ? $selectedTab : $tabs.first()).prop('tabIndex', 0);
        $panel.attr('aria-label', data[0].replace('\n', ' '));
        $('.education_fields').prop('hidden', contactType !== 'education');
        $('.product_field').prop('hidden', contactType !== 'product');
        $('#product_name').prop('required', contactType === 'product').prop('disabled', contactType !== 'product');
        $('[name=topic]').prop('disabled', contactType !== 'education');
        $('.form_status').text('');
        $panel.prop('hidden', false);
        if (updateUrl) history.replaceState(null, '', location.pathname + '?type=' + contactType + '#inquiry');
    }

    const params = new URLSearchParams(location.search);
    setContact(params.get('type'), false);
    $('#product_name').val(params.get('product') || '');
    if (contactType) scrollToField($panel);

    $('[data-contact]').on('click', function () {
        if (submitting) return;
        window.lenis?.stop();
        setContact($(this).attr('data-contact'), true);
        scrollToField($panel);
    });

    $tabs.on('keydown', function (event) {
        const index = $tabs.index(this);
        let nextIndex;
        if (event.key === 'ArrowRight') nextIndex = (index + 1) % $tabs.length;
        else if (event.key === 'ArrowLeft') nextIndex = (index + $tabs.length - 1) % $tabs.length;
        else return;
        event.preventDefault();
        const $nextTab = $tabs.eq(nextIndex);
        $nextTab.get(0).focus({ preventScroll: true });
        setContact($nextTab.attr('data-contact'), true);
        scrollToField($panel);
    });

    function invalid($field, message) {
        window.showToast(message);
        const field = $field.get(0);
        const $legend = $field.closest('fieldset').children('legend');
        const $label = $(field.labels).first();
        let $target = $label.length ? $label : $field;
        if ($legend.length) $target = $legend;

        field.focus({ preventScroll: true });
        scrollToField($target, -24);
    }

    $phone.on('input', function (event) {
        const value = $phone.val();
        const digits = value.replace(/\D/g, '');
        const inputType = event.originalEvent?.inputType ?? '';
        const deleting = inputType.startsWith('delete');
        let formatted = digits;

        if (digits.startsWith('010')) {
            const middle = digits.slice(3, 7);
            const last = digits.slice(7, 11);
            formatted = '010-' + middle;
            if (middle.length === 4) formatted += '-' + last;
            if (deleting) formatted = formatted.replace(/-$/, '');
        }
        if (value === formatted) return;

        let digitsBeforeCaret = value.slice(0, this.selectionStart).replace(/\D/g, '').length;
        let caret = 0;
        while (caret < formatted.length && digitsBeforeCaret > 0) {
            if (formatted[caret] !== '-') digitsBeforeCaret--;
            caret++;
        }
        if (inputType !== 'deleteContentBackward' && formatted[caret] === '-') caret++;
        $phone.val(formatted);
        this.setSelectionRange(caret, caret);
    });

    $form.on('submit', async event => {
        event.preventDefault();
        if (submitting) return;
        const $name = $form.find('[name=name]');
        const $product = $form.find('[name=product]');
        const $consent = $form.find('[name=consent]');
        if (!$name.val().trim()) return invalid($name, '이름을 입력해 주세요.');
        if (!$phone.prop('validity').valid) {
            return invalid($phone, '연락처를 올바르게 입력해 주세요.');
        }
        if (contactType === 'education' && !$form.find('[name=topic]:checked').length) {
            return invalid($form.find('[name=topic]').first(), '관심 정책 주제를 하나 이상 선택해 주세요.');
        }
        if (contactType === 'product' && !$product.val().trim()) return invalid($product, '관심 제품을 입력해 주세요.');
        if (!$consent.prop('checked')) return invalid($consent, '개인정보 수집 및 이용에 동의해 주세요.');

        submitting = true;
        $loading.prop('hidden', false);
        $submitButton.prop('disabled', true);
        $form.attr('aria-busy', 'true');
        window.lenis?.stop();
        try {
            // 접수 API 미제공: 로딩 상태만 시연하며 입력값은 전송하지 않습니다.
            await new Promise(resolve => setTimeout(resolve, 800));
            window.showToast('입력 내용을 확인했습니다. 실제 접수 기능은 연결 전입니다.');
        } finally {
            $loading.prop('hidden', true);
            $submitButton.prop('disabled', false);
            $form.removeAttr('aria-busy');
            submitting = false;
            window.lenis?.start();
        }
    });
});
