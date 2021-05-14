import assertNever from "assert-never";
import React from "react";
import { Container, Divider, Segment } from "semantic-ui-react";
import {
  Entry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
} from "../types";
import { Icon } from "semantic-ui-react";
import { EntryType } from "../types";

const HospitalComponent: React.FC<{ hostitalEntry: HospitalEntry }> = ({
  hostitalEntry,
}) => {
  return (
    <Container>
      <Segment>
        <Icon name="medrt" size="large" />
        <p>{hostitalEntry.date}</p>
        <p>{hostitalEntry.description}</p>
        <Icon name="heart" size="small" color="pink" />
      </Segment>
      <Divider />
    </Container>
  );
};

const OccupationalHealthcare: React.FC<{
  ocuppationalEntry: OccupationalHealthcareEntry;
}> = ({ ocuppationalEntry }) => {
  return (
    <Container>
      <Segment>
        <Icon name="user doctor" size="large" />
        <p>{ocuppationalEntry.date}</p>
        <p>{ocuppationalEntry.description}</p>

        <Icon name="heart" size="small" color="orange" />
      </Segment>
      <Divider />
    </Container>
  );
};

const HealthCheck: React.FC<{
  healthEntry: HealthCheckEntry;
}> = ({ healthEntry }) => {
  return (
    <Container>
      <Segment>
        <Icon name="medkit" size="large" />
        <p>{healthEntry.date}</p>
        <p>{healthEntry.description}</p>
        <Icon name="heartbeat" size="small" color="olive" />
      </Segment>
      <Divider />
    </Container>
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case EntryType.HospitalEntry:
      return <HospitalComponent hostitalEntry={entry} />;
    case EntryType.OccupationalHealthcareEntry:
      return <OccupationalHealthcare ocuppationalEntry={entry} />;
    case EntryType.HealthCheckEntry:
      return <HealthCheck healthEntry={entry} />;
    default:
      return entry;
  }
};

export default EntryDetails;
