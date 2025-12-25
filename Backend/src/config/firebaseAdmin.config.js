import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

let app;

const getPrivateKey = () => {
  const key = process.env.FIREBASE_ADMIN_PRIVATE_KEY;
  if (!key) {
    return null;
  }
  return key.replace(/\\n/g, '\n');
};

export const getFirebaseAdminApp = () => {
  if (app) {
    return app;
  }

  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = getPrivateKey();
  const projectId = process.env.FIREBASE_PROJECT_ID;

  if (!clientEmail || !privateKey || !projectId) {
    throw new Error(
      'Missing Firebase Admin credentials. Please set FIREBASE_PROJECT_ID, FIREBASE_ADMIN_CLIENT_EMAIL, and FIREBASE_ADMIN_PRIVATE_KEY.'
    );
  }

  app = admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey
    })
  });

  return app;
};

export const adminAuth = () => getFirebaseAdminApp().auth();
