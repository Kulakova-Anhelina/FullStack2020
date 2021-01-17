
import { NewPatientEntry, Gender  } from './types';


const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};
const parseName = (
  name: any,
    ): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing : ' + name);
  }

  return name;
};
const parseDateOfBirth= (
  dateOfBirth: any,
    ): string => {
  if (!dateOfBirth|| !isString(dateOfBirth)) {
    throw new Error('Incorrect or missing : ' + dateOfBirth);
  }

  return dateOfBirth;
};

const parseOcuppation = (

  occupation: any
    ): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing : ' + occupation);
  }

  return occupation;
};


const parsessn = (
  ssn: any
    ): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing : ' + ssn);
  }

  return ssn;
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender =>{
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing : ' + gender);
  }
  return gender;
};


/* eslint-disable @typescript-eslint/no-explicit-any */
const toNewPatientEntry = (object: any):  NewPatientEntry => {
  const newEntry:  NewPatientEntry = {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
     gender : parseGender(object.gender),
     occupation: parseOcuppation(object.occupation),
     ssn: parsessn(object.ssn),
     entries:object.entries
  };

  return newEntry;
};

export default toNewPatientEntry;
