'use strict'

var ctx = document.getElementById('myChart').getContext('2d');

const botao = document.getElementById('btnGerar');
botao.addEventListener('click', plotGraphs);

function plotGraphs(){
    let freq = document.getElementById('freq').value;
    let radFreq = 2 * Math.PI * freq;

    let xLabel = genXLabel(freq);
    let yDisplacement = genYDisplacement(radFreq, xLabel);

    if ((xLabel.length > 0) && (yDisplacement.length > 0)){
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',
        
            // The data for our dataset
            data: {
                labels: xLabel,
                datasets: [{
                    label: 'My First dataset',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: yDisplacement
                }]
            },
        
            // Configuration options go here
            options: {}
        });
    }

    // Apaga os valores das variáveis
    xLabel = [];
    yDisplacement = [];
}

// Taxa de amostragem = freq/10
// Tempo mostrado no gráfico = 10s

function genXLabel(freq) {
    let vec = [];
    for (let cont = 0; cont < 10; cont += (freq/10)){
        vec.push(cont);
    }

    return vec;
}

function genYDisplacement(radFreq, xLabel) {
    let vecYD = [];
    for (let cont = 0; cont < xLabel.length; cont++) {
        vecYD.push(Math.sin(radFreq * xLabel[cont]));
    }

    return vecYD;
}