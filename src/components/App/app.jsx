import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PropTypes from "prop-types";
import Navigation from "../Navigation/navigation";
import Firebase, { withFirebase } from "../Firebase/firebase";
import LandingPage from "../Landing/landing";
import SignInPage from "../SignIn/signIn";
import PasswordForgetPage from "../PasswordForget/pwForget";
import AdminPanelPage from "../Admin/admin";
import AuthUserContext from "../Session/session";
import * as ROUTES from "../../constants/routes";

class App extends Component {
  static get propTypes() {
    return {
      firebase: PropTypes.instanceOf(Firebase).isRequired
    };
  }

  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {

    return (
        <Router>
          <div>
            <Navigation />
            <hr />
            <Route exact path={ROUTES.LANDING} component={LandingPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route
              path={ROUTES.PASSWORD_FORGET}
              component={PasswordForgetPage}
            />
            <Route path={ROUTES.ADMIN_PANEL} component={AdminPanelPage} />
          </div>
        </Router>
    );
  }
}

export default withFirebase(App);
