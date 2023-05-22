import { initializeApp } from "firebase/app";

import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAZk6kxohbKXZn30qRE9k9LvffYQGPnrF8",
  authDomain: "crud-react-83f13.firebaseapp.com",
  projectId: "crud-react-83f13",
  storageBucket: "crud-react-83f13.appspot.com",
  messagingSenderId: "1026438222827",
  appId: "1:1026438222827:web:9ef5257bd2be37aef27fae",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
