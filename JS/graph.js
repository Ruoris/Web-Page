
var xValues = [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150];
var yValues = [0.2, 0.3, 0.4, -0.5, -0.1, 0.3, 0.9, -0.1, -0.5, 0.5, 0];

const chart=new Chart("myChart", {
    type: "line",
    data: {
        labels: xValues,
        datasets: [{
            fill: false,
            label: 'line Dataset',
            lineTension: 0,
            backgroundColor: "rgba(0,100,255,1.0)",
            borderColor: "rgba(0,100,255,1.0)",
            data: yValues
        }, {
            type: 'bar',
            label: 'Bar Dataset',
            backgroundColor: "rgba(0,255,0,1.0)",
            borderColor: "rgba(0,255,0.50)",
            data: [-0.1, 0.5, -0.5, 1, -1, 0.1, 0.7, -0.7, 0.5, -0.5, 0.0]

        }]
    },
    options: {

        transitions: {
            show: {
                animations: {
                    x: {
                        from: 0
                    },
                    y: {
                        from: 0
                    }
                }
            },
            hide: {
                animations: {
                    x: {
                        to: 0
                    },
                    y: {
                        to: 0
                    }
                }
            }
        },
    
    // legend: { display: false },
        scales: {
            yAxes: [{ ticks: { min: -1.5, max: 1.5 } }],
        }
    }
});


