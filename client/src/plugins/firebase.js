import firebase from "firebase/app"
import 'firebase/auth';

const configOptions = {
    apiKey: process.env.VUE_APP_APIKEY,
    authDomain: process.env.VUE_APP_AUTHDOMAIN,
    databaseURL: process.env.VUE_APP_PROJECTID,
    projectId: process.env.VUE_APP_STORAGEBUCKET,
    storageBucket: process.env.VUE_APP_MESSAGINGSENDERID,
    messagingSenderId: process.env.VUE_APP_APPID,
    appId: process.env.VUE_APP_MEASUREMENTID,
};

firebase.initializeApp(configOptions);

const auth = firebase.auth();

export {
    auth,
}