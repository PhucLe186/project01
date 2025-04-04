import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyDl-ULarX23i3Hr7WqU9k5PKNtOLCy1RUs',
    authDomain: 'restaurant-98d2f.firebaseapp.com',
    projectId: 'restaurant-98d2f',
    storageBucket: 'restaurant-98d2f.firebasestorage.app',
    messagingSenderId: '1017086644103',
    appId: '1:1017086644103:web:45a9ec359038a54a298d22',
    measurementId: 'G-XFX8NFBY42',
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const auth = getAuth(app);
export { auth, database };
