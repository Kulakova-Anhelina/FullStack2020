import patients from '../../data/patients';
import { v4 as uuidv4 } from 'uuid';


import { Patient, PublicPatient, NewPatientEntry } from '../types';

const getData = (): Array<Patient> => {
  return patients;
};
const addData = (entry: NewPatientEntry): Patient => {

  const newPatientEntry = {
    id: uuidv4(),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const getNonSensitiveEntries = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const findById = (id: string): Patient | undefined => {
  const entry = patients.find(p => p.id === id);
  return entry;
};


export default {
  getData,
  addData,
  getNonSensitiveEntries,
  findById
};