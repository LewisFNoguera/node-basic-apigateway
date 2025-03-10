const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors({ origin: 'http://localhost:3000' }));

app.get('/demo', (req, res) => {
    res.json({ message: "Demo service message from Microservices Architecture" });
});

app.listen(5004, () => console.log('Demo service on http://localhost:5004'));