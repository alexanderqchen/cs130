import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import TermCard from "../TermCard/termcard";
import PropTypes from "prop-types";
import "typeface-roboto";

const styles = {
  root: {
    overflowY: "scroll"
  }
};

class Courtroom extends Component {
    static get propTypes() {
        return {
          classes: PropTypes.instanceOf(Map).isRequired,
        };
    }
  render() {
    return (
      <div className={this.props.classes.root}>
        <TermCard
          term="Hello"
          definition="definition here"
          edit
          delete={false}
        />
        <TermCard
          term="Hello"
          definition="definition here"
          edit
          delete={false}
        />
        <TermCard
          term="Hello"
          definition="definition here"
          edit
          delete={false}
        />
        <TermCard
          term="Hello"
          definition="definition here"
          edit
          delete={false}
        />
        <TermCard
          term="Hello"
          definition="definition here"
          edit
          delete={false}
        />
        <TermCard
          term="Hello"
          definition="definition here"
          edit
          delete={false}
        />
        <TermCard
          term="Hello"
          definition="definition here"
          edit
          delete={false}
        />
        <TermCard
          term="Hello"
          definition="definition here"
          edit
          delete={false}
        />
        <TermCard
          term="Hello"
          definition="definition here"
          edit
          delete={false}
        />
        <TermCard
          term="Hello"
          definition="definition here"
          edit
          delete={false}
        />
        <TermCard
          term="Hello"
          definition="definition here"
          edit
          delete={false}
        />
        <TermCard
          term="Hello"
          definition="definition here"
          edit
          delete={false}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Courtroom);
