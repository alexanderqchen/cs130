import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../SignOut/signOut";
import * as ROUTES from "../../constants/routes";
import AuthUserContext from "../Session/session";

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser => {return authUser ? <NavigationAuth /> : <NavigationNoAuth /> }}
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = () => (
  <div>
    <ul>
      <li>
        <Link to={ROUTES.ADMIN_PANEL}>Admin Panel</Link>
      </li>
      <SignOutButton />
    </ul>
  </div>
);

const NavigationNoAuth = () => (
  <div>
    <ul>
      <li>
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </li>
      <li>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </li>
      <li>
        <Link to={ROUTES.PASSWORD_FORGET}>Password Forget</Link>
      </li>
    </ul>
  </div>
);
export default Navigation;
