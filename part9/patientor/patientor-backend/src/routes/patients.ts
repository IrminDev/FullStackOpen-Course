import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitivePatients());
});

router.post('/', (req, res) => {
    try{
        const newPatientEntry = toNewPatientEntry(req.body);
        const addedEntry = patientService.addPatient(newPatientEntry);
        res.json(addedEntry);
    } catch (e: unknown) {
        if (e instanceof Error) {
            res.status(400).send(e.message);
        }
    }
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const patient = patientService.getPatient(id);
    
    if(patient){
        const patientMod = {...patient, entries: []};
        res.send(patientMod);
    } else {
        res.sendStatus(404);
    }
});

export default router;