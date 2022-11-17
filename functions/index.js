import functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';

import { getAllPhotos, addNewPhoto, addLikes, getLikes } from './src/photos.js';
const app = express();
//any time you do anything other than get
app.use(express.json());
app.use(cors());

//get will return if user has liked it.
app.get('/likes/:postId/:userId', getLikes);
//post will add their like if not in it. and increase like counter
app.post('/likes/:postId/:userId', addLikes);

app.get('/photos', getAllPhotos);
app.post('/photos', addNewPhoto);

export const api = functions.https.onRequest(app);
