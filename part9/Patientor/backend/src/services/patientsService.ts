import patients from '../../data/patients';

import { Patient, NonSensitivePatientEntry } from '../types';

const getData = (): Array<Patient> => {
  return patients;
};

const addData = () => {
  return null;
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

const findById = (id: string): Patient  | undefined  => {
  const entry = patients.find(p => p.id === id);
  return entry;
};

export default {
  getData,
  addData,
  getNonSensitiveEntries,
  findById
};