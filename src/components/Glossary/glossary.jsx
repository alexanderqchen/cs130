import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Fab from "@material-ui/core/Fab";
import TextField from "@material-ui/core/TextField";
import TermCard from "../TermCard/termcard";
import "typeface-roboto";

const styles = {
  root: {
    overflow: "scroll"
  },
  addDialog: {
    width: "50%",
    paddingLeft: 25,
    paddingRight: 25
  }
};

// eslint-disable-next-line react/prefer-stateless-function
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
  }

  handleClickOpenAdd() {
    this.setState({
      openAdd: true
    });
  }

  handleCloseAdd() {
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
          <TextField label="Term" margin="normal" />
          <TextField label="Definition" margin="normal" />
          <DialogActions>
            <Button onClick={this.handleCloseAdd} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleCloseAdd} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(Glossary);
