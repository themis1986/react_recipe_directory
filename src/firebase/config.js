import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZC6pHr7wcdJ4GealeE6lD9bbTLjE7bcg",
  authDomain: "react-cooking-ninja-a8e47.firebaseapp.com",
  projectId: "react-cooking-ninja-a8e47",
  storageBucket: "react-cooking-ninja-a8e47.appspot.com",
  messagingSenderId: "925222547617",
  appId: "1:925222547617:web:c4b17d2ad616769f6000e0",
};

// *init firebase
firebase.initializeApp(firebaseConfig);

// *init services
const projectFirestore = firebase.firestore();

export { projectFirestore };
