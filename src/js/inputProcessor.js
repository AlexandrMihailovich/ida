/*!
 * InputProcessor v 0.0.1
 */

import jQuery from 'jquery';

(function($) {
    'use strict';
    var   EMPTY_VALUE = 'EMPTY_VALUE',
            SHORT_VALUE = 'SHORT_VALUE',
            LONG_VALUE  = 'LONG_VALUE',
            REG_ERROR   = 'REG_ERROR',
            ACCEPTED    = 'ACCEPTED';

    var defaultHandler = function (element, val, prevVal, e) {
        //console.log(element, val, prevVal, e);
    };

    function test(val, prevVal, settings, $this, regExp) {

        if(!val) {
            settings.emptyValue($this, val, prevVal);
            return EMPTY_VALUE;
        }

        if(!regExp.test(val)) {
            settings.regExpError($this, val, prevVal);
            return REG_ERROR;
        }

        if(val.length > settings.maxLength) {
            settings.overLength($this, val, prevVal);
            return LONG_VALUE;
        }
        if(val.length < settings.minLength) {
            settings.shortLength($this, val, prevVal);
            return SHORT_VALUE;
        }

        return ACCEPTED;
    }

    var methods = {

        init: function(options) {
            var settings = {
                'maxLength'     : 4,
                'minLength'     : 4,
                'processRegExp'	: /^\d+$/,
                'testRegExp'    : /^\d+$/,
                'accepted'		: defaultHandler,
                'rejected'		: defaultHandler,
                'regExpError'	: defaultHandler,
                'reachEnd'      : defaultHandler,
                'shortLength'   : defaultHandler,
                'overLength'    : defaultHandler,
                'emptyValue'    : defaultHandler
            };
            settings = $.extend( settings, options);

            return this.each(function() {
                var $this = $(this);
                $this.data('settings', settings);

                var prevVal = $this.val();

                $this.on( "input", function( e ) {
                    //console.log('EVENT:', 'input');
                    var val = e.target.value;

                    var result = test($this.val(), $this.val(), settings, 
                                      $this, settings.processRegExp);

                    switch (result) {
                        case EMPTY_VALUE:
                            prevVal = e.target.value;
                            break;
                        case REG_ERROR:
                            e.target.value = prevVal;
                            settings.rejected($this, val, prevVal);
                            break;
                        case LONG_VALUE:
                            settings.rejected($this, val, prevVal);
                            break;
                        case SHORT_VALUE:
                            settings.accepted($this, val, prevVal, e);
                            break;
                        case ACCEPTED:
                            settings.reachEnd($this, val, prevVal);
                            settings.accepted($this, val, prevVal, e);
                            break;
                        default:
                            settings.accepted($this, val, prevVal, e);
                            break;
                    }

                    prevVal = e.target.value;
                });

                $this.on("change blur", function (e) {
                    //console.log('EVENT:', 'change blur');
                    var result = test($this.val(), $this.val(), settings, $this, settings.testRegExp);
                    if(result === ACCEPTED) {
                        //console.log('SUCCESS', $this);
                        settings.accepted($this, $this.val(), prevVal, e);
                    } else {
                        //console.log('ERROR', result, $this);
                        settings.rejected($this, $this.val(), prevVal, e);
                    }
                })
            });
        },

        test: function(options) {
            return this.each(function(){
                var $this 			= $(this);
                var settings = $this.data('settings');
                var opt = $.extend({
                    'success'		: function ($this) {
                        //console.log('SUCCESS', $this);
                    },
                    'error'		    : function ($this, result) {
                        //console.log('ERROR', result, $this);
                    }
                    }, settings , options);
                //console.log(opt);

                var result = test($this.val(), $this.val(), opt, $this, settings.testRegExp);
                if(result === ACCEPTED) {
                    settings.accepted($this, $this.val(), $this.val());
                    opt.success($this);
                } else {
                    settings.rejected($this, $this.val(), $this.val());
                    opt.error($this, result);
                }

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
