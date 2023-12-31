//

(function ($, sr) {
  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
    var timeout;
    return function debounced() {
      var obj = this,
        args = arguments;
      function delayed() {
        if (!execAsap) func.apply(obj, args);
        timeout = null;
      }
      if (timeout) clearTimeout(timeout);
      else if (execAsap) func.apply(obj, args);
      timeout = setTimeout(delayed, threshold || 100);
    };
  };
  // smartresize
  jQuery.fn[sr] = function (fn) {
    return fn ? this.bind("resize", debounce(fn)) : this.trigger(sr);
  };
})(jQuery, "smartresize");

$(function () {
  // Fix the Home Height

  var setHomeBannerHeight = function () {
    var homeHeight = $(window).height();
    $("#overlay-1").height(homeHeight);
  };
  setHomeBannerHeight();

  // Arrow drop effect

  // Smooth Scrolling and remove Hash tag from link

  $("a[href*='#']:not([href='#'])").click(function () {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html,body").animate(
          {
            scrollTop: target.offset().top,
          },
          1000,
          function () {}
        );
        return false;
      }
    }
  });

  ///////////////////////////////
  // Center Home Slideshow Text
  ///////////////////////////////

  jQuery(window).smartresize(function () {
    setHomeBannerHeight();
    // centerHomeBannerText();
  });
});

$(function () {

  // filter functions
  var filterFns = {
    // show if number is greater than 50
    numberGreaterThan50: function () {
      var number = $(this).find(".number").text();
      return parseInt(number, 10) > 50;
    },
    // show if name ends with -ium
    ium: function () {
      var name = $(this).find(".name").text();
      return name.match(/ium$/);
    },
  };

  // bind filter button click
  $("#filters").on("click", "button", function () {
    var filterValue = $(this).attr("data-filter");
    // use filterFn if matches value
    filterValue = filterFns[filterValue] || filterValue;
    $container.isotope({ filter: filterValue });
  });

  // bind sort button click
  $("#sorts").on("click", "button", function () {
    var sortByValue = $(this).attr("data-sort-by");
    $container.isotope({ sortBy: sortByValue });
  });

  // change is-checked class on buttons
  $(".button-group").each(function (i, buttonGroup) {
    var $buttonGroup = $(buttonGroup);
    $buttonGroup.on("click", "button", function () {
      $buttonGroup.find(".is-checked").removeClass("is-checked");
      $(this).addClass("is-checked");
    });
  });
});

$(window).ready(function () {
  $("#pre-status").fadeOut();
  $("#tt-preloader").delay(350).fadeOut("slow");
});
