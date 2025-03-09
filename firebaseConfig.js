// firebaseConfig.js
import { initializeApp } from 'firebase/app';

let app;
if (typeof window !== 'undefined') {
  const firebaseConfig = {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'your-project-id.firebaseapp.com',
    projectId: 'your-project-id',
    storageBucket: 'your-project-id.appspot.com',
    messagingSenderId: 'YOUR_SENDER_ID',
    appId: 'YOUR_APP_ID',
  };
  app = initializeApp(firebaseConfig);
}

export default app;
