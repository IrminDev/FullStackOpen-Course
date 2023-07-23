import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes, useParams } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { apiBaseUrl } from "./constants";
import { Patient } from "./types";

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
    </div>
  );
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
