import React from "react";
import withAuthorization from "../Session/withAuthorization";
import InviteAdminButtom from "../InviteAdmin/inviteAdmin";
import SignOutButton from "../SignOut/signOut";

function Admin() {
  // Note(jason): We are putting the InviteAdmin features here for
  // development. We will need to move it to the settings page later.
  return (
    <div>
      <InviteAdminButtom />
      <SignOutButton />
      Admin Page
    </div>
  );
}

export default withAuthorization(Admin);
