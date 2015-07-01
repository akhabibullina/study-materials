d3.select('body').selectAll('svg').on('mouseover', function() {
  d3.select('#' + this.id).style("transform", "scale(1.25)");
});
d3.select('body').selectAll('svg').on('mouseout', function() {
  d3.select('#' + this.id).style("transform", "scale(1)");
});

d3.select('body').selectAll('svg').call(d3.behavior.drag().on('dragstart', function (d) {
  alert('Keep calm and do not drag :)');
}));