import React from "react";
import withAuthorization from "../Session/withAuthorization";
import SignOutButton from "../SignOut/signOut";

function Admin() {
  return (
    <div>
      <SignOutButton />
      Admin Page
    </div>
  );
}

export default withAuthorization(Admin)(false);
