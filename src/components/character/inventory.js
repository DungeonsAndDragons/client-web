import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

import Loader from "../loader/loader";
import {Hidden, Icon, IconButton, Input, TextField, Typography} from "material-ui";
import {formatMoney} from "../../helpers";

const styles = theme => ({
    root: {
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto'
    },
    table: {},
    tableRow: {
        cursor: 'pointer'
    },
    input: {
        width: theme.spacing.unit * 3,
        fontSize: theme.typography.body1.fontSize,
        textAlign: 'right'
    },
    noItems: {
        padding: theme.spacing.unit * 2,
        width: '100%',
        textAlign: 'center'
    }
});

const GQL_GET_CHARACTER_INVENTORY = gql`
    query GetCharacter($id: ID!) {
        items {
            name
        }
        characters(id: $id) {
            inventory {
                id
                amount
                item {
                    name
                    cost {
                        gold
                        silver
                        copper
                    }
                    weight
                }
            }
        }
    }
`;

class Inventory extends React.Component {

    handleItemAmountChange = event => {
        const newValue = event.target.value;
        // TODO Implement
    };

    handleItemRemoval = itemID => event => {
        // TODO Implement
    };

    render() {
        const { data, classes } = this.props;

        if (!(data.characters instanceof Array)) {
            return <div>
                <Loader text="Loading Inventory" />
            </div>
        } else if (data.characters.length !== 1) {
            return <div>Character not found.</div>
        }

        const character = data.characters[0];
        const { inventory } = character;

        const tableRows = inventory.map(invItem => {
            const item = invItem.item;
            return (
                <TableRow key={invItem.id} className={classes.tableRow} hover>
                    <TableCell>{item.name}</TableCell>
                    <Hidden xsDown><TableCell numeric>{formatMoney(item.cost)}</TableCell></Hidden>
                    <TableCell numeric>
                        <Input
                            disableUnderline
                            value={invItem.amount}
                            onChange={this.handleItemAmountChange}
                            type="number"
                            classes={{
                                input: classes.input
                            }}
                        />
                    </TableCell>
                    <TableCell numeric>{item.weight * invItem.amount}</TableCell>
                    <TableCell padding="none" numeric>
                        <IconButton color="secondary" onClick={this.handleItemRemoval(invItem.id)}>
                            <Icon>delete</Icon>
                        </IconButton>
                    </TableCell>
                </TableRow>
            );
        });

        return (
            <div>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Item</TableCell>
                                <Hidden xsDown><TableCell numeric>Cost</TableCell></Hidden>
                                <TableCell numeric>Amount</TableCell>
                                <TableCell numeric>Total weight (lb)</TableCell>
                                <TableCell padding="none" numeric />
                            </TableRow>
                        </TableHead>
                            <TableBody>{tableRows}</TableBody>
                    </Table>
                    {!tableRows.length ?
                        <Typography variant="subheading" className={classes.noItems}>
                            Looks pretty empty around here.
                        </Typography> : ''}
                </Paper>
                <div className={classes.root} style={{ textAlign: 'center' }}>
                    <TextField
                        placeholder="Add item"
                    />
                </div>
            </div>
        )
    }
}

Inventory.propTypes = {
    classes: PropTypes.object.isRequired
};

export default graphql(GQL_GET_CHARACTER_INVENTORY)(
    withStyles(styles)(Inventory)
);