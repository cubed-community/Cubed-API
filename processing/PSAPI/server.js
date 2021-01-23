const fetch = require('node-fetch');

module.exports = (serverName) => {
    return new Promise ((server, error) => {
        fetch(`http://api.playerservers.com/server/${serverName}`).then(res => res.json())
        .then(json => {
            if (json.error) {
                return error(`Could not get server info: ${json.message} (code: ${json.code})`);
            }
            return server(json);
        })
    })
}