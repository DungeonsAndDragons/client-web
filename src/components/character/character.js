import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import {Grid, Tab, Tabs, Typography, Paper, Tooltip, Button} from "material-ui";
import SwipeableViews from 'react-swipeable-views';

import Loader from "../loader/loader";
import Inventory from './inventory';
import {getBinaryURL} from "../../binaryStorage";
import {injectState} from "freactal";

const styles = theme => ({
    root: {},
    imageContainer: {
        textAlign: 'center'
    },
    image: {
        width: '100%'
    },
    leftStatsGrid: {
        height: '100%',
        padding: '0 3em'
    },
    modifier: {
        marginTop: '2em',
        marginBottom: '2em'
    },
    hp: {
        fontSize: '12pt'
    }
});

const GQL_GET_CHARACTER = gql`
    query GetCharacter($id: ID!) {
        characters(id: $id) {
            name
            image
            health {
                current
                temporary
                maximum
            }
        }
    }
`;

class Character extends React.Component {

    state = {
        selectedTab: 1,
    };

    componentWillMount() {
        const router = this.props.router;
        this.props.effects.setMenu({
            icon: "arrow_back",
            onClick: () => {
                router.push('/dashboard');
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.data.characters === undefined
            && nextProps.data.characters
            && nextProps.data.characters.length !== 1) {
            this.props.effects.pushNotification({
                title: `Character (#${this.props.id}) not found`,
                shown: true
            });
            this.props.router.push('/dashboard');
        }
    }

    handleChange = (event, selectedTab) => {
        this.setState({ selectedTab });
    };

    handleChangeIndex = index => {
        this.setState({ selectedTab: index });
    };

    render() {
        const { id, classes, theme, data } = this.props;

        if (!(data.characters instanceof Array)) {
            return <div>
                <Loader text="Loading Character" />
            </div>
        } else if (data.characters.length !== 1) {
            return <div>Character not found.</div>
        }

        const character = data.characters[0];
        const { health } = character;

        const stats = [
            { type: 'Strength', score: 9, modifier: -1 },
            { type: 'Dexterity', score: 13, modifier: 1 },
            { type: 'Constitution', score: 12, modifier: 1 },
            { type: 'Intelligence', score: 19, modifier: 4 },
            { type: 'Wisdom', score: 12, modifier: 1 },
            { type: 'Charisma', score: 11, modifier: 0 }
        ];

        return (
            <div className={classes.root}>
                <Grid container spacing={40}>
                    {/*  --  Left column  --  */}
                    <Grid item xs={12} md={4} className={classes.imageContainer}>
                        <Grid container spacing={24}>
                            {/*  --  Character image & HP --  */}
                            <Grid item xs={12} sm={4} md={12}>
                                <img src={getBinaryURL(character.image)} className={classes.image}/>

                                <Typography variant="headline" gutterBottom>
                                    {character.name}
                                </Typography>

                                <Tooltip title={`Current: ${health.current} HP | Temporary: ${health.temporary} HP`}>
                                    <Button size="small">
                                        <Typography variant="caption" className={classes.hp}>
                                            {`${health.current}${health.temporary > 0 ? ` + ${health.temporary}` : ''} / ${health.maximum} HP`}
                                        </Typography>
                                    </Button>
                                </Tooltip>
                            </Grid>
                            {/*  --  Most important character stats  --  */}
                            <Grid item xs={12} sm={8} md={12}>
                                <Grid container spacing={24} alignItems="center" justify="center" className={classes.leftStatsGrid}>
                                    {stats.map((stat) =>
                                        <Grid item xs={4} key={stat.type} zeroMinWidth>
                                            <Paper>
                                                <Typography variant="caption" noWrap>
                                                    {stat.type}
                                                </Typography>
                                                <Tooltip title={`Score: ${stat.score}`}>
                                                    <Button className={classes.modifier} size="small">
                                                        <Typography variant="subheading">
                                                            {stat.modifier}
                                                        </Typography>
                                                    </Button>
                                                </Tooltip>
                                            </Paper>
                                        </Grid>
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/*  --  Right column  --  */}
                    <Grid item xs={12} md={8}>
                        <Tabs
                            value={this.state.selectedTab}
                            onChange={this.handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                        >
                            <Tab label="Stats & Spells" />
                            <Tab label="Inventory" />
                            <Tab label="Background & Lore" />
                        </Tabs>

                        <SwipeableViews
                            axis="x"
                            index={this.state.selectedTab}
                            onChangeIndex={this.handleChangeIndex}
                        >
                            <div>Spells & stuff</div>
                            <Inventory id={id} />
                            <div>Background</div>
                        </SwipeableViews>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

Character.propTypes = {
    classes: PropTypes.object.isRequired
};

const Char = injectState(graphql(GQL_GET_CHARACTER)(
    withStyles(styles)(Character)
));

export default ({ params, router }) => {
    return <Char id={params.characterID} router={router} />;
}