var svg = d3.select('#tooltip-chart').attr({width: w, height: h});

function colorPicker(v) {
  if (v <= 40) {
    return 'rgb(192, 192, 192)';
  } else {
    return 'rgb(50, 100, ' + v * 10 + ')'
  }
};

function bound(_number, _min, _max) {
  return Math.max(Math.min(_number, _max), _min);
};

function buildTooltipLine(ds) {
  var w = 300;
  var h = 300;

  svg.selectAll('rect')
    .data(ds)
    .enter()
    .append('rect')
    .attr({
      x: function (d, i) {
        return i * (w / (ds.length));
      },
      y: function (d) {
        var min = 1, max = 45;
        return h - (bound(d.sales, min, max) * 6);
      },
      width: w / ds.length - pad,
      height: function (d) {
        return d.sales * 4;
      }
    })
    .style('fill', function (d) {
      var min = 1, max = 45;
      return colorPicker(bound(d.sales, min, max));
    });
};

d3.xhr('https://api.github.com/repos/bsullins/d3js-resources/contents/monthlySalesbyCategoryMultiple.json', function (error, data) {
  if (error) return;

  var obj = JSON.parse(data.response);
  var data = JSON.parse(window.atob(obj.content));

  data.contents.forEach(function (d) {
    buildTooltipLine(d.monthlySales);
    return;
  });

  svg.selectAll('rect')
    .on('mouseover', function(d) {
    svg.append("text")
      .text(d.sales)
      .attr({
        class: "tooltip",
        x: parseFloat(d3.select(this).attr("x"))+parseFloat(d3.select(this).attr("width")/4), //complicated but works
        y: parseFloat(d3.select(this).attr("y"))+12, //show inside the bars
      });
  });

  svg.selectAll('rect')
    .on('mouseleave', function() {
    svg.selectAll('.tooltip').remove();
  });

});