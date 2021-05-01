import React, { useCallback, useEffect } from "react";
import axios from "axios";
import { Container, Header, Item } from "semantic-ui-react";
import { Diagnoses, Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatient, setDiagnosList } from "../state";
import { useParams } from "react-router-dom";
import { List } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import EntryDetails from "./Entry";

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
    } catch (e) {
      console.error(e);
    }
  }, [dispatch, setPatient]);

  useEffect(() => {
    if (patientId !== undefined) {
      fetchPatient();
    }
    return;
  }, [fetchPatient]);

  React.useEffect(() => {
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

    fetchDiagnosestList();
  }, [dispatch]);

  if (!patient) {
    return null;
  }

  if (!diagnoses) {
    return null;
  }

  return (
    <div className="App">
      <Container textAlign="center">
        <Header as="h3">
          Patient Information{" "}
          {patient?.patient?.gender === "male" ? (
            <Icon name="mars" />
          ) : (
            <Icon name="venus" />
          )}
        </Header>
        <List>
          <List.Item></List.Item>
          <List.Item>{patient?.patient?.dateOfBirth}</List.Item>
          <List.Item>{patient?.patient?.ssn}</List.Item>
          <List.Item>{patient?.patient?.occupation}</List.Item>
        </List>
        <Item.Content>
          <Item.Header as="a">Entries</Item.Header>

          {patient?.patient?.entries?.map((entry) => (
            <div key={entry.id}>
              <Item.Description>
                <EntryDetails entry={entry} />
              </Item.Description>
              <List bulleted>
                {Object.values(diagnoses).map((diagnoses: Diagnoses) => (
                  <>
                    {entry.diagnosisCodes?.includes(diagnoses.code) ? (
                      <List.Item key={diagnoses.code}>
                        {diagnoses.code} {diagnoses.name}
                      </List.Item>
                    ) : (
                      ""
                    )}
                  </>
                ))}
              </List>
            </div>
          ))}
        </Item.Content>
      </Container>
    </div>
  );
};

export default PatientInfo;
