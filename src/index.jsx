import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/app";

import Firebase, {FirebaseContext} from './components/Firebase/firebase';

ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
        <App />
    </FirebaseContext.Provider>, 
    document.getElementById("root"));
