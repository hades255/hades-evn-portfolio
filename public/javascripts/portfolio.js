$(document).ready(function () {
  (function () {
    var $grid = $("#grid");
    $grid.shuffle({ itemSelector: ".portfolio-item" });
    $("#filter a").click(function (e) {
      e.preventDefault();
      $("#filter a").removeClass("active");
      $(this).addClass("active");
      var groupName = $(this).attr("data-group");
      $grid.shuffle("shuffle", groupName);
    });
  })();
  (function () {
    $(".image-link").magnificPopup({
      gallery: { enabled: true },
      removalDelay: 300,
      mainClass: "mfp-with-zoom",
      type: "image",
    });
  })();
});
