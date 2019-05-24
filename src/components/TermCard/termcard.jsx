import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
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
  }
};

// eslint-disable-next-line react/prefer-stateless-function
class TermCard extends Component {
  static get propTypes() {
    return {
      term: PropTypes.string.isRequired,
      definition: PropTypes.string.isRequired,
      classes: PropTypes.instanceOf(Map).isRequired,
      edit: PropTypes.bool.isRequired,
      del: PropTypes.bool.isRequired
    };
  }

  render() {
    const { classes, term, definition, edit, del } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <p className={classes.term}>{term}</p>
          </Grid>
          <Grid item xs={6}>
            {definition}
          </Grid>
          <Grid item xs={3} className={classes.buttons}>
            {edit ? (
              <Fab color="primary" aria-label="Edit" className={classes.button}>
                <EditIcon />
              </Fab>
            ) : null}
            {del ? (
              <Fab
                color="primary"
                aria-label="Delete"
                className={classes.button}
              >
                <DeleteIcon />
              </Fab>
            ) : null}
          </Grid>
        </Grid>
        <hr />
      </div>
    );
  }
}

export default withStyles(styles)(TermCard);
