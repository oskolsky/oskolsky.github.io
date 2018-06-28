$(function() {

    // Tabs

    // Toggle dropdown for table and phone versions

    $('.js-tabs-toggle').on('click', function() {

        var $tabs = $(this).closest('.js-tabs');
        var isToggleClass = 'isToggle';

        if ($tabs.hasClass(isToggleClass)) {
            $tabs.removeClass(isToggleClass);
        } else {
            $tabs.addClass(isToggleClass);
        }

        return false;
    });

    // Change tab

    $('.js-tabs-link').on('click', function() {
        var $tabs = $(this).closest('.js-tabs');

        // Select current item

        var $currentItem = $(this).closest('.js-tabs-item');
        var currentItemClass = 'nav__item_current';

        $('.js-tabs-item').removeClass(currentItemClass);
        $currentItem.addClass(currentItemClass);

        // Insert caption text in toggle element

        var $toggle = $tabs.find('.js-tabs-toggle');
        var currentTabCaption = $(this).text();
        $toggle.text(currentTabCaption);

        // Open tab content

        var currentTab = $(this).data('tab');

        $('[data-tab-content]').addClass('js-hidden');
        $('[data-tab-content="' + currentTab + '"]').removeClass('js-hidden');

        // Close ropdown

        $tabs.removeClass('isToggle');

        return false;
    });

});
