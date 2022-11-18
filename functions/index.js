import functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';

import { getAllPhotos, addNewPhoto, addLikes, getLikes } from './src/photos.js';
const app = express();
//any time you do anything other than get
app.use(express.json());
app.use(cors());

app.get('/likes/:postId/:userId', getLikes);
app.post('/likes/:postId/:userId', addLikes);

app.get('/photos', getAllPhotos);
app.post('/photos', addNewPhoto);

export const api = functions.https.onRequest(app);
