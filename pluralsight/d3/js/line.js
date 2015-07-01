var w = 300;
var h = 100;
var pad = 1;
var dataset = [5, 10, 12, 20, 15, 7, 4, 22, 20, 23];

function colorPicker(v) {
  if (v <= 10) {
    return 'rgb(192, 192, 192)';
  } else {
    return 'rgb(50, 100, ' + v * 10 + ')'
  }
}

var svg = d3.select('#line-chart').attr({'width': w, 'height': h});

svg.selectAll('line')
  .data(dataset)
  .enter()
  .append('line')
  .attr({
    x1: function (d, i) {
      return i * (w / dataset.length)
    },
    x2: function (d, i) {
      return (i + 1) * (w / dataset.length) - pad
    },
    y1: function (d) {
      return h - d * 4;
    },
    y2: function (d) {
      return h - d * 4;
    }
  })
  .style({
    'stroke': function (d) {
      return colorPicker(d)
    },
    'stroke-width': 3
  }
);

svg.selectAll('rect')
  .data(dataset)
  .enter()
  .append('rect')
  .attr({
    x: function (d, i) {
      return i * (w / dataset.length)
    },
    y: function (d) {
      return h - d * 4;
    },
    width: w / dataset.length - pad,
    height: function (d) {
      return d * 4;
    }
  })
  .style(
  {
    'fill': 'rgb(95, 150, 230)',
    opacity: .5
  });
