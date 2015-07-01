var w = 300;
var h = 100;
var pad = 1;
var dataset = [5, 10, 12, 20, 15, 7, 4, 22, 20, 25];

function colorPicker(v) {
  if (v <= 10) {
    return 'rgb(192, 192, 192)';
  } else {
    return 'rgb(50, 100, ' + v * 10 + ')'
  }
}

var svg = d3.select('#bar-chart').attr({'width': w, 'height': h});

// Bars
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
  .style('fill', function (d) {
    return colorPicker(d)
  });

// Labels
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
    fill: '#fff',
    x: function (d, i) {
      return i * (w / dataset.length) + w / dataset.length * .25;
    },
    y: function (d) {
      return h - d * 4 + 14;
    }
  });
