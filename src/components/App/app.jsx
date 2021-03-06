import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LandingPage from "../Landing/landing";
import AdminPanelPage from "../Admin/admin";
import * as ROUTES from "../../constants/routes";

function App() {
  return (
    <Router>
      <div>
        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.ADMIN_PANEL} component={AdminPanelPage} />
      </div>
    </Router>
  );
}

export default App;
