import jQuery from 'jquery';

jQuery(function() {
    var $ = jQuery;
    var last = '';

    $( ".cart__input-number" )
        .on( "beforeinput", function( event ) {
            last = event.target.value;
            
            console.log('beforeinput', event.target.value);
        })
        .on( "input", function( event ) {
            var $this = $( this );
            
            console.log('input', event.target.value);
            
            var reg = /^\d+$/;
            
            if(!event.target.value) {
                return false;
            }
            if(!reg.test(event.target.value)) {
                event.target.value = last;
            }
            if(event.target.value.length === 4) {
                $this.next().focus();
            }
        });
});
