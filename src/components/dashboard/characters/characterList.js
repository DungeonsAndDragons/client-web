import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Grid from 'material-ui/Grid';
import Subheader from 'material-ui/List/ListSubheader';

import CharacterListItem from './characterListItem';
import {getPlayerID} from "../../../auth";
import Loader from "../../loader/loader";

const styles = theme => ({
    root: {},
    loader: {
        height: '100%'
    }
});

const GQL_GET_CHARACTERS = gql`
    query {
        characters {
            id
            name
            player {
                id
                name
            }
            image
        }
    }
`;

class CharacterList extends React.Component {
    constructor() {
        super();

        this.state = {
            playerID: getPlayerID()
        }
    }

    render() {
        const { data, classes } = this.props;

        if (!(data.characters instanceof Array)) {
            return <div className={classes.loader}>
                <Loader text="Loading Characters" />
            </div>
        }

        const ownCharacters = data.characters.filter((char) => parseInt(char.player.id) === this.state.playerID);
        const otherCharacters = data.characters.filter((char) => parseInt(char.player.id) !== this.state.playerID);

        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Subheader component="div">Your characters</Subheader>
                    </Grid>
                    {ownCharacters.map((character) => (
                        <Grid item xs={12} md={6} key={character.id}>
                            <CharacterListItem character={character} imageHeight={500} router={this.props.router}/>
                        </Grid>
                    ))}
                    <Grid item xs={12}>
                        <Subheader component="div">Other characters</Subheader>
                    </Grid>
                    {otherCharacters.map((character) => (
                        <Grid item xs={6} md={4} key={character.id}>
                            <CharacterListItem character={character} router={this.props.router}/>
                        </Grid>
                    ))}
                </Grid>
            </div>
        )
    }
}

CharacterList.propTypes = {
    classes: PropTypes.object.isRequired
};

export default graphql(GQL_GET_CHARACTERS)(
    withStyles(styles)(CharacterList)
);