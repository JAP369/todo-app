import firebase from 'firebase';

// input firebase key config to connect to the backend
const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyAzoQfJHPgpU5WvSNAJWrB_5zW2_jAJwCQ',
  authDomain: 'todo-app-f4bb1.firebaseapp.com',
  databaseURL: 'https://todo-app-f4bb1.firebaseio.com',
  projectId: 'todo-app-f4bb1',
  storageBucket: 'todo-app-f4bb1.appspot.com',
  messagingSenderId: '860503078085',
  appId: '1:860503078085:web:e051ba56d3de517613acac',
  measurementId: 'G-2GHBKGG6E4',
});

// create variable 'db' and connect to 'firestore' database
const db = firebaseApp.firestore();

// export 'db' to be accesed within App
// export { db };
export default db;
