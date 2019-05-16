import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Firebase, { withFirebase } from "../Firebase/firebase";
import * as ROUTES from "../../constants/routes";
import AuthUserContext from "./session";


const withAuthorization = Component => {
  class WithAuthorization extends React.Component {
    static get propTypes() {
        return {
          firebase: PropTypes.instanceOf(Firebase).isRequired,
          history: PropTypes.arrayOf(PropTypes.string).isRequired
        };
    }

    componentDidMount() {
        const {firebase, history} = this.props;
        this.listener = firebase.auth.onAuthStateChanged(authUser => {
            if (!authUser) {
                history.push(ROUTES.SIGN_IN);
            }
        });
    }
    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser => (authUser ? <Component {...this.props} /> : null)}
        </AuthUserContext.Consumer>
      );
    }
  }

  return withRouter(withFirebase(WithAuthorization));
};

export default withAuthorization;
