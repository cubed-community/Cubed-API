const fetch = require('node-fetch');

module.exports = () => {
    return new Promise ((servers, error) => {
        fetch(`http://api.playerservers.com/servers/`).then(res => res.json())
        .then(json => {
            if (json.error) {
                return error(`Could not get all servers: ${json.message} (code: ${json.code})`);
            }
            return servers(json);
        })
    })
}