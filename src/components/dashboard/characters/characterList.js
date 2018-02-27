import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';

import Grid from 'material-ui/Grid';
import Subheader from 'material-ui/List/ListSubheader';
import Typography from 'material-ui/Typography';
import Modal from 'material-ui/Modal';

import CharacterListItem from './characterListItem';
import {getPlayerID} from "../../../auth";

const styles = theme => ({
    root: {}
});

class CharacterList extends React.Component {
    characters = [
        { id: 1, name: 'Mindartis', player: { id: 1, name: "Noah Peeters" }, img: 'https://i.pinimg.com/originals/2c/12/df/2c12dffe2001e857df79bc8ca0b8d8a6.jpg' },
        { id: 2, name: 'Zuuk', player: { id: 1, name: "Noah Peeters" }, img: 'https://i.pinimg.com/originals/2c/12/df/2c12dffe2001e857df79bc8ca0b8d8a6.jpg' },
        { id: 1, name: 'Mindartis0', player: { id: 3, name: "Noah Peeters" }, img: 'https://i.pinimg.com/originals/2c/12/df/2c12dffe2001e857df79bc8ca0b8d8a6.jpg' },
        { id: 2, name: 'Mindartis1', player: { id: 4, name: "Noah Peeters" }, img: 'https://i.pinimg.com/originals/2c/12/df/2c12dffe2001e857df79bc8ca0b8d8a6.jpg' },
        { id: 3, name: 'Mindartis2', player: { id: 5, name: "Noah Peeters" }, img: 'https://i.pinimg.com/originals/2c/12/df/2c12dffe2001e857df79bc8ca0b8d8a6.jpg' },
        { id: 4, name: 'Mindartis3', player: { id: 6, name: "Noah Peeters" }, img: 'https://i.pinimg.com/originals/2c/12/df/2c12dffe2001e857df79bc8ca0b8d8a6.jpg' },
        { id: 5, name: 'Mindartis4', player: { id: 7, name: "Noah Peeters" }, img: 'https://i.pinimg.com/originals/2c/12/df/2c12dffe2001e857df79bc8ca0b8d8a6.jpg' },
        { id: 6, name: 'Mindartis5', player: { id: 8, name: "Noah Peeters" }, img: 'https://i.pinimg.com/originals/2c/12/df/2c12dffe2001e857df79bc8ca0b8d8a6.jpg' },
        { id: 7, name: 'Mindartis6', player: { id: 9, name: "Noah Peeters" }, img: 'https://i.pinimg.com/originals/2c/12/df/2c12dffe2001e857df79bc8ca0b8d8a6.jpg' },
        { id: 8, name: 'SuperAwesomeCharacterWithSuperLongName', player: { id: 2, name: "Noah Peeters" }, img: 'https://i.pinimg.com/originals/2c/12/df/2c12dffe2001e857df79bc8ca0b8d8a6.jpg' }
    ];

    constructor(args) {
        super();

        this.state = {
            playerID: getPlayerID()
        }
    }

    render() {
        const { classes } = this.props;

        const ownCharacters = this.characters.filter((char) => char.player.id === this.state.playerID);
        const otherCharacters = this.characters.filter((char) => char.player.id !== this.state.playerID);

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

export default withStyles(styles)(CharacterList);