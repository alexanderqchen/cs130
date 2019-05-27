import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Fab from "@material-ui/core/Fab";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import DeleteIcon from "@material-ui/icons/CloseOutlined";
import EditIcon from "@material-ui/icons/EditOutlined";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import "typeface-roboto";

const styles = {
  root: {},
  definition: {},
  term: {
    textAlign: "center"
  },
  buttonIcon: {
    display: "block",
    margin: 10
  },
  buttons: {
    padding: 15,
    margin: 15,
    display: "block"
  },
  editDialog: {
    width: "50%",
    paddingLeft: 25,
    paddingRight: 25,
  },
  cancelEdit: {
    textTransform: "none"
  },
  saveEdit: {
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

// eslint-disable-next-line react/prefer-stateless-function
class TermCard extends Component {
  static get propTypes() {
    return {
      term: PropTypes.string.isRequired,
      definition: PropTypes.string.isRequired,
      classes: PropTypes.instanceOf(Object).isRequired,
      edit: PropTypes.bool.isRequired,
      del: PropTypes.bool.isRequired
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      openEdit: false,
      openDelete: false
    };
    this.handleClickOpenEdit = this.handleClickOpenEdit.bind(this);
    this.handleCloseEdit = this.handleCloseEdit.bind(this);
    this.handleConfirmEdit = this.handleConfirmEdit.bind(this);
    this.handleClickOpenDelete = this.handleClickOpenDelete.bind(this);
    this.handleCloseDelete = this.handleCloseDelete.bind(this);
    this.handleConfirmDelete = this.handleConfirmDelete.bind(this);
  }

  // When the user clicks on the edit button, open Edit dialog
  handleClickOpenEdit() {
    this.setState({
      openEdit: true
    });
  }

  // Handle the logic when the user closes the Edit dialog
  handleCloseEdit() {
    this.setState({
      openEdit: false
    });
  }

  // Handle the logic when the user saves the edits
  handleConfirmEdit() {
    // Add logic here
    this.setState({
      openEdit: false
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

  // Handle the logic when the user deletes the term
  handleConfirmDelete() {
    // Add logic here
    this.setState({
      openDelete: false
    });
  }

  render() {
    const { classes, term, definition, edit, del } = this.props;
    const { openEdit, openDelete } = this.state;
    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={3}>
            <p className={classes.term}>{term}</p>
          </Grid>
          <Grid item xs={6}>
            <p className={classes.definition}>{definition}</p>
          </Grid>
          <Grid item xs={3} className={classes.buttons}>
            {edit ? (
              <Fab
                color="primary"
                aria-label="Edit"
                classes={{ root: classes.buttonIcon }}
                onClick={this.handleClickOpenEdit}
              >
                <EditIcon />
              </Fab>
            ) : null}
            {del ? (
              <Fab
                color="primary"
                aria-label="Delete"
                classes={{ root: classes.buttonIcon }}
                onClick={this.handleClickOpenDelete}
              >
                <DeleteIcon />
              </Fab>
            ) : null}
          </Grid>
        </Grid>
        <hr />

        {/* Dialog for Edit Button */}
        <Dialog
          classes={{ paper: classes.editDialog }}
          onClose={this.handleCloseEdit}
          open={openEdit}
          disableBackdropClick
          disableEscapeKeyDown
        >
          <DialogTitle onClose={this.handleCloseEdit}>Edit Term</DialogTitle>
          <FormControl>
            <InputLabel shrink>Term</InputLabel>
            <TextField margin="normal" variant="outlined" />
          </FormControl>
          <FormControl>
            <InputLabel shrink>Definition</InputLabel>
            <TextField margin="normal" multiline rows="4" variant="outlined" />
          </FormControl>
          <DialogActions>
            <Button
              onClick={this.handleCloseEdit}
              variant="outlined"
              classes={{ label: classes.cancelEdit }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={this.handleConfirmEdit}
              color="primary"
              classes={{ label: classes.saveEdit }}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog for Delete Button */}
        <Dialog
          classes={{ paper: classes.deleteDialog }}
          onClose={this.handleCloseDelete}
          open={openDelete}
          disableBackdropClick
          disableEscapeKeyDown
        >
          <DialogTitle onClose={this.handleCloseDelete}>Delete</DialogTitle>
          Are you sure you want to delete this term?
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
      </div>
    );
  }
}

export default withStyles(styles)(TermCard);
