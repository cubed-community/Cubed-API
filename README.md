# Cubed-API
A user API wrapper for CubedCraft and Player Servers, allows you to easily perform functions as if your a logged in user

By using this library you agree to the terms of use: https://pastebin.com/raw/tB2nMNY9

Read documentation here: [https://pondwadermc.gitbook.io/cubed-api/](https://pondwadermc.gitbook.io/cubed-api/)

[![npm](https://img.shields.io/npm/dt/cubed-api.svg?style=for-the-badge)](https://npmjs.com/package/cubed-api)

# Installing
To install Cubed-API run `npm i cubed-api`

# Example Code
```// Dependencies
const CubedCraft = require('cubed-api');

// Account Details
const username = 'ACCOUNT_USERNAME';
const password = 'ACCOUNT_PASSWORD';

// Logging Into The Account
CubedCraft.login(username, password).then(ses => {

    // Getting All Of The User's Servers With Their Session ID
    CubedCraft.getServers(ses).then(servers => {
        console.log(servers);
    })
    
});
```

```
const CubedCraft = require('cubed-api');

CubedCraft.console.onMessage('SessionID', m => {
    console.log(m);
})
```

![CubedCraft-Logo](https://cubedcraft.com/uploads/server-icon.png)
