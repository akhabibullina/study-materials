var w = 300;
var h = 100;
var padding = 30;
var xScale, yScale;

function categoryColorPicker(type) {
  if (type === 'Furniture') {
    return 'rgb(50, 100, 250)';
  } else {
    return 'gray';
  }
}

function showAxisHeader(ds) {
  d3.select("#api-json-header")
    .style({position: 'absolute', top: '87%', 'color': 'gray'})
    .append('span')
    .text(ds.category + " Sales (2013)")
    .style('color', categoryColorPicker(ds.category));
}

function showAxis(ds) {

  var svg = d3.select("#api-chart");

  var xAxisGen = d3.svg.axis().scale(xScale).orient('bottom').tickFormat(d3.time.format("%b"));
  var yAxisGen = d3.svg.axis().scale(yScale).orient('left').ticks(4);

  svg.append('g').call(xAxisGen).attr({class: "axis", transform: "translate(0," + (h - padding) + ")"});
  svg.append('g').call(yAxisGen).attr({class: "axis", transform: "translate(" + padding + ",0)"});
}

function getDate(d) {

  //20130101
  var strDate = new String(d);

  var year = strDate.substr(0, 4);
  var month = strDate.substr(4, 2) - 1; //zero based index
  var day = strDate.substr(6, 2);

  return new Date(year, month, day);
}


function buildAxisLine(ds) {

  var minDate = getDate(ds.monthlySales[0]['month']);
  var maxDate = getDate(ds.monthlySales[ds.monthlySales.length - 1]['month']);

  xScale = d3.time.scale()
    .domain([minDate, maxDate])
    .range([padding + 5, w - padding]);

  yScale = d3.scale
    .linear()
    .domain([0, d3.max(ds.monthlySales, function (d) {
      return d.sales;
    })])
    .range([h - padding, 0]);

  var lineFun = d3.svg.line()
    .x(function (d) {
      return xScale(getDate(d.month));
    })
    .y(function (d) {
      return yScale(d.sales);
    })
    .interpolate("linear");

  var svg = d3.select("#api-chart").attr({width: w, height: h});

  var viz = svg.append("path")
    .attr({
      d: lineFun(ds.monthlySales) //we have to reference the sales data array
    }).style({
      "stroke": categoryColorPicker(ds.category),
      'stroke-width': 2,
      fill: 'none'
    })

}

d3.xhr('https://api.github.com/repos/akhabibullina/study-materials/contents/pluralsight/d3/data/MonthlySalesbyCategoryMultiple.json', function (error, data) {
  if (error) return;

  var obj = JSON.parse(data.response);
  var data = JSON.parse(window.atob(obj.content));

  data.contents.forEach(function (d) {
    showAxisHeader(d);
    buildAxisLine(d);
    showAxis(d);
  })
});