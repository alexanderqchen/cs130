import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Fab from "@material-ui/core/Fab";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
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
      classes: PropTypes.instanceOf(Object).isRequired
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      openAdd: false,
      openDelete: false
    };
    this.generate = this.generate.bind(this);
    this.handleClickOpenAdd = this.handleClickOpenAdd.bind(this);
    this.handleCloseAdd = this.handleCloseAdd.bind(this);
    this.handleConfirmAdd = this.handleConfirmAdd.bind(this);
    this.handleClickOpenDelete = this.handleClickOpenDelete.bind(this);
    this.handleCloseDelete = this.handleCloseDelete.bind(this);
    this.handleConfirmDelete = this.handleConfirmDelete.bind(this);
  }

  // Used to fetch a list of valid email addresses
  generate(element) {
    this.x = 1; // to bypass "use-this" lint error
    return [0, 1, 2].map(value => {
      return React.cloneElement(element, {
        key: value
      });
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

  render() {
    const { classes } = this.props;
    const { openAdd, openDelete } = this.state;
    return (
      <div className={classes.root}>
        <h1 className={classes.title}>Accounts</h1>
        <Grid container>
          <Grid item xs={4}>
            <div className={classes.emailList}>
              <List>
                {this.generate(
                  <div>
                    <hr />
                    <ListItem>
                      <ListItemText primary="some email here" />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="Delete"
                          onClick={this.handleClickOpenDelete}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </div>
                )}
              </List>
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
              <TextField margin="normal" variant="outlined" />
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

export default withStyles(styles)(Settings);
