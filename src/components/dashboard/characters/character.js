import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';

const styles = theme => ({
   root: {}
});

class Character extends React.Component {
    render() {
        const { params } = this.props;

        return <div>Here shall be the Character number #{ params.characterID }</div>;
    }
}

Character.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Character);