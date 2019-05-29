import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import { IconButton, Snackbar } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import PropTypes from "prop-types";
import TermCard from "../TermCard/termcard";
import Firebase, { withFirebase } from "../Firebase/firebase";
import "typeface-roboto";

const styles = {
  root: {
    overflow: "scroll"
  }
};

// Coding for the future: there will be states so it's best to set
// the code as a React class
// eslint-disable-next-line react/prefer-stateless-function
class Courtroom extends Component {
  static get propTypes() {
    return {
      classes: PropTypes.instanceOf(Object).isRequired,
      firebase: PropTypes.instanceOf(Firebase).isRequired
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      courtroomTerms: null,
      courtroomObject: null,
      courtroomTermToUid: null,

      snackbarOpen: false,
      snackbarText: ""
    };

    this.handleShowSnackbar = this.handleShowSnackbar.bind(this);
    this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this);

    this.fetchCourtroomTermList = this.fetchCourtroomTermList.bind(this);
    this.editTermToDb = this.editTermToDb.bind(this);
  }

  componentDidMount() {
    const { firebase } = this.props;
    this.setState({
      loading: true
    });

    firebase.courtroom().on("value", snapshot => {
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
        const courtroomObject = {};
        const termToUid = {};

        Object.keys(snapshotObject).forEach(uid => {
          const snapshotEntry = snapshotObject[uid];
          termsList.push(snapshotEntry.term);
          courtroomObject[snapshotEntry.term] = snapshotEntry.definition;
          termToUid[snapshotEntry.term] = uid;
        });

        this.setState({
          courtroomTerms: termsList,
          courtroomObject,
          courtroomTermToUid: termToUid,
          loading: false
        });

        return;
      }

      this.setState({ courtroomTerms: new Array(0), loading: false });
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

  fetchCourtroomTermList() {
    const { loading, courtroomTerms, courtroomObject } = this.state;
    if (loading) {
      return <div>Loading courtroom terms</div>;
    }

    if (!courtroomTerms) {
      return <div>Unable to load courtroom terms</div>;
    }

    if (courtroomTerms.length === 0) {
      // Should never happen, since there is no way to delete terms.
      // Devs will have to help add initial terms
      return (
        <div>
          No courtroom terms yet. Please ask the developers to add some
          courtorom terms.
        </div>
      );
    }

    const courtroomTermItems = courtroomTerms.map(key => (
      <TermCard
        key={key}
        term={key}
        isTermEditable={false}
        definition={courtroomObject[key]}
        edit
        del={false}
        editTermToDb={this.editTermToDb}
      />
    ));

    return <div>{courtroomTermItems}</div>;
  }

  editTermToDb(termOriginal, termNew, definitionNew) {
    const { firebase } = this.props;
    const { courtroomTermToUid } = this.state;

    return firebase
      .courtroomByUid(courtroomTermToUid[termOriginal])
      .set({
        term: termNew,
        definition: definitionNew
      })
      .then(() => {
        this.handleShowSnackbar(`Term '${termOriginal}' successfully edited`);
      });
  }

  render() {
    const { classes } = this.props;
    const { snackbarOpen, snackbarText } = this.state;
    return (
      <div className={classes.root}>
        {this.fetchCourtroomTermList()}

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

export default withFirebase(withStyles(styles)(Courtroom));
