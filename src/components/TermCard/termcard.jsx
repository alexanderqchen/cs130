import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import TextField from '@material-ui/core/TextField';
import PropTypes from "prop-types";
import "typeface-roboto";

const styles = {
  root: {},
  definition: {
    textAlign: "center"
  },
  term: {
    textAlign: "center"
  },
  button: {
    marginLeft: 10,
    marginRight: 10
  },
  buttons: {
    margin: "auto",
    width: "50%",
    padding: 10
  },
  editDialog: {
      
  },
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
        openAdd: false,
    };
    this.handleClickOpenEdit = this.handleClickOpenEdit.bind(this);
    this.handleCloseEdit = this.handleCloseEdit.bind(this);
    this.handleClickOpenAdd = this.handleClickOpenAdd.bind(this);
    this.handleCloseAdd = this.handleCloseAdd.bind(this);
  }

  handleClickOpenEdit() {
    this.setState({
        openEdit: true,
    });
  }

  handleCloseEdit() {
    this.setState({
        openEdit: false,
    });
  }

  handleClickOpenAdd() {
    this.setState({
        openAdd: true,
    });
  }

  handleCloseAdd() {
    this.setState({
        openAdd: false,
    });
  }

  render() {
    const { classes, term, definition, edit, del } = this.props;
    const { openEdit, openAdd } = this.state;
    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={3}>
            <p className={classes.term}>{term}</p>
          </Grid>
          <Grid item xs={6}>
            {definition}
          </Grid>
          <Grid item xs={3} className={classes.buttons}>
            {edit ? (
              <Fab color="primary" aria-label="Edit" className={classes.button} onClick={this.handleClickOpenEdit}>
                <EditIcon />
              </Fab>
            ) : null}
            {del ? (
              <Fab
                color="primary"
                aria-label="Delete"
                className={classes.button}
                onClick={this.handleClickOpenAdd}
              >
                <DeleteIcon />
              </Fab>
            ) : null}
          </Grid>
        </Grid>
        <hr />
        <Dialog
            className={classes.editDialog}
            onClose={this.handleCloseEdit}
            open={openEdit}
            disableBackdropClick
            disableEscapeKeyDown
        >
            <DialogTitle onClose={this.handleCloseEdit}>
                Edit Term
            </DialogTitle>
            <TextField
                label="Term"
                margin="normal"
            />
            <TextField
                label="Definition"
                margin="normal"
            />
            <DialogActions>
                <Button onClick={this.handleCloseEdit} color="primary">
                    Cancel
                </Button>
                <Button onClick={this.handleCloseEdit} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
        <Dialog
            className={classes.addDialog}
            onClose={this.handleCloseAdd}
            open={openAdd}
            disableBackdropClick
            disableEscapeKeyDown
        >
            <DialogTitle onClose={this.handleCloseAdd}>
                Add Term
            </DialogTitle>
            <TextField
                label="Term"
                margin="normal"
            />
            <TextField
                label="Definition"
                margin="normal"
            />
            <DialogActions>
                <Button onClick={this.handleCloseAdd} color="primary">
                    Cancel
                </Button>
                <Button onClick={this.handleCloseAdd} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(TermCard);
