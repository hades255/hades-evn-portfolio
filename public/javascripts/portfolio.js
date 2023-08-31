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
    $(this).addClass("active");
    var groupName = $(this).attr("data-group");
    $grid.shuffle("shuffle", groupName);
  });

  $("#more-filters").change(function (e) {
    if (e.target.value === "") return;
    $("#filter a").removeClass("active");
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

  setTimeout(() => {
    if (location.href.lastIndexOf("=") !== -1) {
      $("#filter a").removeClass("active");
      $grid.shuffle(
        "shuffle",
        location.href.substring(location.href.lastIndexOf("=") + 1)
      );
    }
  }, 100);

  $("#chartContainer").CanvasJSChart(options);
});
