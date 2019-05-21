import React from "react";
import PropTypes from "prop-types";
import Firebase, { withFirebase } from "../Firebase/firebase";

const SignOutButton = ({ firebase }) => (
  <button type="submit" onClick={firebase.doSignOut}>
    Sign Out
  </button>
);

SignOutButton.propTypes = {
  firebase: PropTypes.instanceOf(Firebase).isRequired
};

export default withFirebase(SignOutButton);
