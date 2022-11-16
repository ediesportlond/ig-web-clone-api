import functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';

import { getAllPhotos, addNewPhoto } from './src/photos.js';
const app = express();
//any time you do anything other than get
app.use(express.json());
app.use(cors());

app.get('/photos', getAllPhotos);
app.post('/photos', addNewPhoto);

export const api = functions.https.onRequest(app);
