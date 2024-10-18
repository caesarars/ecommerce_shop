// firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "",
  authDomain: "image-storing-project.firebaseapp.com",
  databaseURL: "https://image-storing-project-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "image-storing-project",
  storageBucket: "image-storing-project.appspot.com",
  messagingSenderId: "765930790780",
  appId: "1:765930790780:web:feffc91e96d871755f4ef9",
  measurementId: "G-7FFTVBYHX1"
};

// Initialize Firebase

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

// Initialize Firebase Storage
const storage = getStorage(app);

export { storage, analytics };
