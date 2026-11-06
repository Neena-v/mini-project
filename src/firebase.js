// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuIcCC4KjNvtY0i4E5Py2zHon7WI6JLEM",
  authDomain: "ai-recipe-app-3b555.firebaseapp.com",
  projectId: "ai-recipe-app-3b555",
  storageBucket: "ai-recipe-app-3b555.firebasestorage.app",
  messagingSenderId: "919179280757",
  appId: "1:919179280757:web:ff2b29137074c31175133c",
  measurementId: "G-8QG49S93D1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const auth = getAuth(app);