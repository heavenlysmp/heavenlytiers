// Server-side Firebase Admin init. Requires one Vercel environment variable:
//   FIREBASE_SERVICE_ACCOUNT — paste the ENTIRE contents of the service account
//   JSON file you download from Firebase Console → Project Settings →
//   Service Accounts → Generate new private key.
const admin = require('firebase-admin');

let db;

function getDb() {
  if (db) return db;

  if (!admin.apps.length) {
    const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (!raw) {
      throw new Error(
        'Missing FIREBASE_SERVICE_ACCOUNT environment variable. Add it in Vercel → Project → Settings → Environment Variables.'
      );
    }
    let serviceAccount;
    try {
      serviceAccount = JSON.parse(raw);
    } catch (e) {
      throw new Error('FIREBASE_SERVICE_ACCOUNT is not valid JSON — paste the full service account file contents exactly.');
    }
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  db = admin.firestore();
  return db;
}

// Reads one document's "value" field from the same collection the site itself
// uses (see firebase.js: collection "heavenly_tiers_data", doc id = key).
async function readCloudValue(key, fallback) {
  const snap = await getDb().collection('heavenly_tiers_data').doc(key).get();
  if (!snap.exists) return fallback;
  const data = snap.data();
  return data && data.value !== undefined ? data.value : fallback;
}

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

module.exports = { getDb, readCloudValue, setCors };
