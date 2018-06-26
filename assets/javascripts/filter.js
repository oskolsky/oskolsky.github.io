$(document).ready(function() {

    // Filter toggle
    $('#js-filter-toggle').on('click', function() {
        var $el = $('#js-filter');
        var isToggleClass = 'isToggle';

        if ($el.hasClass(isToggleClass)) {
            $el.removeClass(isToggleClass);
        } else {
            $el.addClass(isToggleClass);
        }

        return false;
    });
});
