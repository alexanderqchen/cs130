import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Firebase, { withFirebase } from "../Firebase/firebase";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
}));

const SignOutButton = ({ firebase }) => {
  const classes = useStyles();
  return (
    <Grid container justify="space-between">
      <Grid item />
      <Grid item>
        <Button
          variant="outlined"
          color="secondary"
          className={classes.button}
          onClick={firebase.doSignOut}
        >
          Log Out
        </Button>
      </Grid>
    </Grid>
  );
};

SignOutButton.propTypes = {
  firebase: PropTypes.instanceOf(Firebase).isRequired
};

export default withFirebase(SignOutButton);
