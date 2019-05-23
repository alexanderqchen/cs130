import React from "react";
import withAuthorization from "../Session/withAuthorization";

function Landing() {
  return <div>Landing Page</div>;
}

export default withAuthorization(Landing)(true);
