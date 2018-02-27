import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import { sha512 } from 'js-sha512';

import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';

import { fetchAPIToken } from '../auth.js';

import logo from '../assets/dnd_logo.png'

const styles = theme => ({
    wrapper: {
        textAlign: 'center'
    },
    root: theme.mixins.gutters({
        display: 'inline-block',
        flexGrow: 1,
        textAlign: 'center',
        maxWidth: '40em',
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3
    }),
    logo: {
        width: 160,
        height: 160,
    },
    textField: {}
});

class Login extends React.Component {
    state = {
        name: '',
        password: ''
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleKeyPress = event => {
        if (event.key === 'Enter') this.handleLogin();
    };

    handleLogin = () => {
        const router = this.props.router;
        fetchAPIToken(this.state.name, sha512(this.state.password))
            .then(() => router.push('/dashboard'))
            .catch((err) => alert(`Error: ${err.message}`));
    };

    render() {
        const { classes } = this.props;
        return (<div className={classes.wrapper}>
        <Paper className={classes.root} elevation={4}>
            <Grid container spacing={8}>
                <Grid item xs={12}>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <img
                            alt="DnD"
                            src={logo}
                            className={classes.logo}
                        />
                    </div>
                    <Typography variant="headline" component="h1">
                        Dungeons & Dragons
                    </Typography>
                    <Typography variant="subheading" style={{color: '#a0a0a0'}}>
                        NAK Edition
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="name"
                        label="Username"
                        className={classes.textField}
                        value={this.state.name}
                        onChange={this.handleChange('name')}
                        onKeyPress={this.handleKeyPress}
                        margin="normal"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="password"
                        label="Password"
                        className={classes.textField}
                        type="password"
                        autoComplete="current-password"
                        onChange={this.handleChange('password')}
                        onKeyPress={this.handleKeyPress}
                        margin="normal"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        color="primary"
                        className={classes.button}
                        onClick={this.handleLogin}
                    >
                        Login
                    </Button>
                </Grid>
            </Grid>
        </Paper>
        </div>);
    }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
