import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import "typeface-roboto";
import PropTypes from "prop-types";
import Courtroom from "../Courtroom/courtroom";
import Glossary from "../Glossary/glossary";
import Settings from "../Settings/settings";
import SignOutButton from "../SignOut/signOut";
import withAuthorization from "../Session/withAuthorization";

const styles = {
  root: {
    overflow: "hidden"
  },
  header: {
    backgroundColor: "#eeeeee",
    paddingTop: 15
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
      classes: PropTypes.instanceOf(Object).isRequired
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
    this.handleChange = this.handleChange.bind(this);
  }

  // This method handles changes when user switches between tabs
  handleChange(event, value) {
    this.setState({ value });
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <SignOutButton />
          <h1 className={classes.title}>Admin Dashboard</h1>
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Courtroom" />
            <Tab label="Glossary" />
            <Tab label="Settings" />
          </Tabs>
        </div>
        {value === 0 && <Courtroom />}
        {value === 1 && <Glossary />}
        {value === 2 && <Settings />}
      </div>
    );
  }
}

export default withStyles(styles)(withAuthorization(Admin)(false));
