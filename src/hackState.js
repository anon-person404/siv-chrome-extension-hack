// This file keeps the state of the hack so different stages can be executed depending on the state
const HACK_STATE_KEY = 'hackState_LOCAL_KEY';
let hackState = {
}

function getHackState() {
    hackState = localStorage.getItem(HACK_STATE_KEY);
    if (hackState) {
        hackState = JSON.parse(hackState);
    } else {
        hackState = {
            localStorageEmpty: true,
            interceptedRequest: false,
            electionInfo: null,
            recordEncrypted: false,
            encryptedBadVote: null
        }
        localStorage.setItem(HACK_STATE_KEY, JSON.stringify(hackState));
    }

    return hackState;
}

function setHackState(key, value) {
    getHackState();
    hackState[key] = value;
    localStorage.setItem(HACK_STATE_KEY, JSON.stringify(hackState));
}

getHackState();

