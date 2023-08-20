"use strict";

var firstTimeSkillProgress = true;
$(document).scroll(function (event) {
  var result = $(".skill-progress").isOnScreen();

  if (result == true) {
    if (firstTimeSkillProgress) {
      firstTimeSkillProgress = false;

      $.each($("div.progress-bar"), function () {
        const ele = $(this);
        const rem = Number(ele.attr("aria-valuenow"));
        let per = rem ? 3 : 0;
        const progress = () => {
          if (per < rem) {
            ele.css("width", per + "%");
            per +=
              10 * per < rem || 10 * (rem - per) < rem
                ? 1
                : 10 * per < rem * 2 || 10 * (rem - per) < rem * 2
                ? 4
                : 2;
            setTimeout(() => {
              progress();
            }, 1);
          }
        };
        progress();
      });
    }
  }
});

var firstTimeSkillChart = true;
$(document).scroll(function (event) {
  var result = $(".skill-chart").isOnScreen();

  if (result == true) {
    if (firstTimeSkillChart) {
      firstTimeSkillChart = false;

      $(".chart").easyPieChart({
        easing: "easeOut",
        delay: 3000,
        barColor: "#68c3a3",
        trackColor: "rgba(255,255,255,0.2)",
        scaleColor: false,
        lineWidth: 8,
        size: 140,
        animate: 2000,
        onStep: function (from, to, percent) {
          this.el.children[0].innerHTML = Math.round(percent);
        },
      });
    }
  }
});
