import React, {Component} from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import Navigation from "../Navigation/navigation";
import Firebase, {withFirebase} from "../Firebase/firebase";
import PropTypes from "prop-types";
import LandingPage from "../Landing/landing";
import SignInPage from "../SignIn/sign_in";
import PasswordForgetPage from "../PasswordForget/pw_forget";
import AdminPanelPage from "../Admin/admin"; 
import AuthUserContext from "../Session/session";
import * as ROUTES from "../../constants/routes";

class App extends Component {
  static get propTypes() {
    return {
      firebase: PropTypes.instanceOf(Firebase).isRequired,
    };
  }

  constructor(props){
    super(props);
    this.state = {
      authUser: null,
    };
  }

  render() {
    return (
      <AuthUserContext.Provider value={this.state.authUser}>
      <Router>
        <div>
          <Navigation />
          <hr />
          <Route exact path={ROUTES.LANDING} component={LandingPage}/>
          <Route path={ROUTES.SIGN_IN} component={SignInPage}/>
          <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage}/>
          <Route path={ROUTES.ADMIN_PANEL} component={AdminPanelPage}/>
        </div>
      </Router>
      </AuthUserContext.Provider>
    );
  }
  
  componentDidMount(){
    const {firebase} = this.props;
    this.listener = firebase.auth.onAuthStateChanged(authUser => {
      authUser ? this.setState({authUser : authUser}) : this.setState({authUser : null});
    })
  }

  componentWillUnmount(){
    this.listener();
  }
}

export default withFirebase(App);
