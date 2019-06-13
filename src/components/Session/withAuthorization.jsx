import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Firebase, { withFirebase } from "../Firebase/firebase";
import * as ROUTES from "../../constants/routes";

const withAuthorization = Component => isPublic => {
  class WithAuthorization extends React.Component {
    constructor(props) {
      super(props);
      this.state = { authUser: null, display: false };
    }

    static get propTypes() {
      return {
        firebase: PropTypes.instanceOf(Firebase).isRequired,
        history: PropTypes.arrayOf(PropTypes.string).isRequired
      };
    }

    componentDidMount() {
      const { firebase, history } = this.props;
      this.listener = firebase.auth.onAuthStateChanged(authUser => {
        this.setState({ authUser, display: true });
        if (!authUser && !isPublic) {
          history.push(ROUTES.LANDING);
        } else if (authUser && isPublic) {
          history.push(ROUTES.ADMIN_PANEL);
        }
      });
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      const { authUser, display } = this.state;
      if (display) {
        if ((authUser && !isPublic) || (!authUser && isPublic)) {
          return <Component {...this.props} />;
        }
        return null;
      }
      return null;
    }
  }

  return withRouter(withFirebase(WithAuthorization));
};

export default withAuthorization;
