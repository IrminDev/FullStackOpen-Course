import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { EntryWithoutId, OccupationalHealthcareEntry } from '../../types';

// Interfaces (igual que antes)

const OccupationalHealthcareForm = ({show, submit} : {show: boolean, submit: (entry:EntryWithoutId) => void}) => {
  const [formData, setFormData] = useState<Omit<OccupationalHealthcareEntry, 'id'>>({
    type: "OccupationalHealthcare",
    employerName: "",
    sickLeave: {
      startDate: "",
      endDate: "",
    },
    description: "",
    date: "",
    specialist: "",
    diagnosisCodes: [],
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDiagnosisCodesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const diagnosisCodes = event.target.value.split(',');
    setFormData((prevData) => ({
      ...prevData,
      diagnosisCodes,
    }));
  };

  const handleSubmit = () => {
    const newEntry:EntryWithoutId = {
      ...formData,
    }
    submit(newEntry);
  };

  if(!show){
    return null
  }

  return (
    <form>
      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Date"
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Specialist"
        name="specialist"
        value={formData.specialist}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Employer Name"
        name="employerName"
        value={formData.employerName}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Sick Leave Start Date"
        name="startDate"
        type="date"
        value={formData.sickLeave?.startDate || ""}
        onChange={handleChange}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Sick Leave End Date"
        name="endDate"
        type="date"
        value={formData.sickLeave?.endDate || ""}
        onChange={handleChange}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Diagnosis Codes"
        name="diagnosisCodes"
        value={formData.diagnosisCodes?.join(',')}
        onChange={handleDiagnosisCodesChange}
        fullWidth
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </form>
  );
};

export default OccupationalHealthcareForm;