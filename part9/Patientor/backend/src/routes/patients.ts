import express from 'express';
import patientsService from '../services/patientsService';

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

router.post('/', (_req, res) => {
    res.send('Saving a patient!');
});

export default router;