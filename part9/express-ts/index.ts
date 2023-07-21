import express = require ('express');
import { calculateBMI, isNumber } from './utils/bmi';
import { calculateExercises } from './utils/exercises';

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

app.post('/exercises', (req, res) => {
    const { daily_exercises, target } = req.body as { daily_exercises: Array<number>, target: number};
    if (!daily_exercises || !target) {
        res.status(400).json({ error: "parameters missing" });
    } else if (!Array.isArray(daily_exercises) || !isNumber(target)) {
        res.status(400).json({ error: "malformatted parameters" });
    } else {
        const result = calculateExercises(daily_exercises, target);
        res.json(result);
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});