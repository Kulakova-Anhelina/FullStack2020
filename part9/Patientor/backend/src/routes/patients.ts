import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatientEntry from '../utils';


const router = express.Router();
router.get('/:id', (req, res) => {
  const patient = patientsService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientsService.addData(newPatientEntry);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }
});
export default router;


