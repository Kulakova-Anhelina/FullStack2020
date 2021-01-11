import diagnosies from '../../data/diagnosies';

import {Diagnoses} from '../types';

const getEntries = (): Array<Diagnoses> => {
  return diagnosies;
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry
};