import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, deleteDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,
  onAuthStateChanged, updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAbFXdi5hMoUtV_cv2hLXfkG6xsCEXaRUM",
  authDomain: "heavenly-tiers.firebaseapp.com",
  projectId: "heavenly-tiers",
  storageBucket: "heavenly-tiers.firebasestorage.app",
  messagingSenderId: "216369632860",
  appId: "1:216369632860:web:7112c222d6986cc06f3899",

};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

window.cloudStore = {};
window.dbReady = false;

window.loadCloudData = async function(keys){
  for(const key of keys){
    try{
      const snap = await getDoc(doc(db, "heavenly_tiers_data", key));
      if(snap.exists()){
        window.cloudStore[key] = snap.data().value;
      }
    }catch(err){
      console.error("Cloud load failed for", key, err);
    }
  }
  window.dbReady = true;
  window.dispatchEvent(new Event("cloud-ready"));
};

window.getCloudValue = function(key, fallback){
  if(window.cloudStore[key] !== undefined){
    return window.cloudStore[key];
  }
  try{
    const local = localStorage.getItem(key);
    if(local){
      const parsed = JSON.parse(local);
      window.cloudStore[key] = parsed;
      return parsed;
    }
  }catch(e){}
  return fallback;
};

window.setCloudValue = async function(key, value){
  window.cloudStore[key] = value;
  try{
    localStorage.setItem(key, JSON.stringify(value));
  }catch(e){}
  try{
    await setDoc(doc(db, "heavenly_tiers_data", key), {
      value,
      updatedAt: new Date().toISOString()
    });
  }catch(err){
    console.error("Cloud save failed for", key, err);
  }
};

window.loadCloudData([
  "hm","hmi","hp","ht","hs","hal","ht_wt"
  // NOTE: "hu" (the old fake-auth user list) is intentionally no longer loaded —
  // real accounts now live in Firebase Authentication + the "roles" Firestore collection.
]);

// ============================================================
//  REAL FIREBASE AUTHENTICATION
//  Roles/usernames/PINs live in Firestore collection "roles",
//  one document per user, keyed by their Firebase Auth UID.
// ============================================================

window.fbAuth = auth;

window.fbSignUp = async function(email, password){
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  return cred.user;
};

window.fbSignIn = async function(email, password){
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
};

window.fbSignOut = function(){
  return signOut(auth);
};

// Fires immediately with the current user (or null), then on every future change.
window.fbOnAuthChange = function(callback){
  return onAuthStateChanged(auth, callback);
};

window.getRoleDoc = async function(uid){
  const snap = await getDoc(doc(db, "roles", uid));
  return snap.exists() ? snap.data() : null;
};

window.setRoleDoc = async function(uid, data){
  await setDoc(doc(db, "roles", uid), data, { merge: true });
};

window.deleteRoleDoc = async function(uid){
  await deleteDoc(doc(db, "roles", uid));
};

// Returns [{uid, ...roleData}, ...] for every user — used by the admin user-management panel.
// Firestore security rules should restrict this collection's read to Owner/Admin only.
window.getAllRoles = async function(){
  const snap = await getDocs(collection(db, "roles"));
  const out = [];
  snap.forEach(d => out.push({ uid: d.id, ...d.data() }));
  return out;
};

// Changing your own email/password requires re-entering your current password first
// (Firebase's security model — "reauthentication").
window.fbUpdateCredentials = async function(currentPassword, newEmail, newPassword){
  const user = auth.currentUser;
  if(!user) throw new Error("Not signed in");
  const cred = EmailAuthProvider.credential(user.email, currentPassword);
  await reauthenticateWithCredential(user, cred);
  if(newEmail && newEmail !== user.email) await updateEmail(user, newEmail);
  if(newPassword) await updatePassword(user, newPassword);
};
