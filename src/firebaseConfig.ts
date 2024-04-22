// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

console.log(import.meta.env.VITE_FB_apiKey);
console.log(import.meta.env.VITE_FB_authDomain);
console.log(import.meta.env.VITE_FB_projectId);
console.log(import.meta.env.VITE_FB_storageBucket);
console.log(import.meta.env.VITE_FB_messagingSenderId);
console.log(import.meta.env.VITE_FB_appId);

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FB_apiKey,
  authDomain: import.meta.env.VITE_FB_authDomain,
  projectId: import.meta.env.VITE_FB_projectId,
  storageBucket: import.meta.env.VITE_FB_storageBucket,
  messagingSenderId: import.meta.env.VITE_FB_messagingSenderId,
  appId: import.meta.env.VITE_FB_appId,
};

// Initialize Firebase
export const fb = initializeApp(firebaseConfig);
console.log(fb);
