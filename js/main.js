(function () {

    // Burger menu

    document.addEventListener('click', burgerInit);

    function burgerInit(event) {
        const target = event.target;
        const burgerIcon = target.closest('.burger-icon') // Провреряет есть ли родитель с классом burger-icon
        const burgerNavLink = target.closest('.nav__link'); // Вернет сам элемент если его указать

        if (document.documentElement.clientWidth > 900) { // Если ширина больше 900 прерываем функцию
            return;
        };

        if (!burgerIcon && !burgerNavLink) return;

        document.body.classList.toggle('body--opened-menu');
    }

    // Modal

    document.addEventListener('click', openModal);
    document.addEventListener('keydown', openModal);

    function openModal(event) {
        const body = document.body;
        const target = event.target;
        const giftIcon = target.closest('.about__img-button');
        const cancelIcon = target.closest('.modal__cancel');

        if (giftIcon) {
            event.preventDefault();
            body.classList.add('body--opened-modal');
        }

        if (body.classList.contains('body--opened-modal') && (cancelIcon ||
            target.classList.contains('modal') || event.key === 'Escape')) {
            event.preventDefault();
            body.classList.remove('body--opened-modal');
        }
    }

    // Tab-buttons

    const tabControls = document.querySelector('.tab-controls');

    tabControls.addEventListener('click', toggleTab);

    function toggleTab(event) {
        const tabControl = event.target.closest('.tab-controls__link');
        event.preventDefault();

        if (!tabControl || tabControl.classList.contains('tab-controls__link--active')) return;

        const tabContentID = tabControl.getAttribute('href');
        const tabContent = document.querySelector(tabContentID);
        const activeContent = document.querySelector('.tab-content--show');
        const activeControl = document.querySelector('.tab-controls__link--active');

        if (activeContent) {
            activeContent.classList.remove('tab-content--show');
        }
        tabContent.classList.add('tab-content--show');

        if (activeControl) {
            activeControl.classList.remove('tab-controls__link--active');
        }
        tabControl.classList.add('tab-controls__link--active');
    }

    // Accordion

    const accordionLists = document.querySelectorAll('.accordion-list');

    accordionLists.forEach(el => {

        // const accordionOpened = document.querySelector('.accordion-list__item--opened .accordion-list__content');
        // if (accordionOpened) {
        //     accordionOpened.style.maxHeight = accordionOpened.scrollHeight + 'px';
        // } 
        // Это блок для дизайна где есть открытый аккордион изначально

        el.addEventListener('click', (event) => {

            const accordionList = event.currentTarget; // Элемент, на который навесили слушатель
            const accordionOpenedItem = accordionList.querySelector('.accordion-list__item--opened'); // Аккордион который открыт
            const accordionOpenedContent = accordionList.querySelector('.accordion-list__item--opened .accordion-list__content')  // Его контент

            const accordionControl = event.target.closest('.accordion-list__control');

            if (!accordionControl) return;
            event.preventDefault();
            const accordionItem = accordionControl.parentElement; // Выбираем item выше кнопки, аккорион по которому мы тыкнули
            const accordionContent = accordionControl.nextElementSibling; // Выбираем контент ниже кнопки

            if (accordionOpenedItem && accordionItem != accordionOpenedItem) { // Это уже функционал для закрытия другого аккордиона при открытии другого
                accordionOpenedItem.classList.remove('accordion-list__item--opened');
                accordionOpenedContent.style.maxHeight = null;
            }

            accordionItem.classList.toggle('accordion-list__item--opened');

            if (accordionItem.classList.contains('accordion-list__item--opened')) {
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
                // Записывает полную высоту содержимого, даже если оно скрыто
                // overflow: hidden или max-height: 0

            } else {
                accordionContent.style.maxHeight = null;
            }
        });
    });

    // Слайдер-фотогаллерея

    new Swiper('.gallery__slider', {
        spaceBetween: 15, // расстояние между слайдами
        slidesPerView: 1.5, // количество слайдов которое видно

        pagination: {
            el: '.gallery__pagination',
            type: 'fraction',
        },

        navigation: {
            nextEl: '.gallery__next',
            prevEl: '.gallery__prev',
        },

        breakpoints: {
            601: {
                slidesPerView: 3,
            },
            801: {
                spaceBetween: 32,
            },
            1101: { // 1101 и больше, включая 1101
                slidesPerView: 4,
            }
        },
        mousewheel: { // делает прокрутку слайдера с помощью тачпада
            forceToAxis: true,
            releaseOnEdges: true,
            sensitivity: 0.00001,
            thresholdDelta: 10,
            thresholdTime: 200,
        }
    });

    // Слайдер-отзывы

    new Swiper('.testimonials__slider', {
        initialSlide: 1, // номер слайда, который будет отображаться сначала (начинается с 0)
        spaceBetween: 0, // расстояние между слайдами
        slidesPerView: 1, // количество слайдов которое видно
        centeredSlides: true, // раземещает активный слайд по центру

        navigation: {
            nextEl: '.testimonials__next',
            prevEl: '.testimonials__prev',
        },

        scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true,
        },
        breakpoints: {
            901: {
                slidesPerView: 1.5,
            },
            1201: { // 1101 и больше, включая 1101
                slidesPerView: 2.1,
            }
        },
        mousewheel: { // делает прокрутку слайдера с помощью тачпада
            forceToAxis: true,
            releaseOnEdges: true,
            sensitivity: 0.00001,
            thresholdDelta: 10,
            thresholdTime: 200,
        }
    });

    // Маска для телефона

    const telInputs = document.querySelectorAll('input[type="tel"]');
    const im = new Inputmask('+7 (999) 999-99-99');
    im.mask(telInputs);
})()