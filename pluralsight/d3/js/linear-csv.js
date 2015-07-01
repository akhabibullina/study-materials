var w = 400;
var h = 100;

function drawGraph(dataset) {

  var lineFun = d3.svg.line()
    .x(function (d, i) {
      return ((d.month - 20130001) / 3.25);
    })
    .y(function (d) {
      return h - d.sales;
    })
    .interpolate('linear');

  var svg = d3.select('#linear-csv-chart').attr({'width': w, 'height': h});

  svg.append('path')
    .attr({
      d: lineFun(dataset),
      stroke: 'rgb(96,0,0)',
      'stroke-width': 2,
      fill: 'none'
    });

}
;

function showMetrics(dataset) {
  var i = 0;
  var metrics = [], total = avg = 0;

  while (dataset[i]) {
    total += +dataset[i].sales;
    i++;
  }

  avg = total / dataset.length;

  metrics.push("Sales Total: " + total + ' ');
  metrics.push("Sales Average: " + avg.toFixed(2));

  d3.select('#linear-csv-chart-wrapper')
    .style({position: 'absolute', top: '40%', 'color': 'gray'})
    .selectAll('span')
    .data(metrics)
    .enter()
    .append('span')
    .text(function (d) {
      return d;
    });
}

d3.csv('data/MonthlySales.csv', function (error, data) {
  if (error) return;

  drawGraph(data);
  showMetrics(data);
});