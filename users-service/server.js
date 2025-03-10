const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors({ origin: 'http://localhost:3000' }));

app.get('/users', (req, res) => {
    res.json([
        { id: 1, name: 'John Doe 1' },
        { id: 2, name: 'John Doe 2' },
        { id: 3, name: 'John Doe 3' },
        { id: 4, name: 'John Doe 5' },
        { id: 5, name: 'John Doe 6' }
    ]);
});

app.listen(5001, () => console.log('Users service on http://localhost:5001'));