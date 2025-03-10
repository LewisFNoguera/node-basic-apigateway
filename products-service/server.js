const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors({ origin: 'http://localhost:3000' }));

app.get('/products', (req, res) => {
    res.json([{ id: 101, name: 'Laptop' }]);
});

app.listen(5002, () => console.log('Products service on http://localhost:5002'));