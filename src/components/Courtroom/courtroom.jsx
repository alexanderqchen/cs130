import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import TermCard from "../TermCard/termcard";
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
      classes: PropTypes.instanceOf(Object).isRequired
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <TermCard term="Hello" definition="definition here" edit del={false} />
        <TermCard term="Hello" definition="definition here" edit del={false} />
        <TermCard term="Hello" definition="definition here" edit del={false} />
        <TermCard term="Hello" definition="definition here" edit del={false} />
        <TermCard term="Hello" definition="definition here" edit del={false} />
        <TermCard term="Hello" definition="definition here" edit del={false} />
        <TermCard term="Hello" definition="definition here" edit del={false} />
        <TermCard term="Hello" definition="definition here" edit del={false} />
        <TermCard term="Hello" definition="definition here" edit del={false} />
        <TermCard term="Hello" definition="definition here" edit del={false} />
      </div>
    );
  }
}

export default withStyles(styles)(Courtroom);
