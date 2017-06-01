
        function createConfig(dataset) {
            return {
                type: 'line',
                data: {
                    labels: ["November", "December", "January", "February", "March", "April", "May", "June", "July"],
                    datasets: [{
                        label: "Performance of this Build",
                        backgroundColor: "rgba(22, 255, 22, .4)",
                        borderColor: "rgba(25, 255, 22, .8)",
                        data: dataset,
                        fill: false,
                    }, {
                        label: "Baseline Build Progress ",
                        fill: false,
                        backgroundColor: "rgba(22, 122, 252, .4)",
                        borderColor: "rgba(22, 122, 252, .8)",
                        data: [60, 60, 60, 65, 70, 75, 80, 90, 92],
                    }]
                },
                options: {
                    responsive: false,
                    title:{
                        display: true,
                        text: 'Build over time'
                    },
                    scales: {
                        xAxes: [{
                            gridLines: {
                                 display: true
                                     }
                        }],
                        yAxes: [{
                            gridLines: {
                                 display: false
                                },
                            ticks: {
                                min: 0,
                                max: 100,
                                stepSize: 10
                            }
                        }]
                    }
                }
            };
        }

        var a = function() {
            var container = document.querySelector('.container');

            [{
                title: 'Display: true',
                gridLines: {
                    display: true
                }
            }, {
                title: 'Display: false',
                gridLines: {
                    display: false
                }
            }, {
                title: 'Display: false, no border',
                gridLines: {
                    display: false,
                    drawBorder: false
                }
            }, {
                title: 'DrawOnChartArea: false',
                gridLines: {
                    display: true,
                    drawBorder: true,
                    drawOnChartArea: false,
                }
            }, {
                title: 'DrawTicks: false',
                gridLines: {
                    display: true,
                    drawBorder: true,
                    drawOnChartArea: true,
                    drawTicks: false,
                }
            }].forEach(function(details) {
                var div = document.createElement('div');
                div.classList.add('chart-container');

                var canvas = document.createElement('canvas');
                div.appendChild(canvas);
                container.appendChild(div);
               
                var ctx = canvas.getContext('2d');
                var config = createConfig(details.gridLines, details.title);
            
            });
        };


        var makeCharts = function(ctx, dataset){

            var config = createConfig(dataset)
 setTimeout(function(){
        new Chart(ctx, config);

 }, 2500)
        }

