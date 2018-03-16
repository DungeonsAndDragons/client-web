import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles';

import Reboot from 'material-ui/Reboot';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Menu, { MenuItem } from 'material-ui/Menu';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';

import { isTokenValid } from '../auth'
import { client } from '../graphql'
import { wrapComponentWithAppState } from '../state';
import Snackbars from './snackbars/snackbar';
import {injectState} from "freactal";

const t = createMuiTheme({
  palette: {
    primary: {
      light: '#ff6f60',
      main: '#e53935',
      dark: '#ab000d',
      contrastText: '#fff',
    },
    secondary: {
      light: '#e2f1f8',
      main: '#b0bec5',
      dark: '#808e95',
      contrastText: '#fff',
    },
  },
});

const styles = theme => ({
    root: {
        overflowX: 'hidden'
    },
    children: {
        margin: 8,
        paddingTop: 64
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    }
});

class App extends React.Component {
    state = {
        anchorEl: null,
    };

    constructor(args) {
        super(args);
        this.props.router.addTransitionHook(
            this.onTransition,
        );
    }

    onTransition = location => {
        if (location.pathname !== '/login' && !isTokenValid()) {
            this.props.router.push('/login');
            return false;
        }
        return true;
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    doLogout = () => {
        this.handleClose();
        sessionStorage.clear();
        client.resetStore();
        setTimeout(() => {
            this.props.router.push('/login');
        }, 500);
    };

    componentWillMount() {
        this.onTransition(this.props.location);
    }

    render() {
        const { classes, children, location, state } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        const appBarContent = location.pathname === '/login' ? (
            <Toolbar>
                <Typography variant="title" color="inherit" style={{ width: '100%', textAlign: 'center' }}>
                    Nordakademie Elmshorn
                </Typography>
            </Toolbar>
        ) : (
            <Toolbar>
                <IconButton className={classes.menuButton} onClick={state.menu.onClick} color="inherit" aria-label="Menu">
                    <Icon>{state.menu.icon}</Icon>
                </IconButton>
                <Typography variant="title" color="inherit" style={{ flex: 1 }}>
                    Dungeons & Dragons
                </Typography>
                <Typography variant="caption" color="inherit">
                    Max Mustermann
                </Typography>
                <div>
                    <IconButton
                        aria-owns={open ? 'menu-appbar' : null}
                        aria-haspopup="true"
                        onClick={this.handleMenu}
                        color="inherit"
                    >
                        <Icon>account_circle</Icon>
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={open}
                        onClose={this.handleClose}
                    >
                        {/*<MenuItem onClick={this.handleClose}>Profile</MenuItem>*/}
                        <MenuItem onClick={this.doLogout}>Logout</MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        );

        return (
            <MuiThemeProvider theme={t}>
                <div className={classes.root}>
                    <Reboot />
                    <AppBar position="fixed" color="primary">{appBarContent}</AppBar>
                    <div className={classes.children}>{children}</div>
                    <div style={{ color: '#bfbfbf', textAlign: 'center'}}>
                        <Typography variant="caption">
                            {new Date().getFullYear()} © Pen and Paper Referat - Nordakademie Elmshorn
                        </Typography>
                    </div>
                    <Snackbars />
                </div>
            </MuiThemeProvider>
        );
    }
}

App.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired
};

export default wrapComponentWithAppState(
    injectState(withStyles(styles)(App))
);
