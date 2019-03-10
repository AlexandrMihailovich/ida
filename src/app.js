import './js/jq-selectmenu';
import './js/unicorns.js';
import './scss/base.scss';

import jQuery from 'jquery';



jQuery(function() {
    jQuery( ".cart__mouth" ).selectmenu({
        classes: {
          "ui-selectmenu-button": "cart__data-select cart__mouth"
        }
      });
    jQuery( ".cart__year" ).selectmenu({
        classes: {
          "ui-selectmenu-button": "cart__data-select cart__year"
        }
      });
});
