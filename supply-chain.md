# NPM Supply Chain Attack Vulnerability 

## Overview (TL/DR)
With an internet based Election protocol, election tampering can be done at scale.

A Node.js/JavaScript library supply chain attack occurs when a malicious actor compromises a package in the npm ecosystem, either by injecting malicious code into an existing package or by creating a new, seemingly legitimate package.

The attack can be carried out in a number of ways, including:
- Compromising the account of a legitimate package maintainer
- Creating a new package with a name similar to a popular package
- Compromising the build process of a package
- Compromising the package registry itself
- Compromising the network traffic between the package registry and the user
- Compromising the package manager itself
- Compromising the dependencies of a package
- Compromising the dependencies of a package's dependencies
- Compromising the dependencies of a package's dependencies' dependencies
- Compromising the dependencies of a package's dependencies' dependencies' dependencies (and so on)

Given the critical nature of Elections, the potential for a supply chain attack is a significant risk.
None of the above scenarios are out of the capability of a motivated hacker or state actor.

The confidence that the system is truly secure when using `1182` third party libraries (as in the current implementation) is **EXTREMELY LOW**.

The current implementation has 21 known vulnerabilities in 3rd party libraries, 3 of which are critical, which have not been resolved by the SIV maintainers.

## Known Package Vulnerabilities
The existing implementation already has 21 known issues with 3 critical, 12 high and 6 moderate vulnerabilities. 

### Possible Mitigations for Known Issues
- **DON'T USE 3RD PARTY PACKAGES**: The best way to avoid supply chain attacks is to not use third party packages at all. This is not practical in most cases, but it is the most secure option.
- **Audit Dependencies**: Regularly audit the dependencies of the project to ensure that they are secure and free from vulnerabilities.
- **Use a Lockfile**: Use a lockfile to ensure that the exact versions of dependencies are installed and that they are not tampered with.
- **Use a Dependency Checker**: Use a dependency checker to monitor for vulnerabilities in the dependencies of the project.
- **Use a Security Scanner**: Use a security scanner to scan the project for known vulnerabilities and security issues.
- **Use a Package Signing**: Use package signing to verify the authenticity of packages before installing them.
- **Use a Private Registry**: Use a private registry to host packages and control access to them.


## Unknown Package Vulnerabilities
Even when following best practices and the reported number of known issues is 0, there are still unknown/undetected 
issues that could arise from a supply chain attack. 

The confidence that the system is truly secure when using `1182` third party libraries has NO unknown vulnerabilities is **EXTREMELY LOW**.

## Current implementation Issues 
Both server and client side code rely on a number of 3rd party NPM libraries and packages.  

In the current implementation, the package.json file contains the following number of direct dependencies (Detailed in Appendix 1 below):

```
Dependencies: 45
DevDependencies: 30
```

In turn, the dependencies themselves have their own dependencies on other packages. In the current implementation,
the total number of third party libraries is `1182`.

After running `npm install` the following output is displayed:

```
...

added 1182 packages, and audited 1183 packages in 14s

288 packages are looking for funding
  run `npm fund` for details

21 vulnerabilities (6 moderate, 12 high, 3 critical)

...
```

Of the 1182 dependencies in the project, with 21 *KNOWN* vulnerabilities covering
both serverside and client side code. This number does not include deprecated libraries with no ongoing support.

Even after running `npm audit fix`, which is the standard practice for trying to resolve known issues, there are still
4 vulnerabilities remaining; notably dependencies of the Mailgun library a key part of the stack.




## Appendix 1: Direct Dependency Overview


```angular2html

  "dependencies": {
    "@ant-design/icons": "~4.7",
    "@codemirror/lang-json": "^6.0.1",
    "@emotion/react": "^11.11.4",
    "@emotion/styled": "^11.11.0",
    "@fingerprintjs/fingerprintjs-pro": "^3.5.1",
    "@mdx-js/loader": "^2.0.0",
    "@mui/material": "^5.15.13",
    "@next/mdx": "^11.0.1",
    "@noble/ed25519": "1.6.0",
    "@peculiar/webcrypto": "^1.1.7",
    "@sentry/browser": "^6.0.2",
    "@sentry/tracing": "^6.0.2",
    "@supabase/supabase-js": "^1.21.3",
    "@types/bluebird": "^3.5.33",
    "@types/lodash-es": "^4.17.3",
    "@types/react": "18.2.6",
    "@types/react-dom": "^18.2.22",
    "@uiw/codemirror-extensions-zebra-stripes": "^4.21.25",
    "@uiw/codemirror-theme-github": "^4.21.25",
    "@uiw/react-codemirror": "^4.21.25",
    "bigint-mod-arith": "^3.0.2",
    "bluebird": "^3.7.2",
    "codemirror": "^6.0.1",
    "cookies": "^0.8.0",
    "cypress-mailslurp": "^1.3.0",
    "email-validator": "^2.0.4",
    "firebase-admin": "^9.0.0",
    "jsonwebtoken": "^8.5.1",
    "lodash-es": "^4.17.15",
    "mailgun-js": "^0.22.0",
    "moment": "^2.29.1",
    "next": "12",
    "next-transpile-modules": "8",
    "patch-package": "^6.4.7",
    "pdf-lib": "^1.16.0",
    "postinstall-postinstall": "^2.1.0",
    "pusher": "^4.0.2",
    "pusher-js": "^7.0.2",
    "qr-code-styling": "^1.6.0-rc.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-flip-move": "3.0.5",
    "react-linkify": "^1.0.0-alpha",
    "react-scroll": "^1.8.3",
    "react-signature-pad-wrapper": "^3.3.4",
    "react-transition-group": "^4.4.5",
    "smoothscroll-polyfill": "^0.4.4",
    "swr": "2",
    "throat": "^6.0.1",
    "timeago-react": "^3.0.4",
    "timeago.js": "^4.0.2",
    "ua-parser-js": "^0.7.28"
  },
  "devDependencies": {
    "@types/bun": "^1.0.8",
    "@types/cookies": "^0.7.6",
    "@types/jsonwebtoken": "^8.5.1",
    "@types/mailgun-js": "^0.22.10",
    "@types/node": "^13.9.5",
    "@types/react-linkify": "^1.0.0",
    "@types/react-scroll": "^1.8.2",
    "@types/smoothscroll-polyfill": "^0.3.1",
    "@types/ua-parser-js": "^0.7.36",
    "@typescript-eslint/eslint-plugin": "^6",
    "@typescript-eslint/parser": "^6",
    "autoprefixer": "^10.4.14",
    "cypress": "9.4.1",
    "cypress-localstorage-commands": "^1.6.1",
    "dotenv": "^16.0.0",
    "eslint": "^8",
    "eslint-config-prettier": "^6.10.1",
    "eslint-plugin-cypress": "^2.12.1",
    "eslint-plugin-react": "^7.20.1",
    "eslint-plugin-sort-destructure-keys": "1.5.0",
    "eslint-plugin-sort-keys-fix": "^1.1.1",
    "eslint-plugin-typescript-sort-keys": "3.0",
    "husky": "^4.2.3",
    "import-sort-style-module": "^6.0.0",
    "postcss": "^8.4.23",
    "prettier": "^2.0.2",
    "prettier-plugin-import-sort": "^0.0.4",
    "prettier-plugin-packagejson": "^2.2.5",
    "tailwindcss": "^3.3.1",
    "typescript": "5.4"
  },

```