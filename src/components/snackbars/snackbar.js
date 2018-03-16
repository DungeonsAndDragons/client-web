import React from "react";
import { injectState } from 'freactal';

import {Snackbar} from "material-ui";

// TODO: Fix that multiple snackbars don't overlap each other but stack
const snackbars = ({ state, effects }) => {
    return <div>
        {state.queue.map((notification, id) =>
            <Snackbar
                key={id}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={notification.shown}
                autoHideDuration={6000}
                onClose={() => {
                    effects.hideNotification(id);
                }}
                SnackbarContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{notification.title}</span>}
            />
        )}
    </div>;
};

export default injectState(snackbars);