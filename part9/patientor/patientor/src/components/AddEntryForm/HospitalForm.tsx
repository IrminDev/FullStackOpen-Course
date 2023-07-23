import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { HospitalEntry, EntryWithoutId } from '../../types';

// Interfaces (igual que antes)

const HospitalForm = ({show, submit} : {show: boolean, submit: (entry:EntryWithoutId) => void}) => {
  const [formData, setFormData] = useState<Omit<HospitalEntry, 'id'>>({
    type: "Hospital",
    discharge: {
      date: "",
      criteria: "",
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
        label="Discharge Date"
        name="discharge.date"
        type="date"
        value={formData.discharge.date}
        onChange={handleChange}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Discharge Criteria"
        name="discharge.criteria"
        value={formData.discharge.criteria}
        onChange={handleChange}
        fullWidth
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

export default HospitalForm;