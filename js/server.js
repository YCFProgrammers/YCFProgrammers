const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Servir archivos estáticos con el tipo MIME correcto para JavaScript
app.use(express.static('./', { 
  setHeaders: (res, path, stat) => {
    if (path.endsWith('.js')) {
      res.set('Content-Type', 'application/javascript');
    }
  }
}));

// Ruta para la página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'chat.html'));
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});