// Import the functions you need from the SDKs you need
import { initializeApp ,getApp,getApps} from "firebase/app";
import  {getAuth} from "firebase/auth"
import    {getFirestore} from "firebase/firestore"
import  {getStorage} from "firebase/storage"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDD5-PjH_fxLxbNzAq7MnBnFGASA5ZEMH4",
  authDomain: "reddit-clone-firebase-8d619.firebaseapp.com",
  projectId: "reddit-clone-firebase-8d619",
  storageBucket: "reddit-clone-firebase-8d619.appspot.com",
  messagingSenderId: "178290501147",
  appId: "1:178290501147:web:6ac3073e70d678a921fabe"
};

// Initialize Firebase for Server Side Rendering
const app = !getApps().length?initializeApp(firebaseConfig):getApp();
const  firestore=getFirestore(app);
const auth=getAuth(app);
const storage=getStorage(app);

export  {app,firestore,auth,storage}; 
