import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import SignInForm from "../SignIn/signIn";
import withAuthorization from "../Session/withAuthorization";

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
      classes: PropTypes.instanceOf(String).isRequired
    };
  }

  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;
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
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <SignInForm />
        </Dialog>
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
