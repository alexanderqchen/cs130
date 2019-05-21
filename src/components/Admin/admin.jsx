import React from "react";
import withAuthorization from "../Session/withAuthorization";

function Admin() {
  return <div>Admin Page</div>;
}

export default withAuthorization(Admin);
