import patientData from '../../data/patients';
import { Patient, NonSensitivePatient, NewPatientEntry, EntryWithoutId, Entry } from '../types';
import { v1 as uuid } from 'uuid';
const id = uuid();

const patients: Array<Patient> = patientData ;

const getPatients = (): Array<Patient> => {
    return patients;
};

const getPatient = (id: string): Patient | undefined => {
    return patients.find(p => p.id === id);
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({id, name, dateOfBirth, gender, occupation}));
};

const addPatient = (entry: NewPatientEntry): Patient => {
    const newPatientEntry = {
        id: id,
        ...entry
    };

    patients.push(newPatientEntry);
    return newPatientEntry;
};

const addEntry = (id: string, entry: EntryWithoutId): Entry | undefined => {
    const patient = patients.find(p => p.id === id);
    if(patient){
        const newEntry = {
            id: uuid(),
            ...entry
        };
        patient.entries.push(newEntry);
        return newEntry;
    }
    return undefined;
};

export default {
    getPatients,
    getNonSensitivePatients,
    addPatient,
    getPatient,
    addEntry
};
