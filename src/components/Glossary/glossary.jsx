import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Fab from "@material-ui/core/Fab";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import TermCard from "../TermCard/termcard";
import "typeface-roboto";

// TODOs: 
// Color the add button differently
// Add dialog is partially styled
// Add button should be positioned absolute bottom right
const styles = {
  root: {
    overflow: "scroll"
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
  }
};

class Glossary extends Component {
  static get propTypes() {
    return {
      classes: PropTypes.instanceOf(Object).isRequired
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      openAdd: false
    };
    this.handleClickOpenAdd = this.handleClickOpenAdd.bind(this);
    this.handleCloseAdd = this.handleCloseAdd.bind(this);
    this.handleConfirmAdd = this.handleConfirmAdd.bind(this);
  }

  // Handle the logic when a term is to be added
  handleClickOpenAdd() {
    this.setState({
      openAdd: true
    });
  }

  // Handle the logic when the user cancels the action to add a term
  handleCloseAdd() {
    this.setState({
      openAdd: false
    });
  }

  // Handle the logic when a user adds a term (Presses Add in Add dialog)
  handleConfirmAdd() {
    // Add logic here
    this.setState({
      openAdd: false
    });
  }

  render() {
    const { classes } = this.props;
    const { openAdd } = this.state;
    return (
      <div className={classes.root}>
        <TermCard term="Hello" definition="definition here" edit del />
        <TermCard term="Hello" definition="definition here" edit del />
        <TermCard term="Hello" definition="definition here" edit del />
        <TermCard term="Hello" definition="definition here" edit del />
        <TermCard term="Hello" definition="definition here" edit del />
        <TermCard term="Hello" definition="definition here" edit del />
        <TermCard term="Hello" definition="definition here" edit del />
        <TermCard term="Hello" definition="definition here" edit del />
        <Fab color="primary" aria-label="Add" onClick={this.handleClickOpenAdd}>
          <AddIcon />
        </Fab>

        {/* Dialog for Add Button */}
        <Dialog
          classes={{ paper: classes.addDialog }}
          onClose={this.handleCloseAdd}
          open={openAdd}
          disableBackdropClick
          disableEscapeKeyDown
        >
          <DialogTitle onClose={this.handleCloseAdd}>Add Term</DialogTitle>
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
      </div>
    );
  }
}

export default withStyles(styles)(Glossary);
