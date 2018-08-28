(function($) {
    $.fn.countTo = function(options) {
        options = options || {};

        return $(this).each(function() {
            // set options for current element
            var settings = $.extend({},
                $.fn.countTo.defaults, {
                    from: $(this).data("from"),
                    to: $(this).data("to"),
                    speed: $(this).data("speed"),
                    refreshInterval: $(this).data("refresh-interval"),
                    decimals: $(this).data("decimals")
                },
                options
            );

            // how many times to update the value, and how much to increment the value on each update
            var loops = Math.ceil(settings.speed / settings.refreshInterval),
                increment = (settings.to - settings.from) / loops;

            // references & variables that will change with each update
            var self = this,
                $self = $(this),
                loopCount = 0,
                value = settings.from,
                data = $self.data("countTo") || {};

            $self.data("countTo", data);

            // if an existing interval can be found, clear it first
            if (data.interval) {
                clearInterval(data.interval);
            }
            data.interval = setInterval(updateTimer, settings.refreshInterval);

            // initialize the element with the starting value
            render(value);

            function updateTimer() {
                value += increment;
                loopCount++;

                render(value);

                if (typeof settings.onUpdate == "function") {
                    settings.onUpdate.call(self, value);
                }

                if (loopCount >= loops) {
                    // remove the interval
                    $self.removeData("countTo");
                    clearInterval(data.interval);
                    value = settings.to;

                    if (typeof settings.onComplete == "function") {
                        settings.onComplete.call(self, value);
                    }
                }
            }

            function render(value) {
                var formattedValue = settings.formatter.call(self, value, settings);
                $self.html(formattedValue);
            }
        });
    };

    $.fn.countTo.defaults = {
        from: 0, // the number the element should start at
        to: 0, // the number the element should end at
        speed: 1000, // how long it should take to count between the target numbers
        refreshInterval: 100, // how often the element should be updated
        decimals: 0, // the number of decimal places to show
        formatter: formatter, // handler for formatting the value before rendering
        onUpdate: null, // callback method for every time the element is updated
        onComplete: null // callback method for when the element finishes updating
    };

    function formatter(value, settings) {
        return value.toFixed(settings.decimals);
    }
})(jQuery);

jQuery(function($) {
    // custom formatting example
    $(".count-number").data("countToOptions", {
        formatter: function(value, options) {
            return value
                .toFixed(options.decimals)
                .replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
        }
    });

    // start all the timers
    $(".timer").each(count);

    function count(options) {
        var $this = $(this);
        options = $.extend({}, options || {}, $this.data("countToOptions") || {});
        $this.countTo(options);
    }
});

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

function show_sidebar(e) {
    $("#sidebar").toggleClass("show");
    $(".overlay").toggleClass("show");
}

let names = ["AirCon Services","Building & Cement Works","CCTV, Alam & Autogate","Ceramic & Tiling Shop","Construction Repair","Curtain Carpet Furniture","Customize Furniture","Door & Wood","Electrical & Plumbing","Feng Shui Consultant","Furniture Shop","Gallery Art","Hardware","Home Electrical & Reapair","Home Internet System","Home Mover",
"Home Theater/Karaoke/Hi-end","Interior Designer Firm","Iron & Metal","Kitchen & Bathroom","Landscape & Gardening","Lighting Decoration","Locksmith","One Stop Renovation","Painting & Services","Pest Control","Other"
]

//Find the input search box
let search = document.getElementById("search_category")

//Find every item inside the dropdown
let items = document.getElementsByClassName("dropdown-item")
function buildDropDown(values) {
    let contents = []
    for (let name of values) {
        contents.push('<input type="button" class="dropdown-item" type="button" value="' + name + '"/>')
    }
    $('#menuItems').append(contents.join(""))

    $('#dropdown_category').text($('.dropdown-item')[0].value)
    //Hide the row that shows no items were found
    $('#empty').hide()
}

//Capture the event when user types into the search box
window.addEventListener('input', function () {
    filter(search.value.trim().toLowerCase())
})

//For every word entered by the user, check if the symbol starts with that word
//If it does show the symbol, else hide it
function filter(word) {
    let length = items.length
    let collection = []
    let hidden = 0
    for (let i = 0; i < length; i++) {
        if (items[i].value.toLowerCase().startsWith(word)) {
            $(items[i]).css({display: 'block'})
        }
        else {
            $(items[i]).css({display: 'none'})
            hidden++
        }
    }

    //If all items are hidden, show the empty view
    if (hidden === length) {
        $('#empty').show()
    }
    else {
        $('#empty').hide()
    }
}

//If the user clicks on any item, set the title of the button as the text of the item
$('#menuItems').on('click', '.dropdown-item', function () {
    $('#dropdown_category').text($(this)[0].value)
    $("#dropdown_category").dropdown('toggle');
    $('#search_category').val("")
    filter("")
})
buildDropDown(names)