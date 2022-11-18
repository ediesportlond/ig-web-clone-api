import dbConnect from './dbConnect.js';
import {FieldValue} from 'firebase-admin/firestore'

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

export async function addLikes(req, res) {
  //get postId and userId from params
  const { userId, postId } = req.params
  //get this post by postId
  const db = dbConnect();

  const result = await db.collection("photos").doc(postId).get()
    .catch(err => {
      res.status(500).send({ success: false, message: err });
      return;
    })

  const photo = result.data()

  //see if userId exists in like object
  if (photo.likes[userId]) {
    
    //if it does remove it
    delete photo.likes[userId]
    let _likeCount = photo.likeCount
    delete photo.likeCount

    //then minus from count
    await db.collection("photos").doc(postId).update(photo)
      .catch(err => {
        res.status(500).send({ success: false, message: err });
        return;
      })

    await db.collection("photos").doc(postId).update({
      likeCount: FieldValue.increment(-1)
    })
      .catch(err => {
        res.status(500).send({ success: false, message: err });
        return;
      })


      res.send({isLiked:false, likes: _likeCount -1})
      return
  } else {
    //if it doesn't add it
    photo.likes[userId] = true
    delete photo.likeCount
    //then add to coount
    await db.collection("photos").doc(postId).update({
      likeCount: FieldValue.increment(1)
    })
      .catch(err => {
        res.status(500).send({ success: false, message: err });
        return;
      })

    await db.collection("photos").doc(postId).update(photo)
      .catch(err => {
        res.status(500).send({ success: false, message: err });
        return;
      })

      res.send({isLiked:true, likes: _likeCount +1})
      return
  }
}

export async function getLikes(req, res) {
  //get postId and userId from params
  const { userId, postId } = req.params

  //get this post by postId
  const db = dbConnect();

  const result = await db.collection("photos").doc(postId).get()
    .catch(err => {
      res.status(500).send({ success: false, message: err });
      return;
    })

  const photo = result.data()
  //see if userId exists in like object
  if (photo.likes[userId]) {
    res.send({isLiked: true, likes: photo.likeCount})
  } else {
    res.send({isLiked: false, likes: photo.likeCount})
  }
  //return {isLiked: boolean, likes: num}
}