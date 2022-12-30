import admin from "firebase-admin"; 

import serviceAccount from '../service-account.js';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export const db = admin.firestore(); 
export const guildsCollection = db.collection("guilds");
export async function init_db(){}
export async function transfer(){}

export function momentToTimestamp(momentObj)
{
  return admin.firestore.Timestamp.fromDate(momentObj.toDate());
}