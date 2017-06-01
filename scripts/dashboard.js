


var chartOverTime = document.getElementById('chartOverTime');


        var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var color = Chart.helpers.color;
        var barChartData = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [{
                label: 'Fast Ring',
                backgroundColor: color('rgba(54, 162, 235, 0.2)').alpha(0.5).rgbString(),
                borderColor: 'rgba(54, 162, 235, 0.8)',
                borderWidth: 1,
                data: [
                    88,94,96,34,45,30,44
                ]
            }, {
                label: 'Canary Ring',
                backgroundColor: color('rgba(255, 206, 86, 0.2)').alpha(0.5).rgbString(),
                borderColor: 'rgba(255, 206, 86, 0.8)',
                borderWidth: 1,
                data: [
                  77,88,99,31,31,32,21
                ]
            }]

        };

        window.onload = function() {
			setTimeout(function(){
            var ctx = chartOverTime.getContext("2d");
            window.myBar = new Chart(ctx, {
                type: 'bar',
                data: barChartData,
                options: {
                    responsive: true,
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: false,
                        text: 'Chart.js Bar Chart'
                    }
                }
            });
}, 800)
        };


var chartDeploys = document.getElementById('chartDeploys')

 var deploysData ={
                type: 'line',
                data: {
                    labels: ["VELOC", "NARW", "NINJA", "CHIC", "PUSH_T"],
                    datasets: [{
                        label: "My First dataset",
                        backgroundColor: "rgba(33,99,122,.4)",
                        borderColor: "rgba(33,99,122,.4)",
                        data: [109, 23, 9, 99, 67],
                        fill: false,
                        pointRadius: 10,
                        pointHoverRadius: 15,
                        showLine: false // no line shown
                    }]
                },
                options: {
                    responsive: true,
                    title:{
                        display:false,
                        text:'Point Style:'
                    },
                    legend: {
                        display: false
                    },
                    elements: {
                        point: {
                            pointStyle: 'triangle'
                        }
                    }, labels:{
                        display: false
                    }
                }
            };


     

setTimeout(function(){
      var ctx = chartDeploys.getContext('2d');
             window.chartDeplysChart =   new Chart(ctx, deploysData);
}, 2300)

    var chartScore = document.getElementById('chartScore');

    var chartScoreData =  {
            labels: ["1011101", "1010101", "1010110", "1011001", "1101101", "0001010", "0101011"],
            datasets: [{
                label: 'Fast Ring',
                backgroundColor: color('rgba(160, 52, 35, 0.2)').alpha(0.5).rgbString(),
                borderColor: 'rgba(160, 52, 35, 0.2)',
                borderWidth: 1,
                data: [
                    88,94,96,34,45,30,44
                ]
            }, {
                label: 'Canary Ring',
                backgroundColor: color('rgba(25, 55, 86, 0.2)').alpha(0.5).rgbString(),
                borderColor: 'rgba(25, 55, 86, 0.8)',
                borderWidth: 1,
                data: [
                  77,88,99,31,31,32,21
                ]
            }]

        };
		setTimeout(function(){
              var scoreCtx = chartScore.getContext('2d');
             window.chartScoreChart =   new Chart(scoreCtx, { type: 'horizontalBar',
                data:chartScoreData});

}, 2500)
            
		//var presets = window.chartColors;
		//var utils = Samples.utils;
		var inputs = {
			min: 20,
			max: 80,
			count: 8,
			decimals: 2,
			continuity: 1
		};

		function generateData() {
			return [22,23,25,26,27,27,22,24]
		}

		function generateLabels(config) {
			return [1,2,3,4,5,6,7,8]
		}

	//	utils.srand(42);

		var databr = {
			labels: generateLabels(),
			datasets: [{
				backgroundColor: 'rgba(160, 152, 135, 0.2)',
				borderColor: 'rgba(160, 152, 135, 0.8)',
				data: [22,23,25,26,27,27,22,24],
				hidden: true,
				label: 'VELOC'
			}, {
				backgroundColor: 'rgba(16, 52, 225, 0.2)',
				borderColor: 'rgba(16, 52, 225, 0.8)',
				data: [44,66,55,34,67,21,45],
				label: "NARW",
				fill: '-1'
			}, {
				backgroundColor: 'rgba(260, 52, 15, 0.2)',
				borderColor: 'rgba(260, 52, 15, 0.8)',
				data: [33,77,65,46,32,36,54,32],
				label:  "NINJA", 
				fill: 1
			}, {
				backgroundColor: 'rgba(10, 252, 35, 0.2)',
				borderColor: 'rgba(10, 252, 35, 0.8)',
				data: [44,34,67,89,65,32,62,78],
				label: "CHIC", 
				fill: '-1'
			}, {
				backgroundColor: 'rgba(16, 252, 35, 0.2)',
				borderColor: 'rgba(16, 252, 35, 0.2)',
				data: [65,32,62,78,44,34,67,89],
				label: "PUSH_T",
				fill: '-1'
			}, {
				backgroundColor: 'rgba(220, 2, 12, 0.2)',
				borderColor: 'rgba(220, 2, 12, 0.8)',
				data: [25,44,21,56,55,58,51,68],
				label: 'BASELI',
				fill: '+2'
			}, {
				backgroundColor: 'rgba(60, 52, 125, 0.2)',
				borderColor: 'rgba(60, 52, 125, 0.8)',
				data: [32,62,78,44,25,44,21,53],
				label: 'EDGE12',
				fill: false
			}, {
				backgroundColor: 'rgba(140, 52, 245, 0.2)',
				borderColor: 'rgba(140, 52, 245, 0.8)',
				data: [78,75,55,66,74,77,69,74],
				label: 'SHELL12',
				fill: 8
			}, {
				backgroundColor: 'rgba(60, 2, 5, 0.2)',
				borderColor: 'rgba(60, 2, 5, 0.8)',
				data: [74, 33,77, 44,69, 54,74, 66],
				hidden: true,
				label: 'RSMAIN',
				fill: 'end'
			}]
		};

		var optionsbr = {
			maintainAspectRatio: true,
			responsive: true,
			spanGaps: false,
			elements: {
				line: {
					tension: 0.000001
				}
			},
			scales: {
				yAxes: [{
					stacked: true
				}]
			},
			plugins: {
				filler: {
					propagate: false
				},
				samples_filler_analyser: {
					target: 'chart-analyser'
				}
			}
		};

		setTimeout(function(){
var chartBrRating = document.getElementById('chartBrRating')
		var chartBrRatingChart = new Chart(chartBrRating, {
			type: 'line',
			data: databr,
			options: optionsbr
		});

}, 2300)