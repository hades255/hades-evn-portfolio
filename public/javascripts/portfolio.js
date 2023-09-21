$(document).ready(function () {
  var $grid = $("#grid");

  function drawChart(filter) {
    const lineOfCode = (repos) => {
      let code = repos.reduce((a, b) => a + Number(b.code), 0);
      return code;
    };
    const numWithSuf = (num) => {
      let suf = 0;
      const units = "KMGT";
      while (num / 1000 >= 1) {
        suf++;
        num = (num - (num % 1000)) / 1000;
      }
      return {
        num,
        suf: suf ? units[suf - 1] : "",
      };
    };
    const initRepos = JSON.parse($("#languages-detail-values").text());
    const code = lineOfCode(
      initRepos.filter(
        (repo) =>
          filter === undefined || filter === "all" || repo.tag.includes(filter)
      )
    );
    let languages = {};
    initRepos
      .filter(
        (repo) =>
          filter === undefined || filter === "all" || repo.tag.includes(filter)
      )
      .forEach((repo) => {
        repo.languages.forEach((lan) => {
          languages[lan.name] = languages[lan.name]
            ? languages[lan.name] + (lan.rate * repo.code) / 100
            : (lan.rate * repo.code) / 100;
        });
      });
    let languagesA = [];
    let others = 0;
    for (let [key, value] of Object.entries(languages)) {
      if (value / code < 0.01) {
        others += value / code;
        continue;
      }
      languagesA.push({
        label: key,
        y: (value / code) * 100,
        x: numWithSuf(value).num,
        z: numWithSuf(value).suf,
      });
    }
    if (others)
      languagesA.push({
        label: "Others",
        y: others * 100,
        x: numWithSuf(others * code).num,
        z: numWithSuf(others * code).suf,
      });

    const options = {
      title: {
        text: `Language Usages`,
      },
      subtitles: [
        {
          text: `${numWithSuf(code).num} ${
            numWithSuf(code).suf
          } + lines of CODE`,
        },
      ],
      animationEnabled: true,
      data: [
        {
          type: "pie",
          startAngle: 40,
          toolTipContent: "<b>{label}</b>:{x}{z}+ <sub>lines</sub> {y}%",
          showInLegend: "true",
          legendText: "{label}",
          indexLabelFontSize: 16,
          indexLabel: "{label} - {x}{z}+",
          dataPoints: languagesA,
        },
      ],
    };

    $("#chartContainer").CanvasJSChart(options);
  }

  function shuffle(name) {
    $grid.shuffle("shuffle", name);
    drawChart(name);
  }

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
    shuffle(groupName);
  });

  $("#more-filters").change(function (e) {
    if (e.target.value === "") return;
    $("#filter a").removeClass("active");
    shuffle(e.target.value);
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
      shuffle(location.href.substring(location.href.lastIndexOf("=") + 1));
    } else {
      drawChart();
    }
  }, 100);

  // const resizeObserver = new ResizeObserver(entries => {
  //   for (let entry of entries) {
  //     $grid.masonry({
  //       itemSelector: ".grid-item",
  //       columnWidth: 200,
  //     });
  //     $grid.shuffle({ itemSelector: ".portfolio-item" });
  //   }
  // });

  // resizeObserver.observe($grid[0]);
});
