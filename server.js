const express = require('express');
const bodyParser = require('body-parser');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Configura el puerto serial (modifica 'COM4' según corresponda)
const port = new SerialPort({ path: 'COM4', baudRate: 9600 });
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

// Escucha los datos recibidos del Arduino (opcional, si necesitas enviar desde Arduino al servidor)
parser.on('data', (data) => {
    console.log('Datos recibidos del Arduino:', data);
});

// Ruta para recibir velocidad desde la página web
app.post('/velocidad', (req, res) => {
    const { velocidad } = req.body;
    if (velocidad) {
        // Envía la velocidad al Arduino
        port.write(`${velocidad}\n`, (err) => {
            if (err) {
                console.error('Error al enviar al Arduino:', err);
                return res.status(500).send({ error: 'Error enviando al Arduino' });
            }
            console.log(`Velocidad enviada al Arduino: ${velocidad}`);
            res.send({ success: true });
        });
    } else {
        res.status(400).send({ error: 'No se recibió una velocidad válida' });
    }
});

// Inicia el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
