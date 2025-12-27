import { adminAuth } from '../src/config/firebaseAdmin.config.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load env vars
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env') });

const setAdminRole = async (email) => {
  if (!email) {
    console.error('Please provide an email address.');
    process.exit(1);
  }

  try {
    const user = await adminAuth().getUserByEmail(email);
    
    await adminAuth().setCustomUserClaims(user.uid, {
      role: 'admin'
    });

    console.log(`Successfully made ${email} an admin!`);
    console.log('User must sign out and sign in again for changes to take effect.');
    process.exit(0);
  } catch (error) {
    console.error('Error setting admin role:', error.message);
    process.exit(1);
  }
};

const email = process.argv[2];
setAdminRole(email);
