import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import secrets from "./secrets.js";

export default function dbConnect() {
  if (!getApps().length) {
    initializeApp({
      ceredential: cert(secrets)
    })
  }

  return getFirestore();
}