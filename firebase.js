
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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
  "hm","hmi","hp","hu","ht","hs","hal","ht_wt"
]);
