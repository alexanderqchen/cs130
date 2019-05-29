import app from "firebase/app";
import "firebase";
import "firebase/auth";
import React from "react";

const firebaseConfig = {
  apiKey: "AIzaSyC85BZWyPRFFKwQy0vAfVU6T03r3XqLe1k",
  authDomain: "juvenilejustice-d5aea.firebaseapp.com",
  databaseURL: "https://juvenilejustice-d5aea.firebaseio.com",
  projectId: "juvenilejustice-d5aea",
  storageBucket: "juvenilejustice-d5aea.appspot.com",
  messagingSenderId: "534972309583",
  appId: "1:534972309583:web:781893fc117a5095"
};

/*
Generates a random password of 32 alphanumeric chars.
Used as the user's default password, which will never be given
to the user. The user will need to follow firebase's "Reset password"
workflow to create a real password
 */
function getRandomPassword() {
  return Math.random()
    .toString(36)
    .slice(-16);
}

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.db = app.database(app);

    // Database references
    this.user = email => this.db.ref(`users/${email}`);
    this.users = () => this.db.ref("users/");

    this.glossary = () => this.db.ref("glossary/");
    this.glossaryByUid = uid => this.db.ref(`glossary/${uid}`);
  }

  setPersistenceLevel = level => {
    return this.auth.setPersistence(level);
  };

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  // Create user with specified email, and a random 32-length alphanumeric password
  doCreateNewUser = email =>
    this.auth.createUserWithEmailAndPassword(email, getRandomPassword());

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
}

const FirebaseContext = React.createContext(null);
const withFirebase = Component => props => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);

export default Firebase;
export { FirebaseContext, withFirebase };
