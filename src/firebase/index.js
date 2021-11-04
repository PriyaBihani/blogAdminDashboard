import { initializeApp } from 'firebase/app';

// const firebaseConfig = {
// 	apiKey: process.env.REACT_APP_apiKey,
// 	authDomain: process.env.REACT_APP_authDomain,
// 	projectId: process.env.REACT_APP_projectId,
// 	storageBucket: process.env.REACT_APP_storageBucket,
// 	messagingSenderId: process.env.REACT_APP_messagingSenderId,
// 	appId: process.env.REACT_APP_appId,
// 	measurementId: process.env.REACT_APP_measurementId,
// };

const firebaseConfig = {
	apiKey: "AIzaSyA5daXxoutJFQpjZy_yUA6J2giuaDeYozI",
	authDomain: "codersgalablog.firebaseapp.com",
	projectId: "codersgalablog",
	storageBucket: "codersgalablog.appspot.com",
	messagingSenderId: "781176106953",
	appId: "1:781176106953:web:6e4d4e2775964d62da4218",
	measurementId: "G-CDSMDRFVW8"
};

const app = initializeApp(firebaseConfig);

export default app;
