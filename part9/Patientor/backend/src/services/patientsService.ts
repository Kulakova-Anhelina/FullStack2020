import patients from '../../data/patients';


import { Patient, NonSensitivePatientEntry, NewPatientEntry } from '../types';

const getData = (): Array<Patient> => {
  return patients;
};
const addData = (entry: NewPatientEntry): Patient => {

  const newPatientEntry = {
    id: Date.now() + Math.random().toString().slice(2),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
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