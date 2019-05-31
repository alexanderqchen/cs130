import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import Firebase, { withFirebase } from "../Firebase/firebase";
import * as ROUTES from "../../constants/routes";
import * as PERSLEVEL from "../../constants/persistentLevel";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  pointer: {
    cursor: "pointer"
  }
}));

const INITIAL_STATE = {
  email: "",
  password: "",
  users: null,
  usersObject: null,
  error: null
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  static get propTypes() {
    return {
      firebase: PropTypes.instanceOf(Firebase).isRequired,
      history: PropTypes.arrayOf(PropTypes.string).isRequired,
      classes: PropTypes.instanceOf(Object).isRequired,
      onClose: PropTypes.func.isRequired,
      open: PropTypes.bool.isRequired
    };
  }

  componentDidMount() {
    const { firebase } = this.props;

    firebase.users().on("value", snapshot => {
      const usersObject = snapshot.val();

      if (usersObject) {
        const usersList = Object.keys(usersObject);

        this.setState({
          users: usersList,
          usersObject
        });
        return;
      }

      this.setState({ users: null });
    });
  }

  onSubmit = event => {
    // Prevent default behavior for submit, so that when a user
    // is not authorized, the sign-in modal does not close, and
    // they can see the error message
    event.preventDefault();

    const { email, password, users, usersObject } = this.state;
    const { firebase, history } = this.props;

    // Key into the data from firebase
    const emailKey = email.replace(".", ",");

    if (!users) {
      this.setState({
        error: new Error("Unable to fetch firebase user list")
      });
      return;
    }

    // If user is not in auth DB
    if (users.indexOf(emailKey) === -1) {
      this.setState({
        error: new Error(
          "Not authorized. This email does not have an admin account."
        )
      });
      return;
    }

    // User is in the auth DB, but they have been disabled
    if (!usersObject[emailKey].enabled) {
      this.setState({
        error: new Error(
          "Not authorized. The admin account associated with this email has been disabled. Contact your manager to have it re-enabled."
        )
      });
      return;
    }

    firebase
      .setPersistenceLevel(PERSLEVEL.LOCAL)
      .then(() => firebase.doSignInWithEmailAndPassword(email, password))
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        history.push(ROUTES.ADMIN_PANEL);
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  onInputChange = event => {
    this.setState({
      error: null,
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { email, password, error } = this.state;
    const { classes, open, onClose } = this.props;
    const isInvalid = password === "" || email === "";

    const handleClose = () => {
      onClose(false);
    };
    const handleForgetPwClick = () => {
      onClose(true);
    };

    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate onSubmit={this.onSubmit}>
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
                onChange={this.onInputChange}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={this.onInputChange}
              />

              <Button
                disabled={isInvalid}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Button
                onClick={handleForgetPwClick}
                variant="contained"
                color="primary"
                fullWidth
              >
                Forgot password
              </Button>
              {error && <p>{error.message}</p>}
            </form>
          </div>
          <Box mt={5} />
        </Container>
      </Dialog>
    );
  }
}

function SignIn(props) {
  const classes = useStyles();
  return <SignInForm classes={classes} {...props} />;
}

const SignInForm = withRouter(withFirebase(SignInFormBase));

export default SignIn;
