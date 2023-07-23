import { NewPatientEntry,
    Gender,
    EntryWithoutId,
    SickLeave,
    Discharge,
    Diagnosis,
    HealthCheckRating } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name: ' + name);
    }
    return name;
};

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn: ' + ssn);
    }
    return ssn;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation: ' + occupation);
    }
    return occupation;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect or missing date of birth: ' + dateOfBirth);
    }
    return dateOfBirth;
};

const isGender = (gender: string): gender is Gender => {
    return Object.values(Gender).map(g => g.toString()).includes(gender);
};

const parseGender = (gender: unknown): Gender => {
    if(!isString(gender) || !isGender(gender)){
        throw new Error('Incorrect or missing gender: ' + gender);
    }

    return gender;
};

const isHealthCheckRating = (healthCheckRating: number): healthCheckRating is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(healthCheckRating);
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
    const numericRating = Number(healthCheckRating);

    if (isNaN(numericRating) || !isHealthCheckRating(numericRating)) {
        throw new Error('Incorrect or missing health check rating: ' + healthCheckRating);
    }

    return numericRating;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
      // we will just trust the data to be in correct form
      return [] as Array<Diagnosis['code']>;
    }
  
    return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const parseDischarge = (object: unknown): Discharge => {
    if(!object || typeof object !== 'object' || !('date' in object) || !('criteria' in object)){
        throw new Error('Incorrect or missing discharge: ' + object);
    }

    const discharge: Discharge = {
        date: parseDateOfBirth(object.date),
        criteria: parseName(object.criteria)
    };

    return discharge;
};

const parseEmployerName = (employerName: unknown): string => {
    if(!employerName || !isString(employerName)){
        throw new Error('Incorrect or missing employer name: ' + employerName);
    }

    return employerName;
};

const parseSickLeave = (object: unknown): SickLeave => {
    if(!object || typeof object !== 'object' || !('startDate' in object) || !('endDate' in object)){
        throw new Error('Incorrect or missing sick leave: ' + object);
    }

    const sickLeave: SickLeave = {
        startDate: parseDateOfBirth(object.startDate),
        endDate: parseDateOfBirth(object.endDate)
    };

    return sickLeave;
};

const toNewOccupationalHealthcareEntry = (object: unknown): EntryWithoutId => {
    if(!object || typeof object !== 'object'){
        throw new Error('Incorrect or missing data');
    }

    if('type' in object && 'description' in object && 'date' in object && 'specialist' in object && 'employerName' in object){
        const newEntry: EntryWithoutId = {
            type: 'OccupationalHealthcare',
            description: parseName(object.description),
            date: parseDateOfBirth(object.date),
            specialist: parseName(object.specialist),
            employerName: parseEmployerName(object.employerName),
            diagnosisCodes: parseDiagnosisCodes(object),
        };

        if('sickLeave' in object){
            newEntry.sickLeave = parseSickLeave(object.sickLeave);
        }

        return newEntry;
    }

    throw new Error('Incorrect or missing data');
};

const toNewHospitalEntry = (object: unknown): EntryWithoutId => {
    if(!object || typeof object !== 'object'){
        throw new Error('Incorrect or missing data');
    }

    if('type' in object && 'description' in object && 'date' in object && 'specialist' in object && 'discharge' in object){
        const newEntry: EntryWithoutId = {
            type: 'Hospital',
            description: parseName(object.description),
            date: parseDateOfBirth(object.date),
            specialist: parseName(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object),
            discharge: parseDischarge(object.discharge)
        };

        return newEntry;
    }

    throw new Error('Incorrect or missing data');
};

const toNewHealthCheckEntry = (object: unknown): EntryWithoutId => {
    if(!object || typeof object !== 'object'){
        throw new Error('Incorrect or missing data');
    }

    if('type' in object && 'description' in object && 'date' in object && 'specialist' in object && 'healthCheckRating' in object){
        const newEntry: EntryWithoutId = {
            type: 'HealthCheck',
            description: parseName(object.description),
            date: parseDateOfBirth(object.date),
            specialist: parseName(object.specialist),
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
            diagnosisCodes: parseDiagnosisCodes(object),
        };

        return newEntry;
    }

    throw new Error('Incorrect or missing data');
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
    if(!object || typeof object !== 'object'){
        throw new Error('Incorrect or missing data');
    }

    if('type' in object){
        switch(object.type){
            case 'OccupationalHealthcare':
                return toNewOccupationalHealthcareEntry(object);
            case 'Hospital':
                return toNewHospitalEntry(object);
            case 'HealthCheck':
                return toNewHealthCheckEntry(object);
            default:
                throw new Error('Incorrect or missing data');
        }
    }

    throw new Error('Incorrect or missing data');
};

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    if(!object || typeof object !== 'object'){
        throw new Error('Incorrect or missing data');
    }

    if('name' in object && 'gender' in object && 'dateOfBirth' in object && 'occupation' in object && 'ssn' in object){
        const newEntry: NewPatientEntry = {
            name: parseName(object.name),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender),
            entries: [],
            occupation: parseOccupation(object.occupation)
        };

        return newEntry;
    }

    throw new Error('Incorrect or missing data');
};