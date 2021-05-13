import express from 'express';
import patientsService from '../services/patientsService';
import { toNewEntry, toNewPatientEntry } from '../utils';


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


router.post("/:id/entry", (req, res) => {
  const patient = patientsService.findById(req.params.id);
  if (patient) {
    try {
      const newEntry = toNewEntry(req.body);
      const updatedPatient = patientsService.addEntry(patient, newEntry);
      res.json(updatedPatient);
      res.status(201).send(patient);


    } catch (e) {
      res.status(400).send(e.message);
    }
  }

});


router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientsService.addData(newPatientEntry);
    res.json(addedEntry);
    console.log(addedEntry, "added entry");

  } catch (e) {
    res.status(400).send(e.message);
  }
});




export default router;


