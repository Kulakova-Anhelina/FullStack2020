import { State } from "./state";
import { Patient, Diagnoses } from '../types';

export type Action =
  | {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
  }
  | {
    type: "ADD_PATIENT";
    payload: Patient;
  } | {
    type: "SET_PATIENT";
    payload: Patient;
  } |
  {
    type: "SET_DIAGNOSIES";
    payload: Diagnoses[];
  } |
  {
    type: "UPDATE_DATA",
    payload: Patient;
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT":
      return {

        ...state,
        patient: {
          patient: action.payload
        }

      };

    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };

    case "UPDATE_DATA":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: {
            ...state.patients[action.payload.id],
            ...action.payload,
          },
        },
      };
    default:
      return state;
  }
};


export const updatePatient = (patient: Patient): Action => {
  return { type: "UPDATE_DATA", payload: patient };
};

export const setPatientList = (patientListFromApi: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientListFromApi
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient
  };
};

export const setPatient = (patient: Patient): Action => {
  return {
    type: "SET_PATIENT",
    payload: patient
  };
};

export const setDiagnosList = (diagnosesListFromApi: Diagnoses[]): Action => {
  return {
    type: "SET_DIAGNOSIES",
    payload: diagnosesListFromApi
  };
};