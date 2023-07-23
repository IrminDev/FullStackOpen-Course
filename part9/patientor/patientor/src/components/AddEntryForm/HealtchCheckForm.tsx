import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { HealthCheckEntry, HealthCheckRating, EntryWithoutId } from '../../types';

// Interfaces y enumeración (igual que antes)

const HealthCheckForm = ({show, submit} : {show: boolean, submit: (entry:EntryWithoutId) => void}) => {
  const [formData, setFormData] = useState<Omit<HealthCheckEntry, 'id'>>({
    type: "HealthCheck",
    healthCheckRating: HealthCheckRating.Healthy,
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

  const handleHealthCheckRatingChange = (event: SelectChangeEvent<HealthCheckRating>) => {
    const healthCheckRating = event.target.value as HealthCheckRating;
    setFormData((prevData) => ({
      ...prevData,
      healthCheckRating
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
      <FormControl fullWidth>
        <InputLabel>Health Check Rating</InputLabel>
        <Select
          label="Health Check Rating"
          name="healthCheckRating"
          value={formData.healthCheckRating}
          onChange={handleHealthCheckRatingChange}
          fullWidth
        >
          <MenuItem value={HealthCheckRating.Healthy}>Healthy</MenuItem>
          <MenuItem value={HealthCheckRating.LowRisk}>Low Risk</MenuItem>
          <MenuItem value={HealthCheckRating.HighRisk}>High Risk</MenuItem>
          <MenuItem value={HealthCheckRating.CriticalRisk}>Critical Risk</MenuItem>
        </Select>
      </FormControl>
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

export default HealthCheckForm;