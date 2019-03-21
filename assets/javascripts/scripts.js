$(function () {

    var slider = $('.js-carousel-promo'),
        stop = 'intro-slider__animate--stop',
        items;

    // var lazyLoad = Helper.lazyLoad();

    var currentPageIndex, prevPageIndex = -1;

    if (slider.length) {
        slider.owlCarousel({
            items: 1,
            loop: true,
            mouseDrag: false,
            nav: true,
            // lazyLoad: true,

            /*autoplay: true,*/
            autoplayTimeout: 4000,
            autoplaySpeed: 1000,
            /*autoplayHoverPause: true,*/
            useElapsedTime: false,

            onTranslate: () => {
                slider.trigger('stop.owl.autoplay');
            },
            onTranslated: (e) => {
                slider.find('.owl-item:not(.current)').removeClass('forward backward');

                // Если есть лезилоад на изображениях
                // if (window.isSupportObjectFit) {
                    // Если текущий слайд загрузился, запускаем перелистывание
                    // if (slider.find('.active').find('.lazyload').length === 0) slider.trigger('play.owl.autoplay');
                // } else {
                    slider.trigger('play.owl.autoplay');
                // }

                setStop();
            },
            onInitialized: onInitialized,
            onLoadedLazy: onLoadedLazy,
            onActive: (e) => {
                var nextSrc = e.nextSlide.find('.intro-slider__template-img').attr('src'),
                    allNext = slider.find(`img[src="${nextSrc}"]`).closest('.owl-item');
                slider.find('.owl-item').removeClass('current');
                allNext.addClass('current');

                currentPageIndex = e.nextSlide.data('index') === undefined ? 0 : e.nextSlide.data('index');

                /*console.table({
                    "prevPageIndex": prevPageIndex,
                    "currentPageIndex": currentPageIndex,
                    "e.page.count": e.page.count,
                });*/

                if ((prevPageIndex < currentPageIndex && !(prevPageIndex === 0 && currentPageIndex === e.page.count - 1)) || (prevPageIndex === e.page.count - 1 && currentPageIndex === 0)) {
                    /*console.log(`Инерция спереди назад`);*/
                    if (!allNext.hasClass('backward')) { // При переключении слайд меняется на другой, поэтому этот же слайд не может двинуться в другую сторону
                        allNext.addClass('forward');
                    }
                } else {
                    /*console.log(`Инерция сзади вперёд`);*/
                    if (!allNext.hasClass('forward')) {
                        allNext.addClass('backward');
                    }
                }
                prevPageIndex = currentPageIndex;
            },
        });

        slider.on('changed.owl.carousel', function (property) {
            window.introSlider = property.item.index - 1;
        });

        function onLoadedLazy(event) {
            console.log(event);
        }

        function onInitialized() {
            // console.log(`onInitialized`);
            items = slider.find('.owl-item').not('.cloned');
            // Расставляем индексы на слайды для навигации (считаем, что слайды с одинаковыми фото - одинаковые)
            items.each((i, e) => {
                const currentSlide = $(e),
                    currentSrc = currentSlide.find('.intro-slider__template-img').attr('src'),
                    similarSlides = slider.find('.intro-slider__template-img').filter(`[src="${currentSrc}"]`).closest(".owl-item");
                similarSlides.attr('data-index', i);
            });

            setStop();
            /*slider.find('.lazyload').each((i,e) => {
                $(e).removeAttr('data-no-lazyload');
            });*/
            /*lazyLoad.init(slider.find('.lazyload'));*/
        }

        /**
         * Остановить анимацию
         */
        function setStop() {
            // lazyLoad.init(slider.find('.current').find('.lazyload'), {
            //     callback: (element) => {
            //         slider.trigger('play.owl.autoplay');
            //     }
            // });
            var currentItem = items.filter('.active').find('.intro-slider__animate');
            setTimeout(() => {
                currentItem.addClass(stop);
            }, 1000);
        }

        // Определяем поддержку свойства object-fit в браузере и при необходимосте делаем fallback
        window.isSupportObjectFit = () => document.createElement("detect").style.objectFit === "";
        // console.log(window.isSupportObjectFit)
        // console.log(document.createElement("detect").style.objectFit === "")

        if (!window.isSupportObjectFit) {
            const pictures = slider.find('.intro-slider__template');
            var $container, imgUrl, imgSrc;
            pictures.each((indx, elem) => {
                $container = $(elem);
                imgSrc = $container.find("img").prop("src");
                imgUrl = imgSrc !== '' ? imgSrc : $container.find("img").data("src");
                if (imgUrl) {
                    $container.css("backgroundImage", 'url(' + imgUrl + ')').addClass("intro-slider__template--bg");
                }
            });
        }

        /**
         * Останавливаем автоперелистывание при наведении на элементы управления
         * Если меньше чем через секунду после mouseleave произошёл mouseenter на любой элемент, событие mouseleave не сработает
         * Таким образом исключается ситуация, когда mouseleave с предыдущего элемента происходит позже mouseenter на новый элемент
         */
        var mouseleaveTimeout = [];
        slider.find('.owl-prev, .owl-next, .owl-dot, .button')
            .on('mouseenter ', (e) => {
                /*console.log(`mouseenter`, $(e.target));*/
                slider.trigger('stop.owl.autoplay');
                if (mouseleaveTimeout.length !== 0) {
                    mouseleaveTimeout.forEach(clearTimeout);
                    mouseleaveTimeout = [];
                }
            })
            .on('mouseleave', (e) => {
                var currentTimeout = setTimeout(function () {
                    /*console.log(`mouseleave`, $(e.target));*/
                    slider.trigger('play.owl.autoplay');
                }, 1000);
                mouseleaveTimeout.push(currentTimeout);
            });

        // $(document).on('scroll', function () {
        //     lazyLoad.init(slider.find('.current').find('.lazyload'), {
        //         callback: (element) => {
        //             slider.trigger('play.owl.autoplay');
        //         }
        //     });
        // });

        !!window.xBork && !!window.xBork.init && window.xBork.init($('.owl-item'));
    }
});
