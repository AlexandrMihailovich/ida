import jQuery from 'jquery';

(function($) {
    'use strict';

    var methods = {

        init: function(options) {
            var settings = {
                'container'     : ".notify",
                'title'         : "Title",
                'content'       : "Content"
            };
            settings = $.extend( settings, options);

            return this.each(function() {
                var $this = $(this);

                $this.data('settings', settings);
            });
        },

        show: function(options) {
            return this.each(function(){
                var $this 			= $(this);
                var settings = $this.data('settings');
                var opt = $.extend({}, settings , options);

                var item = $( "<div>" ).addClass('notify__item');
                var itemTitle = $( "<p>" ).addClass('notify__title');
                var itemContent = $( "<p>" ).addClass('notify__content');
                
                itemTitle.text(opt.title).prependTo(item);
                itemContent.text(opt.content).appendTo(item);

                $this.prepend(item);
        
                item.click(function() {
                    item.fadeOut(function() {
                        item.remove();
                    });
                })
        
                setTimeout(function() {
                    item.fadeOut(function() {
                        item.remove();
                    });
                }, 5000);
            });
        }
    };

    $.fn.notify = function(method) {
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Unknown method: ' +  method );
        }
    };

})(jQuery);
