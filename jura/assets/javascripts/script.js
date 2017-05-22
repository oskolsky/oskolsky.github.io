$(function() {
    // Mask input
    $('#js-input-phone').mask('+7 (999) 999-9999');

    // Scroll to bottom
    $('#scroll-to-bottom').click(function() {
        $('html, body').animate({ scrollTop: $(document).height() }, 'slow');
        return false;
    });

    // Send form demo
    $('#js-send').on('click', function() {
        var $form = $('#js-form');
        var $complete = $('#js-complete');

        $form.hide();
        $complete.fadeIn(300);

        setTimeout(function() {
            $complete.hide();
            $form.fadeIn(300);
        }, 5000);

        return false;
    });
});
