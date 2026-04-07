const express = require('express');
const path = requiere('path');
const app = express();
const PORT = 3000;

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint, persona 3 lo completa
app.get('/api/saludo', (req, res) => {
    res.json({
        mensaje: "¡Hola desde el backend de la UNCSM!",
        estudiantes: ["Pendiente"],
        Universidad: "Universidad Nacional Casimiro Sotelo Montenegro",
        unidad: "Unidad II: Herramientas para el desarrollo web"
    });
});

// Iniciar el servidor...
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});