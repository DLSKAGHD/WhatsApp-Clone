import firebase from "firebase";

// firebase protect the config
// this is a public information so don't have to worry abt ...
const firebaseConfig = {
    apiKey: "AIzaSyCXcMS4q_q8Kh0Ax2jkrz09Jo5hwjQHTy0",
    authDomain: "whatsapp-clone-bcae6.firebaseapp.com",
    projectId: "whatsapp-clone-bcae6",
    storageBucket: "whatsapp-clone-bcae6.appspot.com",
    messagingSenderId: "349306382915",
    appId: "1:349306382915:web:cb1f80632d3eceffac42f6",
    measurementId: "G-MFR9S18RVN"
};

// initialize the app
const firebaseApp = firebase.initializeApp(firebaseConfig);
// Createa DB instance of firestore <== firebaseApp is stored in firestore
const db = firebaseApp.firestore();
// authentication function by firebase
const auth = firebase.auth();
// to get Google authentication
const provider = new firebase.auth.GoogleAuthProvider();
// export
// export default ===> if we use that elements more often, we'd better use export default
export { auth, provider };
export default db;