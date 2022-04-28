// Code used and referenced from https://github.com/portsoc/auth0-example

import OAuth2JWTBearer from 'express-oauth2-jwt-bearer';

import fetch from 'node-fetch';

const status401Errors = [
    'UnauthorizedError',
    'InvalidTokenError',
];

export default function setup(authConfig) {
    const checker = OAuth2JWTBearer.auth({
        audience: authConfig.audience,
        issuerBaseURL: `https://${authConfig.domain}`,
    });

    return {
        getUserID,
        checkJwt,
        getProfile,
    };

    function getUserID(req) {
        if (!req.auth || !req.auth.payload) return null;

        // This is where OAuth2JWTBearer puts the user ID
        return req.auth.payload.sub;
    }

    // Use OAuth2JWTBearer to check the actual token, but handle 401 errors
    function checkJwt(req, res, next) {
        return checker(req, res, (err) => {
            if (err && status401Errors.includes(err.name)) {
                res.sendStatus(401);
            } else {
                next(err);
            }
        });
    }

    async function getProfile(req) {
        // If we don't have any Auth information, there will be no profile
        if (!req.auth || !req.auth.token) return null;

        try {
            const response = await fetch(`https://${authConfig.domain}/userinfo`, {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${req.auth.token}`,
                },
            });

            if (!response.ok) throw response;

            return await response.json();
        } catch (err) {
            console.error('error getting auth profile', req.auth, err);
            return null;
        }
    }
}