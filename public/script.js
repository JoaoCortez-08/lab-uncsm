// Función para pedir datos al servidor
async function conectarConBackend() {
    try {
        // Hacemos la petición al endpoint que creó tu compañero
        const respuesta = await fetch('/api/saludo'); 
        
        // Convertimos la respuesta a JSON
        const datos = await respuesta.json();
        
        console.log("Respuesta recibida:", datos);
        
        // Mostramos el mensaje en una alerta (Esto vale 1 punto en la rúbrica)
        alert(datos.mensaje); 
        
    } catch (error) {
        console.error("Error al conectar con el servidor:", error);
    }
}

// Ejecutamos la función
conectarConBackend();