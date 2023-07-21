import express = require ('express');
import { calculateBMI, isNumber } from './utils/bmi';

const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = req.query.height;
    const weight = req.query.weight;
    if (!height || !weight) {
        res.status(400).json({ error: "malformatted parameters" });
    } else if (!isNumber(height) || !isNumber(weight)) {
        res.status(400).json({ error: "malformatted parameters" });
    } else {
        const bmi = calculateBMI(Number(height)*0.01, Number(weight));
        res.json({ height, weight, bmi });
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});