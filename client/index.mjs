// Code used and referenced from https://github.com/portsoc/auth0-example

async function fetchAuthConfig() {
    const response = await fetch('/auth_config');
    if (response.ok) {
        return response.json();
    } else {
        throw response;
    }
}

//  Global variable that is our entry point to the auth library
let auth0 = null;

async function initializeAuth0Client() {
    const config = await fetchAuthConfig();

    auth0 = await createAuth0Client({
        domain: config.domain,
        client_id: config.clientId,
        audience: config.audience,
    });
}

// Update the state of all authentication-related elements
async function updateAuthUI() {
    const isAuthenticated = await auth0.isAuthenticated();

    document.getElementById('login').disabled = isAuthenticated;
    document.getElementById('logout').disabled = !isAuthenticated;
    document.getElementById('call').disabled = !isAuthenticated;

    if (isAuthenticated) {
        const user = await auth0.getUser();
        const el = document.getElementById('greeting');
        el.textContent = `Welcome, ${user.given_name} (${user.email})`;
    }
}

async function login() {
    await auth0.loginWithRedirect({
        redirect_uri: window.location.origin,
    });
}

function logout() {
    auth0.logout({
        returnTo: window.location.origin,
    });
}

// Check for the code and state parameters from Auth0 login redirect
async function handleAuth0Redirect() {
    const isAuthenticated = await auth0.isAuthenticated();

    if (isAuthenticated) return;

    const query = window.location.search;
    if (query.includes('state=')) {
        try {
            // process the login state
            await auth0.handleRedirectCallback();
        } catch (e) {
            window.alert(e.message || 'authentication error, sorry');
            logout();
        }

        // Remove the query parameters
        window.history.replaceState({}, document.title, '/');

        await updateAuthUI();
    }
}

async function callServer() {
    const token = await auth0.getTokenSilently();

    const el = document.getElementById('server-response');
    el.textContent = 'loading…';

    const fetchOptions = {
        credentials: 'same-origin',
        method: 'GET',
        headers: { Authorization: 'Bearer ' + token },
    };
    const response = await fetch('/api/hello', fetchOptions);
    if (!response.ok) {
        // Handle the error
        el.textContent = 'Server error:\n' + response.status;
        return;
    }

    // Handle the response
    const data = await response.text();
    el.textContent = data;
}

// Make sure all interactive elements in the page have code attached to them
function setupListeners() {
    document.getElementById('login').addEventListener('click', login);
    document.getElementById('logout').addEventListener('click', logout);
    document.getElementById('call').addEventListener('click', callServer);
}

// This will run when the page loads
async function init() {
    await initializeAuth0Client();
    await setupListeners();
    await updateAuthUI();
    await handleAuth0Redirect();
}

window.addEventListener('load', init);