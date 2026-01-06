import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

let app;

const getPrivateKey = () => {
  let key = process.env.FIREBASE_ADMIN_PRIVATE_KEY;
  if (!key) return null;

  // Replace escaped newlines with actual ones if they exist
  key = key.replace(/\\n/g, '\n');

  // Regex to extract base64 body from PEM format
  const pemMatch = /-----BEGIN PRIVATE KEY-----([\s\S]+?)-----END PRIVATE KEY-----/.exec(key);
  
  if (pemMatch) {
    // If it's a valid PEM, clean the body and re-wrap it
    // This removes any extra characters or whitespace outside or inside the body
    const body = pemMatch[1].replace(/\s/g, '');
    return `-----BEGIN PRIVATE KEY-----\n${body}\n-----END PRIVATE KEY-----\n`;
  }

  // If it's not PEM but looks like base64, wrap it
  if (!key.includes('-----') && (key.length > 500)) {
     const body = key.replace(/\s/g, '');
     return `-----BEGIN PRIVATE KEY-----\n${body}\n-----END PRIVATE KEY-----\n`;
  }

  return key;
};

export const getFirebaseAdminApp = () => {
  if (app) {
    return app;
  }

  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = getPrivateKey();
  const projectId = process.env.FIREBASE_PROJECT_ID;

  if (!clientEmail || !privateKey || !projectId) {
    const missing = [];
    if (!clientEmail) missing.push('FIREBASE_ADMIN_CLIENT_EMAIL');
    if (!privateKey) missing.push('FIREBASE_ADMIN_PRIVATE_KEY');
    if (!projectId) missing.push('FIREBASE_PROJECT_ID');
    
    console.error('❌ Missing Firebase Admin credentials:', missing.join(', '));
    throw new Error(
      `Missing Firebase Admin credentials. Please set ${missing.join(', ')}.`
    );
  }

  try {
    app = admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey
      })
    });
    console.log('✅ Firebase Admin initialized successfully');
    return app;
  } catch (error) {
    console.error('❌ Failed to initialize Firebase Admin:', error.message);
    throw error;
  }
};

export const adminAuth = () => getFirebaseAdminApp().auth();
