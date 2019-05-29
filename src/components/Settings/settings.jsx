import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
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
import { Switch } from "@material-ui/core";
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
  deleteDialog: {
    width: "50%",
    paddingLeft: 25,
    paddingRight: 25
  },
  cancelDelete: {
    textTransform: "none"
  },
  confirmDelete: {
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
      openDelete: false,
      emailInput: "",
      emailInputWellFormatted: false,
      loading: true,
      users: null,
      usersObject: null
    };
    this.onEmailInputChange = this.onEmailInputChange.bind(this);

    this.handleClickOpenAdd = this.handleClickOpenAdd.bind(this);
    this.handleCloseAdd = this.handleCloseAdd.bind(this);
    this.handleConfirmAdd = this.handleConfirmAdd.bind(this);
    this.handleClickOpenDelete = this.handleClickOpenDelete.bind(this);
    this.handleCloseDelete = this.handleCloseDelete.bind(this);
    this.handleConfirmDelete = this.handleConfirmDelete.bind(this);

    this.fetchUserList = this.fetchUserList.bind(this);
    this.doToggleEnabled = this.doToggleEnabled.bind(this);
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
      openAdd: true
    });
  }

  // Handle the logic when the user closes the Add dialog
  handleCloseAdd() {
    this.setState({
      openAdd: false
    });
  }

  // Handle the logic when a user adds an account (Presses Add in Add dialog)
  handleConfirmAdd() {
    const { emailInput } = this.state;
    this.writeUserToDb(emailInput, true);
    // Add logic here
    this.setState({
      openAdd: false
    });
  }

  // When the user clicks on the delete button, open dialog confirming deletion
  handleClickOpenDelete() {
    this.setState({
      openDelete: true
    });
  }

  // Handle the logic when the user closes the dialog confirming deletion
  handleCloseDelete() {
    this.setState({
      openDelete: false
    });
  }

  // Handle the logic when a user deletes an account (Presses Delete in Delete dialog)
  handleConfirmDelete() {
    // Add logic here
    this.setState({
      openDelete: false
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
        <div>
          <hr />
          <ListItem>
            <ListItemText primary={email.replace(",", ".")} />
            <ListItemSecondaryAction>
              <Switch
                checked={usersObject[email].enabled}
                onChange={this.doToggleEnabled(email)}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </div>
      );
    });

    return <div>{usersListItems}</div>;
  }

  doToggleEnabled(email) {
    return event => {
      this.writeUserToDb(email, event.target.checked);
    };
  }

  writeUserToDb(email, enabled) {
    const { firebase } = this.props;

    firebase.user(email.replace(".", ",")).set({
      enabled
    });
  }

  render() {
    const { classes } = this.props;
    const { openAdd, openDelete, emailInputWellFormatted } = this.state;
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
            classes={{ paper: classes.deleteDialog }}
            onClose={this.handleCloseDelete}
            open={openDelete}
            disableBackdropClick
            disableEscapeKeyDown
          >
            <DialogTitle onClose={this.handleCloseDelete}>Delete</DialogTitle>
            Are you sure you want to delete this user?
            <DialogActions>
              <Button
                onClick={this.handleCloseDelete}
                variant="outlined"
                classes={{ label: classes.cancelDelete }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={this.handleConfirmDelete}
                color="secondary"
                classes={{ label: classes.confirmDelete }}
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </div>
    );
  }
}

export default withFirebase(withStyles(styles)(Settings));
