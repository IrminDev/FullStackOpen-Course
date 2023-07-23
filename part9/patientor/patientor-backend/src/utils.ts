import { NewPatientEntry, Gender } from "./types";

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

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
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

export default toNewPatientEntry;