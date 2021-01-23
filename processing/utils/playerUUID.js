const fetch = require('node-fetch');

module.exports = (playerName) => {
    return new Promise ((UUID, error) => {
        fetch(`https://api.mojang.com/users/profiles/minecraft/${playerName}`).then(async res => {
            if (!(res.status === 200)) {
                return error('There is no user with that username!')
            }
            const json = await res.json();
            UUID(parseUUID(json.id))
        })
    })
}

function parseUUID(uuid) {
    uuid = uuid.slice(0, 8) + '-' + uuid.slice(8);
    uuid = uuid.slice(0, 13) + '-' + uuid.slice(13);
    uuid = uuid.slice(0, 18) + '-' + uuid.slice(18);
    uuid = uuid.slice(0, 23) + '-' + uuid.slice(23);
    return uuid;
}