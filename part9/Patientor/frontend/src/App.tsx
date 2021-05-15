import React, { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import {
  Button,
  Divider,
  Header,
  Container,
  Icon,
  Breadcrumb,
  Segment,
} from "semantic-ui-react";
import { apiBaseUrl } from "./constants";
import { useStateValue, setPatientList } from "./state";
import { Patient } from "./types";
import PatientListPage from "./PatientListPage";
import PatientInfo from "./components/patientInfo";

const App: React.FC = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch(setPatientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    fetchPatientList();
  }, [dispatch]);
  return (
    <div className="App">
      <Router>
        <Container>
          <Segment>
            <Header as="h1" color="violet">
              <Breadcrumb.Section as={Link} to="/">
                <Icon name="home" color="grey" />
              </Breadcrumb.Section>
              Patientor
            </Header>
          </Segment>
          <Divider hidden />
          <Switch>
            <Route path="/patients/:id">
              <Segment>
                <PatientInfo />
              </Segment>
            </Route>
            <Route path="/" render={() => <PatientListPage />} />
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
