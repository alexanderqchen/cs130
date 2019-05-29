import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Firebase, { withFirebase } from "../Firebase/firebase";

const ST_INPUT = 1;
const ST_SUCC = 2;

const INITIAL_STATE = {
  email: "",
  st: ST_INPUT,
  error: null
};

class InviteAdminFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  static get propTypes() {
    return {
      firebase: PropTypes.instanceOf(Firebase).isRequired
    };
  }

  onInviteSubmit = event => {
    const { email } = this.state;
    const { firebase } = this.props;

    firebase
      .doCreateNewUser(email)
      .then(() => firebase.doPasswordReset(email))
      .then(() => {
        this.setState({
          st: ST_SUCC
        });
      })
      .catch(error => {
        this.setState({
          error: error.toString()
        });
      });

    event.preventDefault();
  };

  onEmailChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, st, error } = this.state;

    let pageContent;
    if (error) {
      pageContent = <div> {error} </div>;
    } else if (st === ST_INPUT) {
      pageContent = (
        <div>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={this.onEmailChange}
            autoFocus
          />

          <Button
            type="submit"
            onClick={this.onInviteSubmit}
            variant="contained"
            color="primary"
          >
            Invite admin with email
          </Button>
        </div>
      );
    } else if (st === ST_SUCC) {
      pageContent = <div>Successfully invited {email}</div>;
    } else {
      // Should never happen
      pageContent = <div>Error undefined state {st}</div>;
    }

    return <div> {pageContent} </div>;
  }
}

function InviteAdmin() {
  return <InviteAdminForm />;
}

const InviteAdminForm = withRouter(withFirebase(InviteAdminFormBase));

export default InviteAdmin;