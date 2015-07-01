var w = 300;
var h = 100;
var pad = 1;
var dataset = [5, 10, 12, 20, 15, 7, 4, 22, 20, 25];

var lineFun = d3.svg.line()
  .x(function (d, i) {
    return i * 30;
  })
  .y(function (d) {
    return d * 4;
  })
  .interpolate('basis');

var svg = d3.select('#linear-chart').attr({'width': w, 'height': h});

var viz = svg.append('path')
  .attr({
    d: lineFun(dataset),
    stroke: 'rgb(96,0,0)',
    'stroke-width': 2,
    fill: 'none'
  });

svg.selectAll('text')
  .data(dataset)
  .enter()
  .append('text')
  .text(function (d) {
    return d;
  })
  .attr({
    'text-anchor': 'start',
    'font-size': '12px',
    'font-family': 'sans-serif',
    'font-weight': function (d, i) {
      if (i === 0 || i === dataset.length - 1) {
        return 'bold';
      }
    },
    x: function (d, i) {
      return i * 30;
    },
    y: function (d) {
      return d * 4;
    }
  });
