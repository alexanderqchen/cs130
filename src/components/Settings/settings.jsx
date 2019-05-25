import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import "typeface-roboto";

const styles = {
  root: {
    padding: 30
  },
  title: {
    fontWeight: "normal"
  }
};

// eslint-disable-next-line react/prefer-stateless-function
class Settings extends Component {
  static get propTypes() {
    return {
      classes: PropTypes.instanceOf(Object).isRequired
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <h1 className={classes.title}>Accounts</h1>
      </div>
    );
  }
}

export default withStyles(styles)(Settings);
