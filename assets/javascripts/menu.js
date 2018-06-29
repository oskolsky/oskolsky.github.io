$(function() {

    function openMenu() {
        $('#js-menu').removeClass('js-hidden');
    }

    function closeMenu() {
        $('#js-menu').addClass('js-hidden');
    }

    // Toggle menu

    $('#js-menu-open').on('click', function() {
        openMenu();
        return false;
    });

    $('#js-menu-close').on('click', function() {
        closeMenu();
        return false;
    });

    $(document).keyup(function(e) {
        if (e.keyCode == 27) {
            closeMenu();
        }
    });
});
