


$( document ).ready(function() {
    get_data().done(function(data) {
      var newChart = new Chart(data);
    }).fail(function(){
      console.log("failer")
    })
});

//get data with ajax call
var get_data = function() {
    return $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: '/three_hour_chart/get_data',
        dataType: 'json',
        success: function (data) {
              return data;
         },
        error: function (error) {
            console.log("error in request: "+ error)
         }
    });
}

var Chart = function(data) {

  var margin = {top: 20, right: 20, bottom: 30, left: 50},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  var svg,
      datas;

  var sect = document.getElementById("inds");
  var currency = sect.options[sect.selectedIndex].value;

  //refresh svg on new data
  var appendNewSvg = function(){

    d3.select("svg").remove();

    svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

  }

  //filter data based on ticker choice
  var filterJSON = function(json, currency){
    var result = [];
    json.forEach(function(val,idx,arr){

      var d = {
        value: +val[currency],
        time: new Date(val['created_at'])
        }
      result.push(d);
    })
    // sorting by time
    result.sort(function(a,b){
        var c = new Date(a.time);
        var d = new Date(b.time);
        return c-d;
    });
    return result;
  }

  var marginForCurrency = function(currency) {
    var currency_margin;
    switch(currency){
      case 'btc_usd':
        currency_margin = 5;
        break;
      case 'btc_eur':
        currency_margin =  5;
        break;
      case 'btc_rur':
        currency_margin =  500;
        break;
      default:
        currency_margin =  5;
    }
    return currency_margin
  }

  //render graph
  var renderGraph = function(data) {

        var x = d3.scaleTime()
                .rangeRound([0, width]);

        var y = d3.scaleLinear()
                .rangeRound([height, 0]);

        var cur_margin = marginForCurrency(currency)

        x.domain(d3.extent(data, function(d) { return d.time; }));
        y.domain([d3.min(data, function(d) { return d.value - cur_margin; }), d3.max(data, function(d) { return d.value + cur_margin; })]);


        var line = d3.line()
            .x(function(d) { return x(d.time); })
            .y(function(d) { return y(d.value); });


        //path
        svg.append('path')
            .data([data])
            .attr("class", "line")
            .attr("d", line);

        //X-axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))

        svg.append("text")
              .attr("transform",
                    "translate(" + (width/2) + " ," +
                                   (height + margin.top + 20) + ")")
              .attr("y", (0 - margin.left/3))
              .attr("dx", "1em")
              .style("text-anchor", "middle")
              .text("Time");

        //Y-axis
        svg.append("g")
                .call(d3.axisLeft(y));

        svg.append("text")
         .attr("transform", "rotate(-90)")
         .attr("y", 0 - margin.left)
         .attr("x",0 - (height / 2))
         .attr("dy", "1em")
         .style("text-anchor", "middle")
         .text("Value");

    };

  // get the ticker
  d3.select('#inds')
  		.on("change", function () {
  			sect = document.getElementById("inds");
  			currency = sect.options[sect.selectedIndex].value;
        console.log(currency)

        appendNewSvg();

        datas = filterJSON(data, currency);

        renderGraph(datas);

      });

  appendNewSvg();

  datas = filterJSON(data, currency);
  renderGraph(datas);

};
