
export type Gender = 'male'|'female';

export interface Diagnoses {
  code: string;
  name: string;
  latin?: string;
}
export interface Patient {
  id: string ;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}
export type NonSensitivePatientEntry = Omit<Patient, 'ssn'>;