const data = [
    { "FECHA": "240107", "velocidad": "43" },
    { "FECHA": "240109", "velocidad": "32" },
    { "FECHA": "240116", "velocidad": "29" },
    { "FECHA": "240125", "velocidad": "27" },
    { "FECHA": "240203", "velocidad": "34" },
    { "FECHA": "240211", "velocidad": "33" },
    { "FECHA": "240216", "velocidad": "30" },
    { "FECHA": "240223", "velocidad": "24" },
    { "FECHA": "240303", "velocidad": "23" },
    { "FECHA": "240308", "velocidad": "34" },
    { "FECHA": "240313", "velocidad": "31" },
    { "FECHA": "240319", "velocidad": "29" },
    { "FECHA": "240325", "velocidad": "26" },
    { "FECHA": "240404", "velocidad": "26" },
    { "FECHA": "240414", "velocidad": "23" },
    { "FECHA": "240416", "velocidad": "26" },
    { "FECHA": "240426", "velocidad": "30" },
    { "FECHA": "240501", "velocidad": "32" },
    { "FECHA": "240507", "velocidad": "34" },
    { "FECHA": "240513", "velocidad": "22" },
    { "FECHA": "240522", "velocidad": "25" },
    { "FECHA": "240530", "velocidad": "18" },
    { "FECHA": "240608", "velocidad": "42" },
    { "FECHA": "240613", "velocidad": "47" },
    { "FECHA": "240618", "velocidad": "32" },
    { "FECHA": "240627", "velocidad": "20" },
    { "FECHA": "240703", "velocidad": "20" },
    { "FECHA": "240710", "velocidad": "29" },
    { "FECHA": "240721", "velocidad": "24" },
    { "FECHA": "240725", "velocidad": "19" },
    { "FECHA": "240802", "velocidad": "46" },
    { "FECHA": "240806", "velocidad": "35" },
    { "FECHA": "240816", "velocidad": "20" },
    { "FECHA": "240819", "velocidad": "26" },
    { "FECHA": "240826", "velocidad": "24" },
    { "FECHA": "240902", "velocidad": "35" },
    { "FECHA": "240913", "velocidad": "25" },
    { "FECHA": "240919", "velocidad": "26" },
    { "FECHA": "240924", "velocidad": "29" },
    { "FECHA": "241001", "velocidad": "35" },
    { "FECHA": "241009", "velocidad": "24" }
];

const highAudio = document.getElementById('highWind');
const mediumAudio = document.getElementById('mediumWind');
const lowAudio = document.getElementById('lowWind');
const conteDegradado = document.querySelector('.conte-degradado');



const dates = data.map(item => {
    const year = parseInt(item.FECHA.slice(0, 2)) + 2000;
    const month = parseInt(item.FECHA.slice(2, 4)) - 1;
    const day = parseInt(item.FECHA.slice(4, 6));
    return new Date(year, month, day);
});

const velocities = data.map(item => parseFloat(item.velocidad));

// Función para formatear fechas en español
const mesesEspañol = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
function formatearFechaEnEspañol(date) {
    const day = date.getDate();
    const month = mesesEspañol[date.getMonth()];
    const year = date.getFullYear();
    return `${day} de ${month} de ${year}`;
}

const datesInSpanish = dates.map(formatearFechaEnEspañol);

const trace = {
    x: dates,
    y: velocities,
    type: 'scatter',
    mode: 'markers+lines',
    name: 'Velocidad',
    line: { color: 'rgba(0, 0, 0, 1)', width: 2 },
    marker: { color: 'rgba(0, 0, 0, 1)', size: 8, symbol: 'circle' },
    text: datesInSpanish.map((date, index) => `${date}<br>Velocidad: ${velocities[index]} Km/h`),
    hoverinfo: 'text',
};

