import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from '../SignOut/sign_out';
import * as ROUTES from "../../constants/routes";

function Navigation() {
  return (
    <div>
      <ul>
        <li>
          <Link to={ROUTES.SIGN_IN}>Sign In</Link>
        </li>
        <li>
          <Link to={ROUTES.LANDING}>Landing</Link>
        </li>
        <li>
          <Link to={ROUTES.ADMIN_PANEL}>Admin Panel</Link>
        </li>
        <li>
          <Link to={ROUTES.PASSWORD_FORGET}>Password Forget</Link>
        </li>
        <li>
            <SignOutButton/>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
