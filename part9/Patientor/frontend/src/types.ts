export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}
export enum EntryType {
  HospitalEntry = "HospitalEntry",
  OccupationalHealthcareEntry = "OccupationalHealthcareEntry",
  HealthCheckEntry = "HealthCheckEntry"
}
export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnoses['code']>;
}
export enum HealthCheckRating {
  Healthy = 0,
  LowRisk = 1,
  HighRisk = 2,
  CriticalRisk = 3
}

export type Discharge = {
  date?: string;
  criteria?: string;
};

export interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheckEntry;
  healthCheckRating?: HealthCheckRating;
}
export interface HospitalEntry extends BaseEntry {
  type: EntryType.HospitalEntry;
  discharge?: Discharge;
}

export type SickLeave = {
  startDate?: string;
  endDate?: string;
};


export interface OccupationalHealthcareEntry extends BaseEntry {
  type: EntryType.OccupationalHealthcareEntry;
  employerName?: string;
  sickLeave?: SickLeave;
}
export interface Diagnoses {
  code?: string;
  name?: string;
  latin?: string;
}
export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;