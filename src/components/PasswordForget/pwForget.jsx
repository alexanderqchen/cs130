import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import withAuthorization from "../Session/withAuthorization";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 3)
  }
}));

const INITIAL_STATE = {
  email: "",
  error: null
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  static get propTypes() {
    return {
      onClose: PropTypes.func.isRequired,
      open: PropTypes.bool.isRequired,
      classes: PropTypes.instanceOf(Object).isRequired
    };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { onClose, open, classes } = this.props;
    const handleClose = () => {
      onClose();
    };
    const { email } = this.state;
    const isInvalid = email === "";

    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Typography component="h1" variant="h5">
            Forgot Password
          </Typography>
          <div className={classes.paper}>
            <Typography component="h1" variant="body2">
              Please enter the email address linked to your account
            </Typography>
            <form className={classes.form} noValidate onSubmit={this.onSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={this.onChange}
                autoFocus
              />

              <Button
                disabled={isInvalid}
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                fullWidth
              >
                Find Account
              </Button>

              {/* {error && <p>{error.message}</p>} */}
            </form>
          </div>
        </Container>
      </Dialog>
    );
  }
}

const PasswordForgetForm = withAuthorization(PasswordForgetFormBase)(true);

function PasswordForget(props) {
  const classes = useStyles();
  return <PasswordForgetForm classes={classes} {...props} />;
}

export default PasswordForget;
