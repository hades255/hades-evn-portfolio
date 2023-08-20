$(document).ready(function () {
  var $grid = $("#grid");
  $grid.imagesLoaded(function () {
    $grid.masonry({
      itemSelector: ".grid-item",
      columnWidth: 200,
    });
    $grid.shuffle({ itemSelector: ".portfolio-item" });
  });

  $("#filter a").click(function (e) {
    e.preventDefault();
    $("#filter a").removeClass("active");
    $("#more-filter").addClass("d-none");
    $(this).addClass("active");
    var groupName = $(this).attr("data-group");
    $grid.shuffle("shuffle", groupName);
  });

  $("#more-filters").change(function (e) {
    if (e.target.value === "") return;
    $("#filter a").removeClass("active");
    $("#more-filter a").text(e.target.value);
    $("#more-filter").removeClass("d-none");
    $("#more-filter a").addClass("active");
    $grid.shuffle("shuffle", e.target.value);
  });

  (function () {
    $(".image-link").magnificPopup({
      gallery: { enabled: true },
      removalDelay: 300,
      mainClass: "mfp-with-zoom",
      type: "image",
    });
  })();

  $("#chartContainer").CanvasJSChart(options);
});
