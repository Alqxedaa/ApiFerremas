const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Conectado a MONGODB'))
.catch(err => console.error('Error de conexión:', err));

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/productos', require('./routes/productos'));
app.use('/api/pedidos', require('./routes/pedidos'));
app.use('/api/login', require('./routes/login'));
app.use('/api/carrito', require('./routes/carrito'));



app.get('/', (req, res) => {
    res.send('API funcionando');
});
app.listen(port, () => {
    console.log(`API en http://localhost:${port}`);
});
