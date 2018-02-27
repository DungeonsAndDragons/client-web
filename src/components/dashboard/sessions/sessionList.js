import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Subheader from 'material-ui/List/ListSubheader';

import SessionTable from './sessionTable';

const styles = theme => ({
    root: {}
});

class SessionList extends React.Component {
    render() {

        const currentTime = new Date().getTime();
        const dayMS = 1000*60*60*24;
        const sessions = [
            { id: 0, name: "Sumpf-Erkundung", gm: { name: 'Maria-Sophie Schiebel' }, date: currentTime - dayMS*0.2, self: true },
            { id: 1, name: "Sumpf-Erkundung", gm: { name: 'Maria-Sophie Schiebel' }, date: currentTime - dayMS, self: false },
            { id: 2, name: "Burg-Verteidigung", gm: { name: 'Maria-Sophie Schiebel' }, date: currentTime - dayMS*6, self: true },
            { id: 3, name: "Burg-Verteidigung", gm: { name: 'Maria-Sophie Schiebel' }, date: currentTime - dayMS*8, self: false },
            // { id: 4, name: "Berg erobern", gm: { name: 'Mark Sujew' }, date: currentTime + dayMS, self: true },
            // { id: 5, name: "SomethingSomething", gm: { name: 'Maria-Sophie Schiebel' }, date: currentTime + dayMS*6, self: false },
            // { id: 6, name: "SomethingSomething", gm: { name: 'Maria-Sophie Schiebel' }, date: currentTime + dayMS*8, self: true }
        ];

        return <div>
            <Subheader component="div">Current</Subheader>
            <SessionTable sessions={sessions} />

            <Subheader component="div">Upcoming</Subheader>
            <SessionTable sessions={sessions} />

            <Subheader component="div">Past</Subheader>
            <SessionTable sessions={sessions} />
        </div>
    }
}

SessionList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SessionList);
