$(function() {
    // Mask input
    $('#js-input-phone').mask('+7 (999) 999-9999');

    // Scroll to bottom
    $('#scroll-to-bottom').click(function() {
        $('html, body').animate({ scrollTop: $(document).height() }, 'slow');
        return false;
    });
});
