$(function() {
    // Header size init
    $('#header').height($( window ).height());

    // Mask input
    $('#js-input-phone').mask('+7 (999) 999-9999');
});

$(window).resize(function() {
    // Header size init
    $('#header').height($( window ).height());
});
