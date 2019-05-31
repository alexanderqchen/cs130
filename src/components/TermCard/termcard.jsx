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
  buttonGrid: {
    padding: 15,
    margin: 15,
    display: "block"
  },
  button: {
    display: "inline-block"
  },
  editDialog: {
    width: "50%",
    paddingLeft: 25,
    paddingRight: 25
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
      isTermEditable: PropTypes.bool.isRequired,
      definition: PropTypes.string.isRequired,
      classes: PropTypes.instanceOf(Object).isRequired,
      edit: PropTypes.bool.isRequired,
      del: PropTypes.bool.isRequired,
      deleteTermFromDb: PropTypes.func,
      editTermToDb: PropTypes.func
    };
  }

  static get defaultProps() {
    return {
      deleteTermFromDb: () => {},
      editTermToDb: () => {}
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      definitionInput: props.definition,
      termInput: props.term,
      openEdit: false,
      openDelete: false
    };
    this.onDefinitionInputChange = this.onDefinitionInputChange.bind(this);
    this.onTermInputChange = this.onTermInputChange.bind(this);

    this.handleClickOpenEdit = this.handleClickOpenEdit.bind(this);
    this.handleCloseEdit = this.handleCloseEdit.bind(this);
    this.handleConfirmEdit = this.handleConfirmEdit.bind(this);
    this.handleClickOpenDelete = this.handleClickOpenDelete.bind(this);
    this.handleCloseDelete = this.handleCloseDelete.bind(this);
    this.handleConfirmDelete = this.handleConfirmDelete.bind(this);
  }

  onDefinitionInputChange(event) {
    this.setState({
      definitionInput: event.target.value
    });
  }

  onTermInputChange(event) {
    this.setState({
      termInput: event.target.value
    });
  }

  // When the user clicks on the edit button, open Edit dialog
  handleClickOpenEdit() {
    const { term, definition } = this.props;
    this.setState({
      termInput: term,
      definitionInput: definition,
      openEdit: true
    });
  }

  // Handle the logic when the user closes the Edit dialog
  handleCloseEdit() {
    const { term, definition } = this.props;
    this.setState({
      termInput: term,
      definitionInput: definition,
      openEdit: false
    });
  }

  // Handle the logic when the user saves the edits
  handleConfirmEdit() {
    const { term, editTermToDb } = this.props;
    const { termInput, definitionInput } = this.state;

    editTermToDb(term, termInput, definitionInput).then(() => {
      this.setState({
        openEdit: false
      });
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
    const { term, deleteTermFromDb } = this.props;
    deleteTermFromDb(term).then(() => {
      this.setState({
        openDelete: false
      });
    });
  }

  render() {
    const { classes, term, isTermEditable, definition, edit, del } = this.props;
    const { termInput, definitionInput, openEdit, openDelete } = this.state;
    return (
      <div className={classes.root}>
        <Grid container justify="space-between">
          <Grid item xs={2}>
            <p className={classes.term}>{term}</p>
          </Grid>
          <Grid item xs={6}>
            <p className={classes.definition}>{definition}</p>
          </Grid>
          <Grid item xs={3} className={classes.buttonGrid}>
            {edit ? (
              <Fab
                className={classes.button}
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
                className={classes.button}
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
            <TextField
              disabled={!isTermEditable}
              value={termInput}
              margin="normal"
              variant="outlined"
              onChange={this.onTermInputChange}
            />
          </FormControl>
          <FormControl>
            <InputLabel shrink>Definition</InputLabel>
            <TextField
              value={definitionInput}
              margin="normal"
              multiline
              rows="4"
              variant="outlined"
              onChange={this.onDefinitionInputChange}
            />
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
