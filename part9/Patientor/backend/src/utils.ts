import {
  NewPatientEntry,
  Gender,
  EntryWithoutId,
  HealthCheckRating,
  SickLeave,
  Discharge,
  NewBaseEntry,
  EntryType,
  Diagnoses,
} from "./types";
import { assertNever } from "assert-never";

const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};
const parseName = (name: any): string => {
  // eslint-disable-next-line no-empty
  if (!name || !isString(name)) {
  }

  return name;
};
const parseDateOfBirth = (dateOfBirth: any): string => {
  if (!dateOfBirth || !isString(dateOfBirth)) {
    throw new Error("Incorrect or missing : " + dateOfBirth);
  }

  return dateOfBirth;
};

const parseOcuppation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing : " + occupation);
  }

  return occupation;
};

const parsessn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing : " + ssn);
  }

  return ssn;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing : " + gender);
  }
  return gender;
};
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown, _text: string): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const parseString = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error("Incorrect or missing date: " + text);
  }
  return text;
};

const parseEntryType = (entryType: any): EntryType => {
  if (!Object.values(EntryType).includes(entryType)) {
    throw new Error(`Incorrect or missing type: ${entryType || ""}`);
  }

  return entryType;
};

const parseDiagnosesCodes = (diagnosisCodes: any): Array<Diagnoses["code"]> => {
  if (!Array.isArray(diagnosisCodes)) {
    throw new Error("Incorrect or missing diagnoses");
  }

  return diagnosisCodes;
};
/* eslint-disable @typescript-eslint/no-explicit-any */
export const toNewPatientEntry = (object: any): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    gender: parseGender(object.gender),
    occupation: parseOcuppation(object.occupation),
    ssn: parsessn(object.ssn),
    entries: object.entries,
  };

  return newEntry;
};

const toNewBaseEntry = (object: any): NewBaseEntry => {
  const newBaseEntry: NewBaseEntry = {
    type: parseEntryType(object.type),
    description: parseString(object.description),
    date: parseDate(object.date, "date"),
    specialist: parseString(object.specialist),
  };

  if (object.diagnosisCodes) {
    newBaseEntry.diagnosisCodes = parseDiagnosesCodes(object.diagnosisCodes);
  }

  return newBaseEntry;
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
  if (
    healthCheckRating === null ||
    healthCheckRating === undefined ||
    !isHealthCheckRating(healthCheckRating)
  ) {
    throw new Error(
      `Incorrect health check rating: ${healthCheckRating || ""}`
    );
  }
  return healthCheckRating;
};

const parseSickLeave = (object: any): SickLeave => {
  if (!object) throw new Error("missing sick leave");

  return {
    startDate: parseDate(object.startDate, "start date"),
    endDate: parseDate(object.endDate, "end date"),
  };
};

const parseDischarge = (object: any): Discharge => {
  if (!object) throw new Error("missing discharge");

  return {
    date: parseDate(object.date, "discharge date"),
    criteria: parseString(object.criteria),
  };
};

export const toNewEntry = (object: any): NewBaseEntry => {
  const newBaseEntry = toNewBaseEntry(object) as EntryWithoutId;

  switch (newBaseEntry.type) {
    case EntryType.HealthCheckEntry:
      const newEntryHcE = {
        ...newBaseEntry,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };
      return newEntryHcE;
    case EntryType.OccupationalHealthcareEntry:
      const newEntry = {
        ...newBaseEntry,
        employerName: parseString(object.employerName),
      };

      if (object.sickLeave) {
        newEntry.sickLeave = parseSickLeave(object.sickLeave);
      }

      return newEntry;
    case EntryType.HospitalEntry:
      const newEntryH = {
        ...newBaseEntry,
        discharge: parseDischarge(object.discharge),
      };
      return newEntryH;
    default:
      return assertNever(newBaseEntry);
  }
};
