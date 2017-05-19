$(function() {
    var $mapBlock = $('.js-pickup-map');
    var $listBlock = $('.js-pickup-list');

    $('.js-pickup-list-on').on('click', function() {
        $mapBlock.hide();
        $listBlock.fadeIn(300);

        return false;
    })

    $('.js-pickup-map-on').on('click', function() {
        $listBlock.hide();
        $mapBlock.fadeIn(300);

        return false;
    })
})
