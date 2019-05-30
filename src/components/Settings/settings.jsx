import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Fab from "@material-ui/core/Fab";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import { IconButton, Snackbar, Switch } from "@material-ui/core";
import PropTypes from "prop-types";
import Firebase, { withFirebase } from "../Firebase/firebase";
import "typeface-roboto";

// TODOs:
// Color the add button differently
// Add dialog is partially styled
// Add button should be positioned absolute bottom right
const styles = {
  root: {
    padding: 30
  },
  title: {
    fontWeight: "normal"
  },
  emailList: {
    paddingLeft: 25
  },
  addDialog: {
    width: "50%",
    paddingLeft: 25,
    paddingRight: 25
  },
  cancelAdd: {
    textTransform: "none"
  },
  confirmAdd: {
    textTransform: "none"
  },
  toggleDialog: {
    width: "50%",
    paddingLeft: 25,
    paddingRight: 25
  },
  cancelToggle: {
    textTransform: "none"
  },
  confirmToggle: {
    textTransform: "none"
  }
};

class Settings extends Component {
  static get propTypes() {
    return {
      classes: PropTypes.instanceOf(Object).isRequired,
      firebase: PropTypes.instanceOf(Firebase).isRequired
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      openAdd: false,
      openToggle: false,
      toggleEmail: "",

      // The boolean value that enabled will change to, if the
      // user confirms
      toggleDesiredBool: false,
      emailInput: "",
      emailInputWellFormatted: false,

      snackbarOpen: false,
      snackbarText: "",
      loading: true,
      users: null,
      usersObject: null
    };
    this.onEmailInputChange = this.onEmailInputChange.bind(this);

    this.handleClickOpenAdd = this.handleClickOpenAdd.bind(this);
    this.handleCloseAdd = this.handleCloseAdd.bind(this);
    this.handleConfirmAdd = this.handleConfirmAdd.bind(this);
    this.handleClickOpenToggle = this.handleClickOpenToggle.bind(this);
    this.handleCloseToggle = this.handleCloseToggle.bind(this);
    this.handleConfirmToggle = this.handleConfirmToggle.bind(this);
    this.handleShowSnackbar = this.handleShowSnackbar.bind(this);
    this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this);

