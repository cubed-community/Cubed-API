# Cubed-API
A API wrapper for CubedCraft and Player Servers

Read documentation here: [https://pondwadermc.gitbook.io/cubed-api/](https://pondwadermc.gitbook.io/cubed-api/)

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
    
});```

![CubedCraft-Logo](https://cubedcraft.com/uploads/server-icon.png)
