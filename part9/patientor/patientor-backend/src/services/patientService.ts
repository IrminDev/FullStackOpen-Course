import patientData from '../../data/patients';
import { Patient, NonSensitivePatient, NewPatientEntry } from '../types';
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

export default {
    getPatients,
    getNonSensitivePatients,
    addPatient,
    getPatient
};
