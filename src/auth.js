import jwt_decode from 'jwt-decode';
import gql from 'graphql-tag';

import { client } from './graphql'

const GQL_LoginToken = gql`
    query LoginToken($user: String!, $password: String!) {
        token(username: $user, password: $password)
    }`

const GQL_RefreshToken = gql`
    query RefreshToken {
        refreshToken
    }
    `

export async function refreshToken() {
    return await client.query({
        query: GQL_RefreshToken
    }).then(data => sessionStorage.setItem('auth_token', data.data.refreshToken));
}

function getToken() {
    return sessionStorage.getItem('auth_token');
}

function getTokenData() {
    const token = getToken();
    if (!token) return {};
    return jwt_decode(token);
}

export async function fetchAPIToken(user, password) {
    return await client.query({
        query: GQL_LoginToken,
        variables: { user, password }
    }).then(data => sessionStorage.setItem('auth_token', data.data.token));
}

export function isTokenValid() {
    return new Date(getTokenData().exp * 1000) > new Date();
}

export function getPlayerID() {
    return getTokenData().id;
}