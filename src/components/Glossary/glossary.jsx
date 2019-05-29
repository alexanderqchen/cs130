import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Fab from "@material-ui/core/Fab";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import { IconButton, Snackbar } from "@material-ui/core";
import TermCard from "../TermCard/termcard";
import Firebase, { withFirebase } from "../Firebase/firebase";
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
      classes: PropTypes.instanceOf(Object).isRequired,
      firebase: PropTypes.instanceOf(Firebase).isRequired
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      openAdd: false,
      loading: false,
      glossaryTerms: null,
      glossaryObject: null,
      glossaryTermToUid: null,

      termInput: "",
      definitionInput: "",

      snackbarOpen: false,
      snackbarText: ""
    };
    this.onDefinitionInputChange = this.onDefinitionInputChange.bind(this);
    this.onTermInputChange = this.onTermInputChange.bind(this);

    this.handleClickOpenAdd = this.handleClickOpenAdd.bind(this);
    this.handleCloseAdd = this.handleCloseAdd.bind(this);
    this.handleConfirmAdd = this.handleConfirmAdd.bind(this);
    this.handleShowSnackbar = this.handleShowSnackbar.bind(this);
    this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this);

    this.fetchGlossaryTermList = this.fetchGlossaryTermList.bind(this);
    this.pushTermToDb = this.pushTermToDb.bind(this);
    this.editTermToDb = this.editTermToDb.bind(this);
    this.deleteTermFromDb = this.deleteTermFromDb.bind(this);
  }

  componentDidMount() {
    const { firebase } = this.props;
    this.setState({
      loading: true
    });

    firebase.glossary().on("value", snapshot => {
      /*
      {
        uid1: {
          term: term1,
          definition: definition1,
        },
        uid2: {
          term: term2,
          definition, definition2,
        }
      }
      */
      const snapshotObject = snapshot.val();

      if (snapshotObject) {
        const termsList = new Array(0);
        const glossaryObject = {};
        const termToUid = {};

        Object.keys(snapshotObject).map(uid => {
          const snapshotEntry = snapshotObject[uid];
          termsList.push(snapshotEntry.term);
          glossaryObject[snapshotEntry.term] = snapshotEntry.definition;
          termToUid[snapshotEntry.term] = uid;
          return null;
        });

        this.setState({
          glossaryTerms: termsList,
          glossaryObject,
          glossaryTermToUid: termToUid,
          loading: false
        });

        return;
      }

      this.setState({ glossaryTerms: new Array(0), loading: false });
    });
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

  // Handle the logic when a term is to be added
  handleClickOpenAdd() {
    this.setState({
      termInput: "",
      definitionInput: "",
      openAdd: true
    });
  }

  // Handle the logic when the user cancels the action to add a term
  handleCloseAdd() {
    this.setState({
      termInput: "",
      definitionInput: "",
      openAdd: false
    });
  }

  // Handle the logic when a user adds a term (Presses Add in Add dialog)
  handleConfirmAdd() {
    const { glossaryTerms, termInput, definitionInput } = this.state;

    if (glossaryTerms.indexOf(termInput) !== -1) {
      this.handleShowSnackbar(
        "This term already exists in glossary. Press the pencil icon on that term to edit it"
      );
      return;
    }

    this.pushTermToDb(termInput, definitionInput)
      .then(() => {
        this.setState({
          openAdd: false
        });
      })
      .then(() => {
        this.handleShowSnackbar(
          `Term '${termInput}' successfully added to glossary`
        );
      });
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

  fetchGlossaryTermList() {
    const { loading, glossaryTerms, glossaryObject } = this.state;
    if (loading) {
      return <div>Loading glossary terms</div>;
    }

    if (!glossaryTerms) {
      return <div>Unable to load glossary terms</div>;
    }

    if (glossaryTerms.length === 0) {
      return <div>No glossary terms yet. Use the plus icon to add terms.</div>;
    }

    const glossaryTermItems = glossaryTerms.map(key => (
      <TermCard
        key={key}
        term={key}
        isTermEditable
        definition={glossaryObject[key]}
        edit
        del
        deleteTermFromDb={this.deleteTermFromDb}
        editTermToDb={this.editTermToDb}
      />
    ));

    return <div>{glossaryTermItems}</div>;
  }

  deleteTermFromDb(term) {
    const { firebase } = this.props;
    const { glossaryTermToUid } = this.state;

    return firebase
      .glossaryByUid(glossaryTermToUid[term])
      .remove()
      .then(() => {
        this.handleShowSnackbar(`Term '${term}' successfully deleted`);
      });
  }

  editTermToDb(termOriginal, termNew, definitionNew) {
    const { firebase } = this.props;
    const { glossaryTermToUid } = this.state;

    return firebase
      .glossaryByUid(glossaryTermToUid[termOriginal])
      .set({
        term: termNew,
        definition: definitionNew
      })
      .then(() => {
        this.handleShowSnackbar(`Term '${termOriginal}' successfully edited`);
      });
  }

  pushTermToDb(term, definition) {
    const { firebase } = this.props;

    return firebase.glossary().push({
      term,
      definition
    });
  }

  render() {
    const { classes } = this.props;
    const {
      openAdd,
      termInput,
      definitionInput,
      snackbarOpen,
      snackbarText
    } = this.state;
    return (
      <div className={classes.root}>
        {this.fetchGlossaryTermList()}

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
            <TextField
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

export default withFirebase(withStyles(styles)(Glossary));
