var w = 300;
var h = 100;
var pad = 1;
var dataset = [5, 10, 12, 20, 15, 7, 4, 22, 20, 25];

function showMinMaxColor(val) {
  var max = d3.max(dataset);
  var min = d3.min(dataset);

  if (val === max || val == min) {
    return '#cc3366';
  } else {
    return 'rgb(192, 192, 192)'
  }

}

function showMinMaxLabel(val) {
  var max = d3.max(dataset);
  var min = d3.min(dataset);

  if (val === max || val == min) {
    return val;
  }

}

var svg = d3.select('#linear-extreme-chart').attr({'width': w, 'height': h});

svg.selectAll('circle')
  .data(dataset)
  .enter()
  .append('circle')
  .attr({
    r: 3,
    cx: function (d, i) {
      return i * (w / dataset.length) + 4
    },
    cy: function (d) {
      return h - d * 4 + 4;
    }
  })
  .style({
    'fill': function (d) {
      return showMinMaxColor(d)
    }
  }
).on('mousemove', function () {
    d3.select(this).transition().duration(400).ease("linear").attr('r', 6);
  })
  .on('mouseleave', function () {
    d3.select(this).transition().duration(400).ease("linear").attr('r', 3);
  });

// Labels
svg.selectAll('text')
  .data(dataset)
  .enter()
  .append('text')
  .text(function (d) {
    return showMinMaxLabel(d);
  })
  .attr({
    'text-anchor': 'start',
    'font-size': '12px',
    'font-weight': 'bold',
    x: function (d, i) {
      return i * (w / dataset.length) + w / dataset.length * .25;
    },
    y: function (d) {
      return h - d * 4 + 14;
    }
  });
