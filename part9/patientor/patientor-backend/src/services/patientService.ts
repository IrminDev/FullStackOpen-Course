import patientData from '../../data/patients';
import { Patient, NonSensitivePatient } from '../types';

const patients: Array<Patient> = patientData as Array<Patient>;

const getPatients = (): Array<Patient> => {
    return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({id, name, dateOfBirth, gender, occupation}));
};

export default {
    getPatients,
    getNonSensitivePatients
};
