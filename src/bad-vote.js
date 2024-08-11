const bad_vote = {
    "ballot_design": [
        {
            "id": "intro",
            "type": "choose-only-one",
            "title": "Mock election — just to offer a feel for how SIV works.",
            "description": "For this test, authentication is greatly relaxed so many people can participate.",
            "options": [],
            "write_in_allowed": false
        },

        {
            "id": "whitespace",
            "type": "choose-only-one",
            "title": "Which is the right choice?",
            "options": [
                {
                    "name": "Tabs, of course",
                    "value": "tabs",
                    "extrafield": "ORIG_VALUE"
                },
                {
                    "name": "Spaces, I'm not a monster",
                    "value": "spaces"
                },
                {
                    "name": "Idk what you're saying",
                    "value": "idk"
                }
            ],
            "write_in_allowed": false
        },
        {
            "id": "lang",
            "type": "choose-only-one",
            "title": "Best programming language?",
            "options": [],
            "write_in_allowed": true
        },
        {
            "id": "film",
            "type": "score",
            "title": "Score the films: -2 hate it, 0 neutral, +2 love it",
            "options": [
                {
                    "name": "Hackers",
                    "sub": "1995 - A cult classic that follows a group of young hackers who uncover a corporate conspiracy."
                },
                {
                    "name": "Sneakers",
                    "sub": "1992 - A caper about a group of security experts who get entangled in government intrigue."
                },
                {
                    "name": "WarGames",
                    "sub": "1983 - A high school student accidentally hacks into a military supercomputer, which almost starts World War III."
                },
                {
                    "name": "The Matrix",
                    "sub": "1999 - A hacker discovers reality is a simulation controlled by an artificial intelligence."
                },
                {
                    "name": "Ghost in the Shell",
                    "sub": "1995 - A cybernetic government agent and the Internal Bureau of Investigations are hot on the trail of 'The Puppet Master'."
                },
                {
                    "name": "Blackhat",
                    "sub": "2015 - Centers around a furloughed convict and his American and Chinese partners as they hunt a high-level cybercrime network."
                },
                {
                    "name": "Swordfish",
                    "sub": "2001 - A convicted hacker is brought out of retirement for one last job to help steal billions in government funds."
                }
            ],
            "write_in_allowed": false,
            "min_score": -2,
            "max_score": 2
        }
    ],
    "ballot_design_finalized": true,

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
    "election_title": "HACK SIV — 8/8 am Mock Election",
    "has_decrypted_votes": false,
    "observers": [
        "The SIV Server"
    ],
    "threshold_public_key": "5029ff912d33c254c3d1babffd04e933081a3a2810492cb17fd5b2115a13aa4a",
    "voter_applications_allowed": true
};
