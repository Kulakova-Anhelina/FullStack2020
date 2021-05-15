// eslint-disable-next-line @typescript-eslint/no-empty-interface

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export interface Diagnoses {
  code: string;
  name: string;
  latin?: string;
}
export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export interface BaseEntry {
  id: string;
  type: EntryType;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnoses['code']>;

}

export type NewBaseEntry = Omit<BaseEntry, "id">;
export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
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


interface OccupationalHealthcareEntry extends BaseEntry {
  type: EntryType.OccupationalHealthcareEntry;
  employerName?: string;
  sickLeave?: SickLeave;
}
export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export enum EntryType {
  HospitalEntry = "Hospital",
  OccupationalHealthcareEntry = "OccupationalHealthcare",
  HealthCheckEntry = "HealthCheck"
}

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;
export type NewPatientEntry = Omit<Patient, 'id'>;
export type EntryWithoutId = UnionOmit<Entry, 'id'>;