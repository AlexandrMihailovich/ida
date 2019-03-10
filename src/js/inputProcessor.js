(function($) {
    'use strict';

    var defaulAccepted = function() {

    };

    var defaultRejected = function() {

    };

    var methods = {

        init: function(options) {

            var settings = $.extend( {
                'maxLength'     : 4,
                'regExp'		: /^\d+$/,
                'accepted'		: defaulAccepted,
                'rejected'		: defaultRejected,
            }, options);


            return this.each(attach);

            function attach() {
                var $this = $(this);

                var prevVal = '';

                $this.on('beforeinput', function(e) {
                    prevVal = e.target.value;
                });

                $this.on( "input", function( e ) {
                    var val = e.target.value;

                    if(!val) {
                        return false;
                    }
                    if(!settings.regExp.test(val)) {
                        e.target.value = prevVal;
                        settings.rejected($this, val, prevVal, e)
                    }
                    if(val.length === 4) {
                        $this.next().focus();
                    }
                });
            }
        },

        remove: function() {
            return this.each(function(){
                var $this 			= $(this);

            });
        }
    };

    $.fn.inputProcessor = function(method) {
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Unknown method: ' +  method );
        }
    };

})(jQuery);