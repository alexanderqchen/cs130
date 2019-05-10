import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Navigation from '../Navigation/navigation';
import LandingPage from '../Landing/landing';
import SignInPage from '../SignIn/sign_in';
import PasswordForgetPage from '../PasswordForget/pw_forget';
import AdminPanelPage from '../Admin/admin';

import * as ROUTES from '../../constants/routes'
function App (){
    return (
    <Router>
        <div>
            <Navigation />
            <hr/>
            <Route exact path={ROUTES.LANDING} component={LandingPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route path={ROUTES.ADMIN_PANEL} component={AdminPanelPage} />
            <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        </div>
    </Router>
    );
}

export default App;