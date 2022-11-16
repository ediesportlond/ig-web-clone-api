import dbConnect from './dbConnect.js';

export async function getAllPhotos(req, res) {
  const db = dbConnect();

  const collection = await db.collection("photos").get()
    .catch(err => {
      res.status(500).send({ success: false, message: err });
      return;
    })

  const photos = collection.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

  res.send({ success: true, message: photos });
}

export async function addNewPhoto(req, res) {
  const db = dbConnect();

  await db.collection("photos").add(req.body)
    .catch(err => {
      res.status(500).send({ success: false, message: err });
      return;
    })

    getAllPhotos(req, res);
}