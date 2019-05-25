import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
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
    paddingRight: 25
  },
  deleteDialog: {
    width: "50%",
    paddingLeft: 25,
    paddingRight: 25
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
    this.handleClickOpenDelete = this.handleClickOpenDelete.bind(this);
    this.handleCloseDelete = this.handleCloseDelete.bind(this);
  }

  handleClickOpenEdit() {
    this.setState({
      openEdit: true
    });
  }

  handleCloseEdit() {
    this.setState({
      openEdit: false
    });
  }

  handleClickOpenDelete() {
    this.setState({
      openDelete: true
    });
  }

  handleCloseDelete() {
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
          <TextField label="Term" margin="normal" />
          <TextField label="Definition" margin="normal" />
          <DialogActions>
            <Button onClick={this.handleCloseEdit} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleCloseEdit} color="primary">
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
            <Button onClick={this.handleCloseDelete} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleCloseDelete} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(TermCard);
