import { initializeApp } from "firebase/app";
import "./app.css";
import App from "./App.svelte";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_KEY,
  authDomain: "dev-jeans.firebaseapp.com",
  projectId: "dev-jeans",
  storageBucket: "dev-jeans.appspot.com",
  messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_APP_ID,
  measurementId: import.meta.env.VITE_APP_MEASUREMENT_ID,
};

const firebase = initializeApp(firebaseConfig);

const app = new App({
  target: document.getElementById("app"),
});

export default app;