    this.fetchUserList = this.fetchUserList.bind(this);
    this.writeUserToDb = this.writeUserToDb.bind(this);
  }

  componentDidMount() {
    const { firebase } = this.props;
    this.setState({
      loading: true
    });

    firebase.users().on("value", snapshot => {
      const usersObject = snapshot.val();

      if (usersObject) {
        const usersList = Object.keys(usersObject);

        this.setState({
          users: usersList,
          usersObject,
          loading: false
        });
        return;
      }

      this.setState({ users: null, loading: false });
    });
  }

  onEmailInputChange(event) {
    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const email = event.target.value;

    this.setState({
      emailInput: email,
      emailInputWellFormatted: regexEmail.test(email)
    });
  }

  // When the user clicks on the add button, open Add dialog
  handleClickOpenAdd() {
    this.setState({
      openAdd: true,
      emailInput: "",
      emailInputWellFormatted: false
    });
  }

  // Handle the logic when the user closes the Add dialog
  handleCloseAdd() {
    this.setState({
      emailInput: "",
      emailInputWellFormatted: false,
      openAdd: false
    });
  }

  // Handle the logic when a user adds an account (Presses Add in Add dialog)
  handleConfirmAdd() {
    const { firebase } = this.props;
    const { emailInput, users } = this.state;

    // If user already exists, do not allow the add
    if (users.indexOf(emailInput.replace(".", ",")) !== -1) {
      this.handleShowSnackbar("Admin with this email already exists");
      return;
    }

    firebase
      .doCreateNewUser(emailInput)
      .then(() => firebase.doPasswordReset(emailInput))
      .then(() => {
        this.writeUserToDb(emailInput, true);
      })
      .then(() => {
        this.setState({
          openAdd: false
        });
      })
      .then(() => {
        this.handleShowSnackbar(
          `Successfully invited admin with email ${emailInput.replace(
            ",",
            "."
          )}`
        );
      })
      .catch(error => {
        const errorCode = error.code;
        if (errorCode === "auth/email-already-in-use") {
          this.writeUserToDb(emailInput, true)
            .then(() => {
              this.setState({
                openAdd: false
              });
            })
            .then(() => {
              this.handleShowSnackbar(
                "Admin with email already exists. Have them use the 'forgot password' option"
              );
            });
        } else if (errorCode === "auth/invalid-email") {
          // Should never happen, since input box verifies email first
          this.handleShowSnackbar(
            "Error with invitation workflow. Developer needs to adjust randomized default password"
          );
        } else if (errorCode === "auth/operation-not-allowed") {
          this.handleShowSnackbar(
            "Error with invitation workflow. Developer needs to look into firebase auth/operation-not-allowed"
          );
        } else if (errorCode === "auth/weak-password") {
          // Should never happen, since randomized password is numeric of length 32
          this.handleShowSnackbar(
            "Error with invitation workflow. Developer needs to adjust randomized default password"
          );
        } else {
          this.handleShowSnackbar("Unknown error with invitation workflow.");
        }
      });
  }

  // When the user clicks on the toggle button, open dialog confirming deletion
  handleClickOpenToggle(email) {
    return event => {
      this.setState({
        openToggle: true,
        toggleEmail: email,
        toggleDesiredBool: event.target.checked
      });
    };
  }

  // Handle the logic when the user closes the dialog confirming deletion
  handleCloseToggle() {
    this.setState({
      openToggle: false
    });
  }

  // Handle the logic when a user toggles an account (Presses Toggle in Toggle dialog)
  handleConfirmToggle() {
    const { toggleEmail, toggleDesiredBool } = this.state;

    this.writeUserToDb(toggleEmail, toggleDesiredBool).then(
      this.setState({
        openToggle: false
      })
    );
  }

  handleShowSnackbar(text) {
    this.setState({
      snackbarOpen: true,
      snackbarText: text
    });
  }

  handleCloseSnackbar(event, reason) {
    if (reason === "clickaway") {
      return;
    }

    this.setState({
      snackbarOpen: false
    });
  }

  // Used to fetch a list of valid email addresses
  fetchUserList() {
    const { loading, users, usersObject } = this.state;
    if (loading) {
      return <div>Loading list of admins</div>;
    }

    if (!users) {
      return <div>Unable to load list of admins</div>;
    }

    if (users.length === 0) {
      return <div>No admins found</div>;
    }

    const usersListItems = users.map(email => {
      return (
        <div key={email}>
          <hr />
          <ListItem>
            <ListItemText primary={email.replace(",", ".")} />
            <ListItemSecondaryAction>
              <Switch
                checked={usersObject[email].enabled}
                onChange={this.handleClickOpenToggle(email)}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </div>
      );
    });

    return <div>{usersListItems}</div>;
  }

  writeUserToDb(email, enabled) {
    const { firebase } = this.props;

    return firebase.user(email.replace(".", ",")).set({
      enabled
    });
  }

  render() {
    const { classes } = this.props;
    const {
      openAdd,
      openToggle,
      toggleEmail,
      toggleDesiredBool,
      emailInput,
      emailInputWellFormatted,
      snackbarOpen,
      snackbarText
    } = this.state;
    const toggleVerb = toggleDesiredBool ? "enable" : "disable";
    const toggleVerbCaps = toggleDesiredBool ? "Enable" : "Disable";
    return (
      <div className={classes.root}>
        <h1 className={classes.title}>Accounts</h1>
        <Grid container>
          <Grid item xs={4}>
            <div className={classes.emailList}>
              <List>{this.fetchUserList()}</List>
            </div>
          </Grid>
          <Grid item xs={4} />
          <Grid item xs={4} />
          <Fab
            color="primary"
            aria-label="Add"
            onClick={this.handleClickOpenAdd}
          >
            <AddIcon />
          </Fab>

          {/* Add User Dialog */}
          <Dialog
            classes={{ paper: classes.addDialog }}
            onClose={this.handleCloseAdd}
            open={openAdd}
            disableBackdropClick
            disableEscapeKeyDown
          >
            <DialogTitle onClose={this.handleCloseAdd}>
              Add New Admin User
            </DialogTitle>
            <FormControl>
              <InputLabel shrink>Email</InputLabel>
              <TextField
                value={emailInput}
                margin="normal"
                variant="outlined"
                onChange={this.onEmailInputChange}
              />
            </FormControl>
            <DialogActions>
              <Button
                onClick={this.handleCloseAdd}
                variant="outlined"
                classes={{ label: classes.cancelAdd }}
              >
                Cancel
              </Button>
              <Button
                onClick={this.handleConfirmAdd}
                color="primary"
                classes={{ label: classes.confirmAdd }}
                disabled={!emailInputWellFormatted}
              >
                Add
              </Button>
            </DialogActions>
          </Dialog>

          {/* Remove User Dialog */}
          <Dialog
            classes={{ paper: classes.toggleDialog }}
            onClose={this.handleCloseToggle}
            open={openToggle}
            disableBackdropClick
            disableEscapeKeyDown
          >
            <DialogTitle onClose={this.handleCloseToggle}>
              {toggleVerbCaps} Admin
            </DialogTitle>
            Are you sure you want to {toggleVerb} the admin with email{" "}
            {toggleEmail.replace(",", ".")}?
            <br />
            <br />
            {toggleDesiredBool
              ? "Enabled admins will be able to modify courtroom and glossary text."
              : "Disabled admins will not be able to log into the admin dashboard unless you re-enable them."}
            <DialogActions>
              <Button
                onClick={this.handleCloseToggle}
                variant="outlined"
                classes={{ label: classes.cancelToggle }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={this.handleConfirmToggle}
                color="secondary"
                classes={{ label: classes.confirmToggle }}
              >
                {toggleVerbCaps}
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={snackbarOpen}
          autoHideDuration={8000}
          onClose={this.handleCloseSnackbar}
          ContentProps={{
            "aria-describedby": "snackbar-message"
          }}
          message={<span id="snackbar-message">{snackbarText}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleCloseSnackbar}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    );
  }
}

export default withFirebase(withStyles(styles)(Settings));
