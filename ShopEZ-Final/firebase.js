
import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
  apiKey: "AIzaSyCSevJrCrCQsayhjFOJSSwMBqvsWJJ4Anw",
  authDomain: "shopez-3c15f.firebaseapp.com",
  projectId: "shopez-3c15f",
  storageBucket: "shopez-3c15f.firebasestorage.app",
  messagingSenderId: "578654849485",
  appId: "1:578654849485:web:40bf8ecca0ad1e2fe7dc84",
  measurementId: "G-N6KQ59ZKCM"
};

const app = initializeApp(firebaseConfig);


const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});


const database = getDatabase(app);

export { auth, database };
export default app;