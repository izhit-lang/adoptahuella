require('dotenv').config();

const express = require('express');
const cors = require('cors');

const usuarioRoutes = require('./routes/usuarioRoutes');
const refugioRoutes = require('./routes/refugioRoutes');
const especieRoutes = require('./routes/especieRoutes');
const mascotaRoutes = require('./routes/mascotaRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/refugios', refugioRoutes);
app.use('/api/especies', especieRoutes);
app.use('/api/mascotas', mascotaRoutes);

app.get('/', (req, res) => {
  res.json({
    mensaje: 'API AdoptaHuella funcionando correctamente'
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});