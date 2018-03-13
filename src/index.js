import 'babel-polyfill'
import createBrowserRouter from 'found/lib/createBrowserRouter';
import makeRouteConfig from 'found/lib/makeRouteConfig';
// import Redirect from 'found/lib/Redirect';
import Route from 'found/lib/Route';
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';

import { client } from './graphql'
import App from './components/app';
import Login from './components/login';
import Dashboard from './components/dashboard/dashboard';
import Character from './components/dashboard/characters/character';

const BrowserRouter = createBrowserRouter({
    historyOptions: { useBeforeUnload: true },
    routeConfig: makeRouteConfig(
        <Route path="/" Component={App}>
            <Route Component={() => <div>This is the epic DnD website. Go to the Login to get started!</div>} />
            <Route path="login" Component={Login} />
            <Route path="dashboard" Component={Dashboard} />
            <Route path="character/:characterID" Component={Character} />
        </Route>
    ),
    // <Route
    //     path="bar"
    //     getComponent={() =>
    //         new Promise(resolve => {
    //             setTimeout(resolve, 1000, ({ data }) => <div>{data}</div>);
    //         })
    //     }
    //     getData={() =>
    //         new Promise(resolve => {
    //             setTimeout(resolve, 1000, 'Bar');
    //         })
    //     }
    //     render={({ Component, props }) =>
    //     Component && props ? (
    //         <Component {...props} />
    //     ) : (
    //         <div>
    //         <small>Loading&hellip;</small>
    //         </div>
    //     )
    //     }
    // />
    // <Redirect from="baz" to="/foo" />

    renderError: (
        { error }, // eslint-disable-line react/prop-types
    ) => <div>{error.status === 404 ? 'Not found' : 'Error'}</div>,
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <BrowserRouter />
    </ApolloProvider>,
    document.getElementById('root')
);
