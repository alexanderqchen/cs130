import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Firebase, { withFirebase } from "../Firebase/firebase";
import * as ROUTES from "../../constants/routes";
import * as PERSLEVEL from "../../constants/persistentLevel";
import withAuthorization from "../Session/withAuthorization";

function SignIn() {
  return (
    <div>
      <h1>SignIn</h1>
      <SignInForm />
    </div>
  );
}

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  static get propTypes() {
    return {
      firebase: PropTypes.instanceOf(Firebase).isRequired,
      history: PropTypes.arrayOf(PropTypes.string).isRequired
    };
  }

  onSubmit = event => {
    const { email, password } = this.state;
    const { firebase, history } = this.props;

    firebase
      .setPersistenceLevel(PERSLEVEL.LOCAL)
      .then(() => firebase.doSignInWithEmailAndPassword(email, password))
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        history.push(ROUTES.ADMIN_PANEL);
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === "" || email === "";

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignInForm = withRouter(withFirebase(SignInFormBase));

export default withAuthorization(SignIn)(true);
