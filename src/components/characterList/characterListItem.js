import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';

import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

import {getBinaryURL} from "../../binaryStorage";

const styles = theme => ({
    root: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary
    },
    card: {
        backgroundColor: theme.palette.grey['100'],
        border: '1px solid #d3d3d3',
        cursor: 'pointer',
        transitionProperty: 'border',
        transitionDuration: 0.5,
        '&:hover': {
            border: `1px solid ${theme.palette.primary.main}`
        }
    },
    cardContent: {
        backgroundColor: theme.palette.background.paper,
        borderTop: '1px solid #d3d3d3'
    }
});

class CharacterListItem extends React.Component {
    onCharacterClick = () => {
        this.props.router.push(`/character/${this.props.character.id}`);
    };

    render() {
        const { classes, character, imageHeight } = this.props;

        return (
            <Card className={classes.card} onClick={this.onCharacterClick}>
                <CardMedia
                    style={{ height: imageHeight ? imageHeight : 300 }}
                    image={getBinaryURL(character.image)}
                    title={character.name}
                />
                <CardContent className={classes.cardContent}>
                    <Typography variant="headline" component="h3" noWrap>
                        {character.name}
                    </Typography>
                    <Typography variant="caption" component="p">
                        {character.player.name}
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

CharacterListItem.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CharacterListItem);