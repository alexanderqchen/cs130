import React from 'react';
import { withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase/firebase';
import * as ROUTES from '../../constants/routes';
import AuthUserContext from './session';

const withAuthorization = Component => {
    class WithAuthorization extends React.Component {
        componentDidMount() {
            this.listener = this.props.firebase.auth.onAuthStateChanged(
              authUser => {
                if (!authUser) {
                  this.props.history.push(ROUTES.SIGN_IN);
                }
              },
            );
        }
        componentWillUnmount() {
            this.listener();
        }

        render() {
            return (
                <AuthUserContext.Consumer>
                    {authUser =>
                        authUser ? <Component {...this.props} /> : null
                    }
                </AuthUserContext.Consumer>
            )
        }
    }
  
    return withRouter(withFirebase(WithAuthorization));
  };
  
  export default withAuthorization;