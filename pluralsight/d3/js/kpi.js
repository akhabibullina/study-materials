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

var svg = d3.select('#linear-kpi-chart').attr({'width': w, 'height': h});

svg.selectAll('line')
  .data(dataset)
  .enter()
  .append('line')
  .attr({
    x1: function (d, i) {
      return i * (w / dataset.length)
    },
    x2: function (d, i) {
      return (i + 1) * (w / dataset.length)
    },
    y1: function (d, i) {
      if (i === 0) {
        return h - d * 4;
      }
      return h - dataset[i - 1] * 4;
    },
    y2: function (d) {
      return h - d * 4;
    }
  })
  .style({
    'stroke': function (d) {
      return colorPicker(d)
    },
    'stroke-width': 2
  }
);


function kpi(v) {
  if (v <= 10) {
    return 'rgb(192, 192, 192)';
  } else {
    return '#cc3366'
  }
}

svg.selectAll('circle')
  .data(dataset)
  .enter()
  .append('circle')
  .attr({
    r: 3,
    cx: function (d, i) {
      return i * (w / dataset.length) + 30
    },
    cy: function (d) {
      return h - d * 4;
    }
  })
  .style({
    'fill': function (d) {
      return kpi(d)
    }
  }
);
