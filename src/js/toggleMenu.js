import jQuery from "jquery";

jQuery(function() {
    jQuery( ".navigation__link-menu" ).click(function (e) {
        jQuery('.navigation__list').toggleClass('navigation__list-show');
    });
});
