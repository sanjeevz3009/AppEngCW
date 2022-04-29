import { loadAuth } from "./auth0.mjs";

function pageLoaded() {
    console.log("Admin page loaded");
    // loadAuth();
}
window.addEventListener("load", pageLoaded);