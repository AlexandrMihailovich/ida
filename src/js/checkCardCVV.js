import jQuery from 'jquery';

jQuery(function() {
    var $ = jQuery;
    var prev = '';

    $( ".card__input-cvv" )
        .on( "input", function( event ) {
            var $this = $( this );

            var reg = /^\d+$/;

            if(!event.target.value) {
                return false;
            }
            if(!reg.test(event.target.value)) {
                event.target.value = prev;
            }
            prev = event.target.value;
        });
});
