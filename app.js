const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware para archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// ENDPOINT /api/saludo
app.get('/api/saludo', (req, res) => {
    const estudiantes = [
        "Octavio Cortez",
        "Eduardo Valle",
        "Eduardo Aguilar"
    ];

    res.json({
        mensaje: "¡Hola desde el backend de la Casimiro Sotelo!",
        estudiantes: estudiantes,
        Universidad: "UNCSM - Universidad Nacional Casimiro Sotelo Montenegro",
        unidad: "Unidad II: Herramientas para el desarrollo Web",
        fecha: new Date().toLocaleDateString('es-ES'),
        materia: "Desarrollo de Aplicaciones Web",
        docente: "Allan Fernando Granizo Bravo"
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`Endpoint: http://localhost:${PORT}/api/saludo`);
});