const fetch = require('node-fetch');

module.exports = (UUID) => {
    return new Promise ((info, error) => {
        fetch(`http://api.playerservers.com/player/${UUID}/tntwars/`).then(res => res.json())
        .then(json => {
            if (json.error) {
                return error(`Could not get tntwars info for player: ${json.message} (code: ${json.code})`);
            }
            return info(json);
        })
    })
}