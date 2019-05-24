import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import TermCard from "../TermCard/termcard";
import "typeface-roboto";

const styles = {
  root: {
    overflowY: "scroll"
  }
};

class Courtroom extends Component {
  static get propTypes() {
    return {
      classes: PropTypes.instanceOf(Map).isRequired
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <TermCard
          term="Hello"
          definition="definition here"
          edit
          del={false}
        />
        <TermCard
          term="Hello"
          definition="definition here"
          edit
          del={false}
        />
        <TermCard
          term="Hello"
          definition="definition here"
          edit
          del={false}
        />
        <TermCard
          term="Hello"
          definition="definition here"
          edit
          del={false}
        />
        <TermCard
          term="Hello"
          definition="definition here"
          edit
          del={false}
        />
        <TermCard
          term="Hello"
          definition="definition here"
          edit
          del={false}
        />
        <TermCard
          term="Hello"
          definition="definition here"
          edit
          del={false}
        />
        <TermCard
          term="Hello"
          definition="definition here"
          edit
          del={false}
        />
        <TermCard
          term="Hello"
          definition="definition here"
          edit
          del={false}
        />
        <TermCard
          term="Hello"
          definition="definition here"
          edit
          del={false}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Courtroom);
