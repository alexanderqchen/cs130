import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import SignInForm from "../SignIn/signIn";
import withAuthorization from "../Session/withAuthorization";
import PasswordForgetForm from "../PasswordForget/pwForget";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
}));

class Landing extends Component {
  static get propTypes() {
    return {
      classes: PropTypes.instanceOf(Object).isRequired
    };
  }

  constructor(props) {
    super(props);
    this.state = { signInOpen: false, forgetPwOpen: false };
  }

  handleClickOpen = () => {
    this.setState({ signInOpen: true });
  };

  handleClose = value => {
    if (value) {
      this.setState({ signInOpen: false, forgetPwOpen: true });
    } else {
      this.setState({ signInOpen: false });
    }
  };

  handlePwClose = () => {
    this.setState({ forgetPwOpen: false });
  };

  render() {
    const { classes } = this.props;
    const { signInOpen, forgetPwOpen } = this.state;
    return (
      <div>
        <Grid container justify="space-between" spacing={24}>
          <Grid item />
          <Grid item>
            <Button
              variant="outlined"
              color="secondary"
              className={classes.button}
              onClick={this.handleClickOpen}
            >
              Login
            </Button>
          </Grid>
        </Grid>
        <SignInForm open={signInOpen} onClose={this.handleClose} />
        <PasswordForgetForm open={forgetPwOpen} onClose={this.handlePwClose} />
      </div>
    );
  }
}

const LandingPage = withAuthorization(Landing)(true);

function LandingExport() {
  const classes = useStyles();
  return <LandingPage classes={classes} />;
}

export default LandingExport;
