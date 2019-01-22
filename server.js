const fs = require('fs');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/customer-data', (req, res) => {
    fs.readFile('./data/customer-data.json', (err, data) => {
        if (err) {
            res.status(500).send('Internal service error');
        } else {
            const data = fs.readFileSync('customer-data.json');
            res.send(data);
        }
    });
});

app.post('/customer-data', (req, res) => {
    const data = JSON.stringify(req.body);
    fs.writeFile('./data/something.json', data, (err) => {
        if (err) {
            res.status(500).send('Internal service error');
        } else {
            res.json({ message: 'Customers updated' });
        }
    });
});
