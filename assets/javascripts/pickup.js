$(function() {
    var $mapBlock = $('.js-pickup-map');
    var $listBlock = $('.js-pickup-list');

    var currentLinkClass = 'pickup-change-link-current'

    $('.js-pickup-list-on').on('click', function() {
        $('.pickup-change-link-current').removeClass(currentLinkClass);
        $(this).addClass(currentLinkClass);
        $mapBlock.hide();
        $listBlock.fadeIn(300);
        return false;
    })

    $('.js-pickup-map-on').on('click', function() {
        $('.pickup-change-link-current').removeClass(currentLinkClass);
        $(this).addClass(currentLinkClass);
        $listBlock.hide();
        $mapBlock.fadeIn(300);
        return false;
    })
})
