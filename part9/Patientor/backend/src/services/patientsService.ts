import patients from "../../data/patients";
import { v4 as uuidv4 } from "uuid";
import {
  Patient,
  PublicPatient,
  NewPatientEntry,
  Entry,
  EntryWithoutId,
} from "../types";

let savedPatients = [...patients];

const getData = (): Array<Patient> => {
  return savedPatients;
};
const addData = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuidv4(),
    ...entry,
  };

  savedPatients.push(newPatientEntry);
  return newPatientEntry;
};


const addEntry = (patient: Patient, newEntry: EntryWithoutId): Patient => {
  const entry: Entry = { ...newEntry, id: uuidv4() };
  const savedPatient = { ...patient, entries: patient.entries.concat(entry) };
  savedPatients = savedPatients.map((p) =>
    p.id === savedPatient.id ? savedPatient : p

  );

  return savedPatient;
};

const getNonSensitiveEntries = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const findById = (id: string): Patient | undefined => {
  const entry = savedPatients.find((p) => p.id === id);
  return entry;
};

export default {
  getData,
  addData,
  getNonSensitiveEntries,
  findById,
  addEntry,
};
