import React from "react";
import withAuthorization from "../Session/withAuthorization";

function PasswordForget() {
  return <div>Password Forget Page</div>;
}

export default withAuthorization(PasswordForget)(true);
