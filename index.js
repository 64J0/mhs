'use strict'

var ctxDisplacement = document.getElementById('myChartDisplacement').getContext('2d');
var ctxVelocity = document.getElementById('myChartVelocity').getContext('2d');
var ctxAcceleration = document.getElementById('myChartAcceleration').getContext('2d'); 

const botao = document.getElementById('btnGerar');
botao.addEventListener('click', plotGraphs);

var chart1 = undefined,
    chart2 = undefined,
    chart3 = undefined;

function plotGraphs(){
    let freq = document.getElementById('freq').value;
    let radFreq = 2 * Math.PI * freq;

    let xLabel = genXLabel(freq);
    let yDisplacement = genYDisplacement(radFreq, xLabel);
    let yVelocity = genYVelocity(radFreq, xLabel);
    let yAcceleration = genYAcceleration(radFreq, xLabel);

    if (typeof chart !== 'undefined') {
        chart1.destroy()
        .then(() => {
            chart2.destroy();
        })
        .then(() => {
            chart3.destroy();
        })
        .catch(err => console.log(err));
        
    }

    if ((xLabel.length > 0) && (yDisplacement.length > 0)){

        chart1 = new Chart(ctxDisplacement, {
            type: 'line',
        
            data: {
                labels: xLabel,
                datasets: [{
                    label: `Deslocamento: frequência = ${freq}`,
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: yDisplacement
                }]
            },
        
            options: {}
        });

        chart2 = new Chart(ctxVelocity, {
            type: 'line',

            data: {
                labels: xLabel,
                datasets: [{
                    label: `Velocidade: frequência = ${freq}`,
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: yVelocity
                }]
            },

            options: {}
        });

        chart3 = new Chart(ctxAcceleration, {
            type: 'line',
        
            data: {
                labels: xLabel,
                datasets: [{
                    label: `Aceleração: frequência = ${freq}`,
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: yAcceleration
                }]
            },
        
            options: {}
        });


    }

    // Apaga os valores das variáveis
    xLabel = [];
    yDisplacement = [];
    yVelocity = [];
    yAcceleration = [];
}

// Taxa de amostragem = freq/10
// Tempo mostrado no gráfico = 10s

function genXLabel(freq) {
    let vec = [];
    for (let cont = 0; cont <= 10; cont += (1/(10*freq))){
        vec.push(cont.toFixed(5));
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

function genYVelocity(radFreq, xLabel) {
    let vecYV = [];
    for (let cont = 0; cont < xLabel.length; cont++) {
        vecYV.push(radFreq * Math.cos(radFreq * xLabel[cont]));
    }

    return vecYV;
}

function genYAcceleration(radFreq, xLabel) {
    let vecYA = [];
    for (let cont = 0; cont < xLabel.length; cont++) {
        vecYA.push((-radFreq) * radFreq * Math.sin(radFreq * xLabel[cont]));
    }

    return vecYA;
}