import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core";
import TermCard from "../TermCard/termcard";
import "typeface-roboto";

const styles = {
  root: {
    overflow: "scroll"
  },
};

// eslint-disable-next-line react/prefer-stateless-function
class Glossary extends Component {
  static get propTypes() {
    return {
      classes: PropTypes.instanceOf(Map).isRequired
    };
  }

  render() {
    const { classes } = this.props;
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
        <Fab color="primary" aria-label="Edit" className={classes.button}>
            <AddIcon />
        </Fab>
      </div>
    );
  }
}

export default withStyles(styles)(Glossary);