const layout = {
    hovermode:'closest',
        xaxis: {
            type: 'date',
            tickformat: '%B',
            dtick: 'M1', // Show tick every month
            tickangle: -45,
            ticktext: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            tickvals: dates.filter((d, i, arr) => 
                i === 0 || d.getMonth() !== arr[i-1].getMonth()
            ),
            showgrid: false, // Remove background grid for x-axis
            range: [
                new Date(dates[0].getTime()) - 1 * 24 * 60 * 60 * 1000,
                new Date(dates[dates.length - 1].getTime() + 1 * 24 * 60 * 60 * 1000) // 1 semana después de la última fecha
            ]
        },
        yaxis: { 
            title: 'Velocidad (Km/h)',
            range: [0, 50], // Set y-axis range from 0 to 50
            showgrid: false // Remove background grid for y-axis
        },
        shapes: [
            {
                type: 'line',
                x0: dates[0],
                y0: 0,
                x1: dates[0],
                y1: 50,
                line: {
                    color: 'rgba(0, 0, 0, 1)',
                    width: 1,
                }
            },
            {
                type: 'line',
                x0: new Date(2024, 5, 13),
                y0: 0,
                x1: new Date(2024, 5, 13),
                y1: 47.1528,
                line: {
                    color: 'rgba(130, 0, 0, 0.8)',
                    width: 2,
                }
            },
            {
                type: 'line',
                x0: new Date(2024, 7, 2),
                y0: 0,
                x1: new Date(2024, 7, 2),
                y1: 46.24092,
                line: {
                    color: 'rgba(0, 0, 130, 0.8)',
                    width: 2,
                }
            },
            {
                type: 'circle',
                x0: new Date(2024, 5, 13).getTime() - 950 * 60 * 60 * 12 * 1.7, // Half a day before
                y0: 47.1528 - 0.5, // Slightly below the point
                x1: new Date(2024, 5, 13).getTime() + 950 * 60 * 60 * 12 * 1.7, // Half a day after
                y1: 47.1528 + 0.25, // Slightly above the point
                fillcolor: 'rgba(130, 0, 0, 1)',
                opacity: 1,
                line: {
                    color: 'rgba(130, 0, 0, 0.8)'
                }
            },
            {
                type: 'circle',
                x0: new Date(2024, 7, 2).getTime() - 950 * 60 * 60 * 12 * 1.7, // Half a day before
                y0: 46.24092 - 0.5, // Slightly below the point
                x1: new Date(2024, 7, 2).getTime() + 950 * 60 * 60 * 12 * 1.7, // Half a day after
                y1: 46.24092 + 0.25, // Slightly above the point
                fillcolor: 'rgba(0, 0, 130, 1)',
                opacity: 1,
                line: {
                    color: 'rgba(0, 0, 130, 0.8)'
                }
            }
        ],
        annotations: [
            {
                x: new Date(2024, 5, 13),
                y: 48.1528,
                xref: 'x',
                yref: 'y',
                text: '<b style="color:rgba(130, 0, 0, 0.8);">47 Km/h',
                showarrow: false,
            },
            {
                x: new Date(2024, 7, 2),
                y: 47.24092,
                xref: 'x',
                yref: 'y',
                text: '<b style="color:rgba(0, 0, 130, 0.8);">46 Km/h',
                showarrow: false,
            },
            {
                x: new Date(2024, 3, 16),
                y: 10,
                xref: 'x',
                yref: 'y',
                text: '     <b>                      Velocidad máxima del viento alcanzada en 2024</b><br><b style="color:rgba(130, 0, 0, 0.8);">El 13 de junio </b>se registraron ráfagas de viento que alcanzaron los 47 Km/h.     <br> Este evento fue parte de un sistema frontal que provocó lluvias intensas y    <br>     condiciones climáticas adversas en gran parte del centro-sur del país.',
                showarrow: false,
                font: {
                    color: 'black'
                }
            },
            {
                x: new Date(2024, 7, 14), // August 2, 2024
                y: 10,
                xref: 'x',
                yref: 'y',
                text: '                                     El <b style="color:rgba(0, 0, 130, 0.8);">2 de agosto </b>se registraron fuertes <br>                               ráfagas de viento. Esto junto a la <br>                                intensa lluvia dejaron a gran parte<br>                                  de la poblacion sin servicio de agua <br>  y electricidad.',
                showarrow: false,
                font: {
                    color: 'black'
                }
            }
    ],
    autosize: true,
    height: 600,
    margin: { l: 50, r: 50, b: 100, t: 20, pad: 4 },
};


const config = {
    responsive: true,
    displayModeBar: true,
    staticPlot: true,            
};

Plotly.newPlot('chart', [trace], layout);

document.getElementById('chart').on('plotly_hover', (event) => {
const velocidad = event.points[0].y; // Obtén la velocidad de la posición del ratón
if (velocidad > 45) {
    conteDegradado.style.background = `radial-gradient(circle at ${event.event.clientX}px ${event.event.clientY}px, transparent 0%, black 500px)`;
    highAudio.volume = 1.0;
    mediumAudio.volume = 0;
    lowAudio.volume = 0;
    highAudio.play();  // Reproduce el sonido cuando la velocidad es mayor que 45
} else if (velocidad >= 32) {
    mediumAudio.volume = 0.6;
    highAudio.volume = 0;
    lowAudio.volume = 0;
    mediumAudio.play();  // Reproduce el sonido cuando la velocidad es entre 32 y 45
} else {
    lowAudio.volume = 0.5;
    highAudio.volume = 0;
    mediumAudio.volume = 0;
    lowAudio.play();  // Reproduce el sonido cuando la velocidad es menor que 32
}
});



document.getElementById('chart').on('plotly_hover', (event) => {
    const velocidad = event.points[0].y; // Obtén la velocidad desde el gráfico
    fetch('http://localhost:3000/velocidad', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ velocidad }),
    })
    .then(response => response.json())
    .then(data => console.log('Velocidad enviada:', data))
    .catch(error => console.error('Error al enviar la velocidad:', error));
});




document.getElementById('chart').on('plotly_unhover', () => {
    highAudio.pause();
    mediumAudio.pause();
    lowAudio.pause();
    conteDegradado.style.pointerEvents = 'none';
    conteDegradado.style.background = 'none';
});