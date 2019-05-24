import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import "typeface-roboto";
import PropTypes from "prop-types";
import Courtroom from "../Courtroom/courtroom";
import withAuthorization from "../Session/withAuthorization";

const styles = {
  root: {},
  header: {
    backgroundColor: "#eeeeee"
  },
  title: {
    fontWeight: "normal",
    paddingLeft: 50,
    paddingRight: 50
  }
};

class Admin extends Component {
  static get propTypes() {
    return {
      classes: PropTypes.object,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, value) {
    this.setState({ value });
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <div className={this.props.classes.header}>
          <h1 className={this.props.classes.title}>Admin Dashboard</h1>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Courtroom" />
            <Tab label="Glossary" />
            <Tab label="Settings" />
          </Tabs>
        </div>
        {this.state.value === 0 && <Courtroom />}
        {this.state.value === 1 && <p>Page Two</p>}
        {this.state.value === 2 && <p>Page Three</p>}
      </div>
    );
  }
}

export default withStyles(styles)(withAuthorization(Admin));
