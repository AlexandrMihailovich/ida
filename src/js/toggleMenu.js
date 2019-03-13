import jQuery from "jquery";

jQuery(function() {
    jQuery( ".navigation__link-menu" ).click(function () {
        jQuery('.navigation__list').toggleClass('navigation__list-show');
    });
});
