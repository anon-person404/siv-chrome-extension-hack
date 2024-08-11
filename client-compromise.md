# Chrome Client Compromise & Vote Manipulation

## Overview
When the election system does not control the client frontend, it is unknown if the client is compromised and therefore if data received is as intended by the voter.

An attacker can compromise the client by injecting malicious code into the client's device. The malicious code can then intercept and manipulate the votes cast by the client without the client being aware.

The example below demonstrates how an attacker can use a Chrome Extension to compromise the client and manipulate the votes cast by the client without the client's knowledge. 

While the below demonstrates a Chrome Extension, the same principle can be applied to multiple client-side attack vectors.

## Exploit Scenario
NOTE: The below is a 'fragile' example and developed against the current specific mock election  and is not intended to be a complete exploit. It is intended to demonstrate the concept of how a compromised client can manipulate votes.

It has not been fully tested as I don't have access to the backend system and time constraints, but I believe it to be a working example.

Even if this specific example does not work, it would not require much effort to make it a valid exploit.


### Compromised Chrome Extension
Chrome extensions are reasonably common for all sorts of applications, e.g. ad blockers, password managers, voucher codes, emojis, etc. 

Users are generally not aware the capabilities of the extensions they install. An attacker can create a malicious Chrome extension that appears to be a legitimate application, but can include malicious code.

I have created a demo chrome extension that exploits the current mock election (https://siv.org/election/1723075118561/vote?auth=link). 

A demonstration of this exploit can be found in the following repository: [https://github.com/anon-person404/siv-chrome-extension-hack](https://github.com/anon-person404/siv-chrome-extension-hack) along with installation instructions.

### Attack Sequence
1. User installs the compromised Chrome extension.
1. The extension waits until the user visits the election page.
1. It then replaces the following the JavaScript functions with malicious versions:
   1. **window.fetch**: to intercept relevant network requests.
   2. **localStorage.setItem**: to store the user's vote and election information.
   3. **localStorage.getItem**: to retrieve the user's vote and election information.
1. When the users visits ` https://siv.org/election/1723075118561/vote?auth=link ` the application calls `https://siv.org/api/election/1723075118561/info` where the election details are retrieved.  
1. The extension takes the valid crypto material and includes it with the attacker's vote choices.
1. The extension saves the compromised election info and votes in the local storage.
1. The application checks the localStorage for existing election info and votes.  The extension returns compromised election info and votes to the application.  This loads vote page with the bad vote data.
1. The extension sets the visibility of the application to hidden. This is to prevent the user from seeing the bad vote data being entered into the application.
1. modified response is sent back to the application with the bad vote data. 
1. The extension triggers the onChange event in the application that takes the bad vote values and encrypts them as required by the backend system.
1. localStorage.setItem for the compromised encrypted vote data is intercepted.  This is stored in then 'hackState_LOCAL_KEY' localStorage for later use.
1. The application's compromised version of the vote info is removed from localStorage and a page reload request is sent to the browser which resets the application. On refresh the page is now visible to the user.
1. The application checks the localStorage for the vote info and finds it empty. It then resets its state and reloads valid election info from the server.  This time the extension will not intercept the response.
1. The extension allows a standard election info response to go through. This makes the application appear to be ready to accept a vote.
1. The user enters their vote as normal and submits it.
1. The fetch /api/submit-vote call is intercepted and the valid encrypted vote values are replace with the invalid encrypted vote data that was previously stored in the localStorage. It is then sent to the server.
1. The application relying on localStorage for state displays the valid vote confirmation page but with the users data that was not submitted.


## Installation
1. Clone the repository https://github.com/anon-person404/siv-chrome-extension-hack
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable Developer mode by toggling the switch next to 'Developer mode' in the top right corner.
4. Click the 'Load unpacked' button and select the ` /src ` directory of the repository.
5. The extension should now be installed and active.
6. Visit the mock election page (https://siv.org/election/1723075118561/vote?auth=link) and follow the instructions in the [client-compromise.md](client-compromise.md) document to see the exploit in action.

The extension will set and submit the following vote values:

``` 
     "plaintext": {
        "film_Hackers": "-2",
        "film_Sneakers": "-2",
        "film_WarGames": "-2",
        "film_The Matrix": "-2",
        "film_Ghost in the Shell": "-2",
        "film_Blackhat": "-2",
        "film_Swordfish": "-2",
        "whitespace": "tabs",
        "lang": "BADBAD"
    },

```

You won't see the votes on the page as the extension hides the page while the votes are being manipulated.  The
invalid votes are then submitted to the server and the hack should be validated once the election is over. 
