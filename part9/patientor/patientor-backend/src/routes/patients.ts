import express from 'express';
import patientService from '../services/patientService';
import {toNewPatientEntry, toNewEntry } from '../utils';

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
        const patientMod = {...patient};
        res.send(patientMod);
    } else {
        res.sendStatus(404);
    }
});

router.post('/:id/entries', (req, res) => {
    const id = req.params.id;
    try{
        const newEntry = toNewEntry(req.body);
        const addedEntry = patientService.addEntry(id, newEntry);
        if(addedEntry){
            res.json(addedEntry);
        } else {
            res.sendStatus(404);
        }
    } catch (e: unknown) {
        if (e instanceof Error) {
            res.status(400).send(e.message);
        }
    }
});

export default router;