export enum Gender {
    male = 'male',
    female = 'female'
}

export interface Entry {
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export type NewPatientEntry = Omit<Patient, 'id'>;

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;