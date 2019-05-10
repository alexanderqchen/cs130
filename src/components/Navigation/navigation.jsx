import React from 'react';
import {Link} from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

function Navigation () {
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
        </ul>
    </div>
    );
}

export default Navigation;
