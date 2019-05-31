import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
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
import HeroImage from "../../images/JuvenileJusticeHeroImage.jpg";

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
  },
  fillScreen: {
    position: "absolute",
    height: "100%",
    width: "100%",
    minHeight: "100%",
    minWidth: "100%",
    opacity: 0.75
  },
  buttonFloatTopRight: {
    backgroundColor: "white",
    margin: 0,
    right: 20,
    top: 20,
    position: "fixed"
  },
  centerText: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "4vw",
    color: "white",
    zIndex: 1000,
    fontFamily: "Arial"
  }
}));

function MySnackbarContentWrapper(props) {
  const classes = useStyles();
  const { message, onClose, ...other } = props;

  return (
    <SnackbarContent
      className={classes.success}
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
  message: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired
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
            message="A password reset email has been sent."
          />
        </Snackbar>

        <img alt="Hero" src={HeroImage} className={classes.fillScreen} />
        <div className={classes.centerText}>test</div>

        <Button
          variant="outlined"
          color="secondary"
          className={clsx(classes.button, classes.buttonFloatTopRight)}
          onClick={this.handleClickOpen}
        >
          Login
        </Button>

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
