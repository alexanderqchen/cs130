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

  onSubmit = event => {
    const { email, password } = this.state;
    const { firebase, history } = this.props;

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
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
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
                onChange={this.onChange}
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
                onChange={this.onChange}
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
              {error && <p>{error.message}</p>}

              <Button onClick={handleForgetPwClick}>Forgot password?</Button>
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
