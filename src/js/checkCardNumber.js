import jQuery from 'jquery';

jQuery(function() {
    var $ = jQuery;
    var prev = '';

    $( ".card__input-number" )
        .on( "beforeinput", function( event ) {
            prev = event.target.value;
        })
        .on( "input", function( event ) {
            var $this = $( this );
            console.log($this);
            var reg = /^\d+$/;
            
            if(!event.target.value) {
                return false;
            }
            if(!reg.test(event.target.value)) {
                event.target.value = prev;
            }
            if(event.target.value.length === 4) {
                $this.next(".card__input-number").focus();
            }
        });
});
