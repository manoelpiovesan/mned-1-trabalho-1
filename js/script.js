

document.querySelector('#btn-rk').addEventListener('click',  ()=>{
    rungeKutta3()
})

document.querySelector('#btn-print-a').addEventListener('click',  ()=>{
    print(a)
})

var myChartA, myChartB, myChartC
var cores = ['red', 'blue', 'green', 'orange', 'purple', 'yellow', 'black', 'pink']
var points = ['circle', 'cross', 'dash', 'rect', 'star', 'triangle','circle', 'cross', 'dash', 'rect', 'star', 'triangle']

var dataSetsA = []
var dataSetsB = []
var dataSetsC = []


function rungeKutta3(){
    var A = parseFloat(document.querySelector('#ca-init').value)
    var B =  parseFloat(document.querySelector('#cb-init').value)
    var C =  parseFloat(document.querySelector('#cc-init').value)
    
    const alpha =  parseFloat(document.querySelector('#alpha-init').value)
    const beta =  parseFloat(document.querySelector('#beta-init').value)
    const gama =  parseFloat(document.querySelector('#gama-init').value)
    
    const deltaT = parseFloat(document.querySelector('#deltat').value)
    const tZero = parseInt(document.querySelector('#tzero').value)
    const tMax = parseInt(document.querySelector('#tmax').value)
    
    var dfdx = {
        a: (cA, cB, cC) => {return ((-alpha*cA*cC)+cB)},
        b: (cA, cB, cC) => {return ((beta*cA*cC)-cB)},
        c: (cA, cB, cC) => {return ((-gama*cA*cC)+cB-(2*cC))}
    }
    

    var coordsCa = []
    var coordsCb = []
    var coordsCc = []

    var coordsCaLabels = []
    var coordsCbLabels = []
    var coordsCcLabels = []

    var cA = A;
    var cB = B;
    var cC = C;
    
    for(var i = tZero; i < tMax; i = i + deltaT){
        
        var k1a = dfdx.a(cA, cB, cC)
        var k1b = dfdx.b(cA, cB, cC)
        var k1c = dfdx.c(cA, cB, cC)
        
        var k2a = dfdx.a((cA + ((k1a*deltaT) / 2)), (cB + ((k1b*deltaT) / 2)), (cC + ((k1c*deltaT)/ 2)))
        var k2b = dfdx.b((cA + ((k1a*deltaT) / 2)), (cB + ((k1b*deltaT) / 2)), (cC + ((k1c*deltaT)/ 2)))
        var k2c = dfdx.c((cA + ((k1a*deltaT) / 2)), (cB + ((k1b*deltaT) / 2)), (cC + ((k1c*deltaT)/ 2)))

        var k3a = dfdx.a((cA - (k1a*deltaT)+(2*k2a*deltaT)),(cB - (k1b*deltaT)+(2*k2b*deltaT)),(cC - (k1c*deltaT)+(2*k2c*deltaT)))
        var k3b = dfdx.b((cA - (k1a*deltaT)+(2*k2a*deltaT)),(cB - (k1b*deltaT)+(2*k2b*deltaT)),(cC - (k1c*deltaT)+(2*k2c*deltaT)))
        var k3c = dfdx.c((cA - (k1a*deltaT)+(2*k2a*deltaT)),(cB - (k1b*deltaT)+(2*k2b*deltaT)),(cC - (k1c*deltaT)+(2*k2c*deltaT)))
    
        var rk3a = cA + ((1/6) * (k1a + (4*k2a) + k3a) * deltaT)
        var rk3b = cB + ((1/6) * (k1b + (4*k2b) + k3b) * deltaT)
        var rk3c = cC + ((1/6) * (k1c + (4*k2c) + k3c) * deltaT)
        
        cA = rk3a
        cB = rk3b
        cC = rk3c

        console.log(i, rk3a)

        coordsCa.push({x: i, y:rk3a})
        coordsCb.push({x: i, y:rk3b})
        coordsCc.push({x: i, y:rk3c})

        coordsCaLabels.push(i.toFixed(4))
        coordsCbLabels.push(i.toFixed(4))
        coordsCcLabels.push(i.toFixed(4))

    }

    if(myChartA != undefined){
        if(document.querySelector('#hold-chart').value == 0){
            dataSetsA = []
            dataSetsB = []
            dataSetsC = []
        }
    }

    dataSetsA.push({
        label: `Ca: Δt:${deltaT}`,
        data: coordsCa,
        borderWidth: 1,
        pointStyle: points[dataSetsC.length], 
        borderColor: cores[dataSetsC.length],
    })

    dataSetsB.push({
        label: `Cb: Δt:${deltaT}`,
        data: coordsCb,
        borderWidth: 1,
        pointStyle: points[dataSetsC.length], 
        borderColor: cores[dataSetsC.length],
    })

    dataSetsC.push({
        label: `Cc: Δt:${deltaT}`,
        data: coordsCc,
        borderWidth: 1,
        pointStyle: points[dataSetsC.length], 
        borderColor: cores[dataSetsC.length],
    })

    if(myChartA != undefined){
        if(document.querySelector('#hold-chart').value == 1){
            myChartA.update()
            myChartB.update()
            myChartC.update()
        }
    }

// --------- chart js config
// init chart Ca

    const ctxA = document.getElementById('myChartA');
    const ctxB = document.getElementById('myChartB');
    const ctxC = document.getElementById('myChartC');

    

    if((myChartA == undefined)){
        myChartB = new Chart(ctxB, {
            type: 'line',
            data: {
            labels: coordsCbLabels,
            datasets: dataSetsB
            },
            options: {
            scales: {
                x: {
                    min: 0,
                    max:70
                }
            }
            }
        });
    
        myChartC = new Chart(ctxC, {
            type: 'line',
            data: {
            labels: coordsCcLabels,
            datasets: dataSetsC
            },
            options: {
            scales: {
                x: {
                    min: 0,
                    max:70
                }
            }
            }
        });
    
        myChartA = new Chart(ctxA, {
            type: 'line',
            data: {
            labels: coordsCaLabels,
            datasets: dataSetsA
            },
            options: {
                scales: {
                    x: {
                        min: 0,
                        max:70
                    }
                }
            }
        });
    }else{
        
    }

    
}


function print(chart){
    var a = document.createElement('a');
    a.href = chart.toBase64Image();
    a.download = `chart.png`;

    // Trigger the download
    a.click();
}



