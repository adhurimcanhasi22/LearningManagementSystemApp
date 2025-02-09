import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import FirebaseApp from "@react-native-firebase/app";
import { firebase } from "@react-native-firebase/messaging";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBi22uQPzX7MDhpIRrra3aE_SnXhiS32bI",
  authDomain: "lms-app-32389.firebaseapp.com",
  databaseURL:
    "https://lms-app-32389-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "lms-app-32389",
  storageBucket: "lms-app-32389.firebasestorage.app",
  messagingSenderId: "529692450659",
  appId: "1:529692450659:web:3e798143cfa27439f5fd56",
  measurementId: "G-EHR7LXZFVK",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
const messaging = getMessaging(app);
export { getToken, onMessage, messaging };
