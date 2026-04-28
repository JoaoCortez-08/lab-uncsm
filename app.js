require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// --- MIDDLEWARES GLOBALES ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de Registro
app.use((req, res, next) => {
    const tiempo = new Date().toISOString();
    console.log(`[LOG] ${tiempo} - Método: ${req.method} - URL: ${req.url}`);
    next();
});

// --- MIDDLEWARES DE SEGURIDAD (LOCALES) ---
const validarAcceso = (req, res, next) => {
    const llave = req.query.llave; // Ahora se llamará llave en vez de token

    if (llave === 'Casimiro2026') { // Credencial válida según la guía
        console.log("Acceso permitido"); // Requisito de consola
        next();
    } else {
        res.status(401).send("401 - No autorizado");
    }
};

// --- RUTAS PROTEGIDAS ---
// Aplicación del middleware
app.get('/search', validarAcceso, (req, res) => {
    const terms = req.query.termino || 'No especificado';
    const categoria = req.query.categoria || 'Sin categoría';
    res.json({
        estado: "Búsqueda exitosa",
        terminos: terms,
        categoria: categoria,
        timestamp: new Date()
    });
});

app.get('/users/:id', validarAcceso, (req, res) => {
    const userId = req.params.id;
    res.json({
        estado: "Usuario encontrado",
        id_usuario: userId,
        data: `Mensaje predeterminado del backend para el usuario ${userId}`,
        timestamp: new Date()
    });
});

app.get('/api/saludo', verificarAcceso, (req, res) => { // Nueva ruta protegida para el saludo desde el backend
    console.log("Acceso concedido ✅");
    res.json({
        mensaje: "¡Hola desde la API protegida!",
        nave: "🚀", // La nave que se pide
        universidad: "Universidad Casimiro Sotelo Montenegro"
    })
})

// --- MANEJO DE ERRORES ---
// Middleware para rutas no definidas
// DEBE SER EL ÚLTIMO ANTES DEL LISTEN
app.use((req, res) => {
    res.status(404).send('<h2>Error 404: Recurso no encontrado</h2><p>El diseño personalizado de la Casimiro Sotelo.</p>');
});

// Middleware de error 500
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("500 - Fallo interno del servidor");
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en: http://localhost:${PORT}`);
});