import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCDlcwmQFVBPtbCUpb7Tc8mD-GIXmFPG18",
  authDomain: "usermanager-c1b3c.firebaseapp.com",
  projectId: "usermanager-c1b3c",
  storageBucket: "usermanager-c1b3c.appspot.com",
  messagingSenderId: "11897974626",
  appId: "1:11897974626:web:9551db43b2afee5ffac63b",
  measurementId: "G-Z9S8TQ5FNJ",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
