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

function showFilterHeader(ds) {
  d3.select("#filter-json-header")
    .style({position: 'absolute', top: '87%', 'color': 'gray'})
    .append('span')
    .text(ds.category + " Sales (2013)")
    .style('color', categoryColorPicker(ds.category));
}

function showFilterAxis() {

  var svg = d3.select("#filter-chart");

  var xAxisGen = d3.svg.axis().scale(xScale).orient('bottom').tickFormat(d3.time.format("%b"));
  var yAxisGen = d3.svg.axis().scale(yScale).orient('left').ticks(4);

  svg.append('g').call(xAxisGen).attr({class: "x-axis", transform: "translate(0," + (h - padding) + ")"});
  svg.append('g').call(yAxisGen).attr({class: "y-axis", transform: "translate(" + padding + ",0)"});
}

function updateFilterAxis(ds) {

  var svg = d3.select("#filter-chart");

  var xAxisGen = d3.svg.axis().scale(xScale).orient('bottom').tickFormat(d3.time.format("%b")).ticks(ds.length-1);
  var yAxisGen = d3.svg.axis().scale(yScale).orient('left').ticks(4);

  svg.selectAll("g.x-axis").call(xAxisGen);
  svg.selectAll("g.y-axis").call(yAxisGen);
}

function getDate(d) {

  //20130101
  var strDate = new String(d);

  var year = strDate.substr(0, 4);
  var month = strDate.substr(4, 2) - 1; //zero based index
  var day = strDate.substr(6, 2);

  return new Date(year, month, day);
}

function buildFilterLine(ds) {

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

  var svg = d3.select("#filter-chart").attr({width: w, height: h});

  var viz = svg.append("path")
    .attr({
      class: ds.category,
      d: lineFun(ds.monthlySales) //we have to reference the sales data array
    }).style({
      "stroke": categoryColorPicker(ds.category),
      'stroke-width': 2,
      fill: 'none'
    })

}

function updateFilterLine(ds, category) {

  var minDate = getDate(ds[0]['month']);
  var maxDate = getDate(ds[ds.length - 1]['month']);

  xScale = d3.time.scale()
    .domain([minDate, maxDate])
    .range([padding + 5, w - padding]);

  yScale = d3.scale
    .linear()
    .domain([0, d3.max(ds, function (d) {
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

  var svg = d3.selectAll("#filter-chart");

  var viz = svg.selectAll('path.' + category)
    .transition()   //add the transition and you're done!
    .duration(500)  //set the duration for more control
    .attr({
      d: lineFun(ds) //we have to reference the sales data array
    });
}

d3.xhr('https://api.github.com/repos/bsullins/d3js-resources/contents/monthlySalesbyCategoryMultiple.json', function (error, data) {
  if (error) return;

  var obj = JSON.parse(data.response);
  var data = JSON.parse(window.atob(obj.content));

  data.contents.forEach(function (d) {
    showFilterHeader(d);
    buildFilterLine(d);
    showFilterAxis(d);
  });

  d3.select("#period").on('change', function() {
    var selected = this.value;
    data.contents.forEach(function (d) {
      var monthlySales = d.monthlySales;
      var ds = d.monthlySales.slice(0, selected);
      updateFilterLine(ds, d.category);
      updateFilterAxis(ds);
    });
  })
});