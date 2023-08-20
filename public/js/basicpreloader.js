$(document).ready(function () {
  var heights = jQuery(window).height();

  var h = 50; //height and width of the loading circles
  var w = 50;

  $("#loader").css("width", "100%");
  $("#loader").css("height", heights);
//   $("#loader").css("background-color", "black");

  //   $("body").css("overflow", "hidden");

  $("#back").css("width", "100%");
  $("#back").css("height", heights);
  $("#back").css("z-index", "101");
  $("#back").css("padding", "0");
  $("#back").css("margin", "0");
  $("#back").css("opacity", "0.65");
  $("#back").css("position", "fixed");

  // $("#back").css("background-image","url(tracks.jpg)");//You can change the background image to whatever you like... Low image sizes would be the best

  $("#back").css("background-size", "100% 100%");
  $("#back").append(
    "<div id='box' align='center' style='background-color:#00000; width:220px; height:52px;'></div>"
  );

  $("#box").center();
  /*4 div representing 4 loading elements..(The 4 circles)*/
  $("#box").append(
    "<div id='box0' style='border-radius:50%; background-color:#333333; width:" +
      w +
      "px; height:" +
      h +
      "px; float:left; margin-right:3px'></div>"
  );
  $("#box").append(
    "<div align='center' id='box1' style='border-radius:50%; background-color:#FFFF66; width:" +
      w +
      "px; height:" +
      h +
      "px; float:left; margin-right:3px'></div>"
  );
  $("#box").append(
    "<div align='center' id='box2' style='border-radius:50%; background-color:#FF6600; width:" +
      w +
      "px; height:" +
      h +
      "px; float:left; margin-right:3px'></div>"
  );
  $("#box").append(
    "<div align='center' id='box3' style='border-radius:50%; background-color:#6600CC; width:" +
      w +
      "px; height:" +
      h +
      "px; float:left; margin-right:3px'></div>"
  );

  //Animation of the circles...
  $("#box0").hide(500);
  $("#box1").hide(1000);
  $("#box2").hide(1500);
  $("#box3").hide(2000);
  $("#box0").show(500);
  $("#box1").show(1000);
  $("#box2").show(1500);
  $("#box3").show(2000);

  setInterval(function () {
    /*This function is called automatically after every 4 sec*/ $("#box0").hide(
      500
    );
    $("#box1").hide(1000);
    $("#box2").hide(1500);
    $("#box3").hide(2000);
    $("#box0").show(500);
    $("#box1").show(1000);
    $("#box2").show(1500);
    $("#box3").show(2000);
  }, 4500);

  $(window).on("load", function () {
    // $("body").css("overflow", "auto");
    $("#loader").hide(function () {
      $("#loader").remove();
    });
  });
  $(window).resize(function () {
    /*Resize event, resizes the content according to window size*/
    heights = jQuery(window).height();
    $("#back").css("height", heights);
    $("#loader").css("height", heights);
    $("#loader").css("background-color", "black");
    $("#box").center();
  });
});
/*Function to align content to center*/
jQuery.fn.center = function () {
  this.css("position", "absolute");
  this.css(
    "top",
    Math.max(
      0,
      ($(window).height() - $(this).outerHeight()) / 2 + $(window).scrollTop()
    ) + "px"
  );
  this.css(
    "left",
    Math.max(
      0,
      ($(window).width() - $(this).outerWidth()) / 2 + $(window).scrollLeft()
    ) + "px"
  );
  return this;
};
