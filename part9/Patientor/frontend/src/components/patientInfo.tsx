import React from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { useParams } from "react-router-dom";
import { List } from 'semantic-ui-react';
import { Icon } from 'semantic-ui-react';




// eslint-disable-next-line no-redeclare
const PatientInfo: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patientId = Object.values(patients).find((p) => p.id === id);
  //const [patient, setPatient] = useState<Patient>();

  React.useEffect(() => {

    const fetchPatient = async () => {
      try {
        const { data: patientInfo } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${patientId?.id}`
        );
        dispatch({ type: "SET_PATIENT", payload: patientInfo });
        console.log(patientInfo);

        //setPatient(patientInfo);

      } catch (e) {
        console.error(e);
      }
    };

    if (patientId !== undefined) {
      fetchPatient();
    }

  }, [dispatch]);
  const [{ patient }] = useStateValue();

  if (!patient) {
    return null;
  }
  console.log();

  return (

    <div className="App">

      <Container textAlign="center">
        <h3>Patient Information {patient?.patient?.gender === "male" ? <Icon name='mars' /> : <Icon name='venus' />}</h3>
        <List>
          <List.Item></List.Item>
          <List.Item>{patient?.patient?.dateOfBirth}</List.Item>
          <List.Item>{patient?.patient?.ssn}</List.Item>
          <List.Item>{patient?.patient?.occupation}</List.Item>
        </List>
      </Container>





    </div>
  );
};

export default PatientInfo;
