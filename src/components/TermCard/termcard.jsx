import React, { Component } from "react";
import { withStyles } from '@material-ui/styles';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import PropTypes from "prop-types";
import 'typeface-roboto';

const styles = {
    root: {

    },
    definition: {
        textAlign: 'center',
    },
    term: {
        textAlign: 'center',
    },
    button: {
        marginLeft: 10,
        marginRight: 10,
    },
    buttons: {
        margin: 'auto',
        width: '50%',
        padding: 10,
    },
};

class TermCard extends Component {
    static get propTypes() {
        return {
          term: PropTypes.string.isRequired,
          definition: PropTypes.string.isRequired,
          edit: PropTypes.bool,
          delete: PropTypes.bool,
        };
      }

    render() {
        return (
            <div className={this.props.classes.root}>
                <Grid container spacing={1}>
                    <Grid item xs={3}>
                        <p className={this.props.classes.term}>
                            {this.props.term}
                        </p>
                    </Grid>
                    <Grid item xs={6}>
                            {this.props.definition}
                        
                    </Grid>
                    <Grid item xs={3} className={this.props.classes.buttons}>
                        {this.props.edit ?
                            <Fab color="primary" aria-label="Edit" className={this.props.classes.button}>
                                <EditIcon />
                            </Fab>
                            : null}
                        {this.props.delete ?
                            <Fab color="primary" aria-label="Delete" className={this.props.classes.button}>
                                <DeleteIcon />
                            </Fab>
                            : null}
                    </Grid>
                </Grid>
                <hr/>
            </div>
        )
    }
}

export default withStyles(styles)(TermCard)