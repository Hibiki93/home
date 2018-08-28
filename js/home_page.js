window.onscroll = function() {
    myFunction();
};

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function myFunction() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("fixed_top");
    } else {
        navbar.classList.remove("fixed_top");
    }
}

(function($) {
    $(".overlay_detail a").on("click", function(event) {
        console.log('I am runing')
        var hash = this.hash;
        if (hash) {
            event.preventDefault();
            $("html, body").animate({
                    scrollTop: $(hash).offset().top
                },
                800,
                function() {
                    window.location.hash = hash;
                }
            );
        }
    });
})(jQuery);

function show_sidebar(e) {
    $("#sidebar").toggleClass("show");
    $(".overlay").toggleClass("show");
}