import React, { Component } from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
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
    this.state = {
      authUser: null
    };
  }

  componentDidMount() {
    const { firebase } = this.props;
    this.listener = firebase.auth.onAuthStateChanged(authUser => {
      if (authUser) this.setState({ authUser });
      else this.setState({ authUser: null });
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    const { authUser } = this.state;
    console.log("app component " + authUser);
    return (
      <AuthUserContext.Provider value={authUser}>
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
      </AuthUserContext.Provider>
    );
  }
}

export default withFirebase(App);
