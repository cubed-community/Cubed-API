const fetch = require('node-fetch');

module.exports = (SessionID, serverCode) => {
    return new Promise((complete, error) => {
        fetch(`https://playerservers.com/dashboard/?s=${serverCode}`, {
            headers: { cookie: `PHPSESSID=${SessionID};` }
        }).then(res => res.text())
            .then(body => {
                if (body === '<script data-cfasync="false">window.location.replace("/login/");</script>') {
                    throw new Error('Invalid Session ID')
                }
                else {
                    return complete(true);
                }
            })
    })
}