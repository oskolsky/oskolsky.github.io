$(function() {
    // Mask input
    $('#js-input-phone').mask('+7 (999) 999-9999');

    // Scroll to bottom
    $('#scroll-to-bottom').click(function() {
        $('html, body').animate({ scrollTop: $(document).height() }, 'slow');
        return false;
    });

    // Send form demo
    var $form = $('#js-form');
    var $complete = $('#js-complete');

    $('#js-send').on('click', function() {
        $form.hide();
        $complete.fadeIn(300);
        return false;
    });

    setTimeout(function() {
        $complete.hide();
        $form.fadeIn(300);
    }, 5000)
});
