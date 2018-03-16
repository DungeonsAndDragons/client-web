import { provideState, update } from "freactal";

export const wrapComponentWithAppState = provideState({
    initialState: () => ({
        queue: [],
        menu: {
            icon: "",
            onClick: undefined
        }
    }),
    effects: {
        setMenu: update((state, menu) => ({ menu })),
        pushNotification: update((state, notification) => {
            notification.id = state.queue.length;
            return { queue: state.queue.concat(notification) }
        }),
        hideNotification: update((state, id) => ({
            queue: state.queue.map((notification) => {
                if (notification.id === id) notification.shown = false;
                return notification;
            })
        }))
    }
});