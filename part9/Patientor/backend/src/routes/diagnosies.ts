import express from 'express';
import diagnosiesService from '../services/diagnosiesSevice';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnosiesService.getEntries());
});

router.post('/', (_req, res) => {
  res.send('Saving a diary!');
});

export default router;