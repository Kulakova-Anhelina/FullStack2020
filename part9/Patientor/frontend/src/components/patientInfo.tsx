import React, { useCallback, useEffect } from "react";
import axios from "axios";
import { Container, Header, Item } from "semantic-ui-react";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatient } from "../state";
import { useParams } from "react-router-dom";
import { List } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";

const PatientInfo: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
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
  const [{ patient }] = useStateValue();

  if (!patient) {
    return null;
  }

  //const entries: any = new Map<string, Patient>();

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

          {patient?.patient?.entries.map((entry) => (
            <div key={entry.id}>
              <Item.Description>
                <p>
                  {entry?.date} {entry?.description}
                </p>
              </Item.Description>
              <List bulleted>
                {entry?.diagnosisCodes?.map((c) => (
                  <List.Item>{c}</List.Item>
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
