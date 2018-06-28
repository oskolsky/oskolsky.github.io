$(function() {

    // Stars raty
    $('.js-stars').raty({
        starOff: 'assets/images/star-off.svg',
        starOn: 'assets/images/star-on.svg',
        width: 115,
    });

    $('.js-stars-readonly').raty({
        starOff: 'assets/images/star-off.svg',
        starOn: 'assets/images/star-on.svg',
        width: 115,
        score: function() {
            return $(this).attr('data-score');
        },
        readOnly: true,
    });

});
