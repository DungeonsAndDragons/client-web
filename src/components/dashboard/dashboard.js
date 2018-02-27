import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Grid from 'material-ui/Grid';

import CharacterList from './characters/characterList';
import SessionList from './sessions/sessionList';

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
    })
});

class Dashboard extends React.Component {
    render() {
        return <div>
            <Grid container spacing={24}>
                <Grid item xs={12} sm={6}>
                    <CharacterList router={this.props.router}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <SessionList/>
                </Grid>
            </Grid>
        </div>
    }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
