import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes, useParams } from "react-router-dom";
import { Button, Divider, Container, Typography, Card, CardContent } from '@mui/material';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { apiBaseUrl } from "./constants";
import { Patient, Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "./types";
import Stack from '@mui/material/Stack';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";

const PatientPage = ({patients} : {patients: Patient[]}) => {
  const [patient, setPatient] = useState<Patient>()
  const id = useParams<{ id: string }>().id;

  useEffect(() => {
    const fetchPatient = async () => {
      if(id){
        const patient = await patientService.getPatient(id);
        setPatient(patient);
      }
    };
    void fetchPatient();
  }, [id]);

  if (!patient) {
    return null;
  }

  return (
    <div>
      <h1>{patient.name}</h1>
      {patient.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h2>entries</h2>
      <Stack spacing={2}>
        {patient.entries.map(entry => {
          return (
            <EntryDetails key={entry.id} {...entry}></EntryDetails>
          )
        })}
      </Stack>
    </div>
  );
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
}

const EntryDetails = (entry: Entry) => {
  switch(entry.type){
    case 'HealthCheck':
      return <HealthCheckEntryDetail entry={entry}></HealthCheckEntryDetail>
    case 'Hospital':
      return <HospitalEntryDetail entry={entry}></HospitalEntryDetail>
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntryDetail entry={entry}></OccupationalHealthcareEntryDetail>
    default:
      return assertNever(entry);
  }
}

const HealthCheckEntryDetail = ({entry} : {entry: HealthCheckEntry}) => {
  return (
    <Card>
      <CardContent>
        <p>{entry.date} <MedicalServicesIcon></MedicalServicesIcon></p>
        <p>{entry.description}</p>
        {entry.healthCheckRating === 0 ?
          <FavoriteIcon color='primary' ></FavoriteIcon> :
          entry.healthCheckRating === 1 ?
          <FavoriteIcon color='secondary' ></FavoriteIcon> :
          entry.healthCheckRating === 2 ?
          <FavoriteIcon color='warning' ></FavoriteIcon> :
          <FavoriteIcon color='error'></FavoriteIcon>
        }
        <ul>
          {entry.diagnosisCodes?.map(code => {
            return (
              <li key={code}>{code}</li>
            )
          })}
        </ul>
        <p>diagnose by {entry.specialist}</p>
      </CardContent>
    </Card>
  )
}

const HospitalEntryDetail = ({entry} : {entry: HospitalEntry}) => {
  return (
    <Card>
      <CardContent>
        <p>{entry.date} <LocalHospitalIcon></LocalHospitalIcon></p>
        <p>{entry.description}</p>
        <ul>
          {entry.diagnosisCodes?.map(code => {
            return (
              <li key={code}>{code}</li>
            )
          })}
        </ul>
        <p>discharge: {entry.discharge.date} {entry.discharge.criteria}</p>
        <p>diagnose by {entry.specialist}</p>
      </CardContent>
    </Card>
  )
}

const OccupationalHealthcareEntryDetail = ({entry} : {entry: OccupationalHealthcareEntry}) => {
  return (
    <Card>
      <CardContent>
        <p>{entry.date} <WorkIcon></WorkIcon> {entry.employerName}</p>
        <p>{entry.description}</p>
        <ul>
          {entry.diagnosisCodes?.map(code => {
            return (
              <li key={code}>{code}</li>
            )
          })}
        </ul>
        {entry.sickLeave ? <p>sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}</p> : null}
        <p>diagnose by {entry.specialist}</p>
      </CardContent>
    </Card>
  )
}

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);
  
  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
            <Route path="/patients/:id" element={<PatientPage patients={patients} />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
