$(function() {

    // Tabs

    $('.js-tabs').find('.js-tabs-nav > a').on('click', function() {

        var $tabs = $(this).closest('.js-tabs');
        var $tab = $(this);

        var currentTabClass = 'nav__item_current';
        var currentTab = $tab.data('tab');

        $('.js-tabs').find('.js-tabs-nav > a').removeClass(currentTabClass);
        $(this).addClass(currentTabClass);

        $tabs.find('[data-tab-content]').addClass('js-hidden');
        $tabs.find('[data-tab-content="' + currentTab + '"]').removeClass('js-hidden');

        return false;
    });

});
