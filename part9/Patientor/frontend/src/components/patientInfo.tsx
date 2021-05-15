import React, { useCallback, useEffect } from "react";
import axios from "axios";
import { Button, Container, Header, Item } from "semantic-ui-react";
import { Diagnoses, Patient } from "../types";
import { apiBaseUrl } from "../constants";
import {
  useStateValue,
  setPatient,
  setDiagnosList,
  updatePatient,
} from "../state";
import { useParams } from "react-router-dom";
import { List } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import EntryDetails from "./Entry";
import { BaseFormValues } from "../AddNewEntryField/addNewEntryForm";
import AddEntryModal from "../AddNewEntryField";
import AddEntryModaHospital from "../addNewEntryHospital";
import AddEntryModaHealthCare from "../AddNewOccupationalHealthcare";

const PatientInfo: React.FC = () => {
  const [{ patients, patient, diagnoses }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patientId = Object.values(patients).find((p) => p.id === id);

  const fetchPatient = useCallback(async () => {
    try {
      const { data: patientInfo } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${patientId?.id}`
      );

      dispatch(setPatient(patientInfo));
      console.log();
    } catch (e) {
      console.error(e);
    }
  }, [dispatch, setPatient]);

  useEffect(() => {
    fetchPatient();
  }, [dispatch, patientId?.id, patients]);

  const fetchDiagnosestList = async () => {
    try {
      const { data: diagnosesListFromApi } = await axios.get<Diagnoses[]>(
        `${apiBaseUrl}/diagnoses`
      );
      dispatch(setDiagnosList(diagnosesListFromApi));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchDiagnosestList();
  }, [dispatch]);

  const [modalOpensecond, setModalOpensecond] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModalsecond = (): void => setModalOpensecond(true);
  const closeModalsecond = (): void => {
    setModalOpensecond(false);
    setError(undefined);
  };

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const [modalOpenfirst, setModalOpenfirst] = React.useState<boolean>(false);
  const openModalfirst = (): void => setModalOpenfirst(true);
  const closeModalfirst = (): void => {
    setModalOpenfirst(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: BaseFormValues) => {
    try {
      const { data: newPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${patientId?.id}/entry`,
        values
      );

      dispatch(updatePatient(newPatient));
      closeModalsecond();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  if (!patient) {
    return null;
  }

  if (!diagnoses) {
    return null;
  }
  console.log(patient);

  return (
    <div className="App">
      <Container textAlign="center">
        {Object.values(patient).map((patient: Patient) => (
          <div key={patient.id}>
            <Header as="h3">
              Patient Information{" "}
              {patient?.gender === "male" ? (
                <Icon name="mars" />
              ) : (
                <Icon name="venus" />
              )}
            </Header>
            <Button.Group>
              <AddEntryModal
                modalOpen={modalOpensecond}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModalsecond}
              />
              <Button onClick={() => openModalsecond()} color="orange">
                <Icon name="history" />
                Health Check
              </Button>
              <Button.Or />
              <AddEntryModaHospital
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
              />
              <Button onClick={() => openModal()} color="olive">
                <Icon name="add to calendar" />
                Hospital
              </Button>
              <Button.Or />
              <AddEntryModaHealthCare
                modalOpen={modalOpenfirst}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModalfirst}
              />
              <Button onClick={() => openModalfirst()} color="teal">
                <Icon name="heartbeat" />
                Health Care
              </Button>
            </Button.Group>
            <List>
              <List.Item></List.Item>
              <List.Item>{patient?.dateOfBirth}</List.Item>
              <List.Item>{patient?.ssn}</List.Item>
              <List.Item>{patient?.occupation}</List.Item>
            </List>
            <Item.Content>
              <Item.Header as="a">Entries</Item.Header>

              {Object.values(patient?.entries).map((entry) => {
                console.log(patient?.entries);

                return (
                  <div key={entry.id}>
                    <Item.Description>
                      <EntryDetails entry={entry} />
                    </Item.Description>
                    <List bulleted>
                      {Object.values(diagnoses).map((diagnoses: Diagnoses) => (
                        <div key={diagnoses.code}>
                          {entry.diagnosisCodes?.includes(diagnoses.code) ? (
                            <List.Item key={diagnoses.code}>
                              {diagnoses.code} {diagnoses.name}
                            </List.Item>
                          ) : (
                            ""
                          )}
                        </div>
                      ))}
                    </List>
                  </div>
                );
              })}
            </Item.Content>
          </div>
        ))}
      </Container>
    </div>
  );
};

export default PatientInfo;
