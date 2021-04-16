const fetch = require('node-fetch');
const cheerio = require('cheerio');

module.exports = (SessionID) => {
    
    return new Promise((res, error) => {
        fetch('https://playerservers.com/dashboard/console-backend/', {
            headers: { cookie: `PHPSESSID=${SessionID};` }
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

            if ((text !== `The log file is empty. Perhaps the server was just started`) && (text !== "The server is offline, Please start the server first")) {
                text = text.split('<br />').join('')
                const $ = cheerio.load(`<p>${text}</p>`)
                text = $("p").text();
            }

            return res(text);
        });
    })

}