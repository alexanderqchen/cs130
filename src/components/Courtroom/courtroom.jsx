import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import TermCard from "../TermCard/termcard";
import "typeface-roboto";

const styles = {
  root: {
    overflowY: "scroll"
  }
};

class Courtroom extends Component {
  render() {
    return (
      <div className={this.props.classes.root}>
        <TermCard
          term="Hello"
          definition="definition here"
          edit={true}
          delete={false}
        />
        <TermCard
          term="Hello"
          definition="definition here"
          edit={true}
          delete={false}
        />
        <TermCard
          term="Hello"
          definition="definition here"
          edit={true}
          delete={false}
        />
        <TermCard
          term="Hello"
          definition="definition here"
          edit={true}
          delete={false}
        />
        <TermCard
          term="Hello"
          definition="definition here"
          edit={true}
          delete={false}
        />
        <TermCard
          term="Hello"
          definition="definition here"
          edit={true}
          delete={false}
        />
        <TermCard
          term="Hello"
          definition="definition here"
          edit={true}
          delete={false}
        />
        <TermCard
          term="Hello"
          definition="definition here"
          edit={true}
          delete={false}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Courtroom);
