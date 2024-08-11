# SIV Election Chrome Extension Hack
This is a demo Chrome extension that exploits the current mock election (https://siv.org/election/1723075118561/vote?auth=link).

It is intended to demonstrate how a compromised client can manipulate votes cast by the client without the client's knowledge.

More information can be found in the [client-compromise.md](client-compromise.md) document.

## Installation
1. Clone the repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable Developer mode by toggling the switch next to 'Developer mode' in the top right corner.
4. Click the 'Load unpacked' button and select the ` /src ` directory of this repository.
5. The extension should now be installed and active.
6. Visit the mock election page (https://siv.org/election/1723075118561/vote?auth=link) and follow the instructions in the [client-compromise.md](client-compromise.md) document to see the exploit in action.

The extension will set the following vote values:

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

## Removal
To remove the extension, navigate to `chrome://extensions/` and click the 'Remove' button next to the extension.
