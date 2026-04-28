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
    const token = req.query.token;
    if (token === 'admin123') { // Credencial válida según la guía
        next();
    } else {
        res.status(401).send('<h1>Acceso no autorizado</h1><p>Se requiere un token válido para acceder.</p>');
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

// --- MANEJO DE ERRORES ---
// Middleware para rutas no definidas
// DEBE SER EL ÚLTIMO ANTES DEL LISTEN
app.use((req, res) => {
    res.status(404).send('<h2>Error 404: Recurso no encontrado</h2><p>La dirección solicitada no existe en este servidor.</p>');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en: http://localhost:${PORT}`);
});