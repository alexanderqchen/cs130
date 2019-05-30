import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import green from "@material-ui/core/colors/green";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import clsx from "clsx";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import IconButton from "@material-ui/core/IconButton";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import PasswordForgetForm from "../PasswordForget/pwForget";
import withAuthorization from "../Session/withAuthorization";
import SignInForm from "../SignIn/signIn";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  },
  success: {
    backgroundColor: green[600]
  },
  message: {
    display: "flex",
    alignItems: "center"
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  }
}));

function MySnackbarContentWrapper(props) {
  const classes = useStyles();
  const { className, message, onClose, ...other } = props;

  return (
    <SnackbarContent
      className={clsx(classes.success, className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <CheckCircleIcon
            className={clsx(classes.icon, classes.iconVariant)}
          />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
      {...other}
    />
  );
}

MySnackbarContentWrapper.propTypes = {
  className: PropTypes.string.isRequired,
  message: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(["success", "warning", "error", "info"]).isRequired
};

class Landing extends Component {
  static get propTypes() {
    return {
      classes: PropTypes.instanceOf(Object).isRequired
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      signInOpen: false,
      forgetPwOpen: false,
      snackbarOpen: false
    };
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

  handlePwClose = snackbarOpen => {
    this.setState({ forgetPwOpen: false, snackbarOpen });
  };

  handleSnackbarClose = () => {
    this.setState({ snackbarOpen: false });
  };

  render() {
    const { classes } = this.props;
    const { signInOpen, forgetPwOpen, snackbarOpen } = this.state;
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={this.handleSnackbarClose}
        >
          <MySnackbarContentWrapper
            onClose={this.handleSnackbarClose}
            message="A password email has been sent."
          />
        </Snackbar>
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
