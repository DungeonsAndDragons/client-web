import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Radio from 'material-ui/Radio';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    myselfButton: {
        color: 'red'
    }
});

const weekInMilliseconds = 1000 * 60 * 60 * 24 * 7;
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
const datesAreTheSameDay = (date1, date2) => {
    return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate()
};
const padNumber = (number, minPad) => {
    const length = number.toString().length;
    if (length < minPad)
        return '0'.repeat(minPad - length) + number.toString();

    return number.toString();
};

class SessionTable extends React.Component {
    formatDate = date => {
        const target = new Date(date);
        const today = new Date();
        const millisecondDelta = today.getTime() - date;

        const time = `${padNumber(target.getHours(), 2)}:${padNumber(target.getMinutes(), 2)}`;
        const shortDate = `${padNumber(target.getDay(), 2)}.${padNumber(target.getMonth(), 2)}`;
        const longDate = `${shortDate}.${target.getFullYear()}`;

        const target_tomorrow = new Date(target.getFullYear(), target.getMonth(), target.getDate() + 1);
        const target_yesterday = new Date(target.getFullYear(), target.getMonth(), target.getDate() - 1);
        if (datesAreTheSameDay(target, today)) {
            return `Today ${time}`;
        } else if (datesAreTheSameDay(target_tomorrow, today)) {
            return `Tomorrow ${time}`;
        } else if (datesAreTheSameDay(target_yesterday, today)) {
            return 'Yesterday';
        } else if (Math.abs(millisecondDelta) < weekInMilliseconds) {
            return `${target.getDay()}. ${monthNames[target.getMonth()]} ${time}`;
        } else {
            return longDate;
        }
    };

    render() {
        const { classes, sessions } = this.props;

        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Game Master</TableCell>
                            <TableCell>When?</TableCell>
                            <TableCell>Me?</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sessions.map(session => {
                            return (
                                <TableRow key={session.id}>
                                    <TableCell>{session.name}</TableCell>
                                    <TableCell>{session.gm.name}</TableCell>
                                    <TableCell>{this.formatDate(session.date)}</TableCell>
                                    <TableCell>
                                        <Radio
                                            classes={{
                                                checked: classes.myselfButton
                                            }}
                                            disabled
                                            checked={session.self}
                                            aria-label="I am enlisted"
                                        />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        )
    }
}

SessionTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SessionTable);
