
export type Gender = 'male'|'female';

export interface Diagnoses {
  id: string ;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  latin?: boolean;
}