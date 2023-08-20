function countUpTo(count, selector) {
  var div_by = count,
    speed = Math.round(count / div_by),
    $display = selector,
    run_count = 1,
    int_speed = 24;

  var int = setInterval(function () {
    if (run_count < div_by) {
      $display.text(speed * run_count);
      run_count++;
    } else if (parseInt($display.text()) < count) {
      var curr_count = parseInt($display.text()) + 1;
      var text = "";
      text = curr_count;
      $display.text(text);
    } else {
      clearInterval(int);
    }
  }, int_speed);
}

var firstTimeCount = true;
$(document).scroll(function (event) {
  var result = $(".count-timer").isOnScreen();

  if (result == true) {
    if (firstTimeCount) {
      firstTimeCount = false;
      $.each($(".count-numbers"), function(){
        countUpTo($(this).text(), $(this));
      })
    }
  }
});
