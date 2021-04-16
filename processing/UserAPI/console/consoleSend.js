const fetch = require('node-fetch');

module.exports = (SessionID, command) => {

    return new Promise ((res, error) => {

        const params = new URLSearchParams();
        params.append("sendcmd", command)

        fetch('https://playerservers.com/dashboard/console-backend/', {
            method: 'POST',
            headers: { cookie: `PHPSESSID=${SessionID};` },
            body: params
        }).then(res => res.text())
        .then(text => {
            if (text === '<script data-cfasync="false">window.location.replace("/login/");</script>') {
                return error('Invalid Session ID');
            }
            if (text === '<script data-cfasync="false">window.location.replace("/account/");</script>') {
                return error('The session ID provided does not have a server selected on it or is not valid! \nFor information on selecting servers please read: https://pondwadermc.gitbook.io/cubed-api/tutorials-and-guides/selecting-a-server-to-edit');
            }
            if (text.includes('<b>No Permission</b></br>')) {
                return error('You do not have permission to access console for this server');
            }

            res('Command sent');
        })

    })

}