$(function() {

    $('#js-video-dialog-open').on('click', function() {
        $('#js-video-dialog').arcticmodal({
            overlay: {
                css: {
                    opacity: .75,
                },
            },
            afterClose: function() {
                $('#js-video')[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
            },
        });

        return false;
    });

    $('#js-review-dialog-open').on('click', function() {
        $('#js-review-dialog').arcticmodal({
            overlay: {
                css: {
                    opacity: .75,
                },
            },
            afterOpen: function() {
                $('.js-input-phone').mask('+7 (999) 999-9999');
            },
        });

        return false;
    });

    $('#js-thanks-dialog-open').on('click', function() {
        $('#js-thanks-dialog').arcticmodal({
            overlay: {
                css: {
                    opacity: .75,
                },
            },
            beforeOpen: function() {
                $('#js-review-dialog').arcticmodal('close');
            },
        });

        return false;
    });

});
