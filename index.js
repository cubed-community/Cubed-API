// UserAPI

const login = require('./processing/UserAPI/login.js');
const selectServer = require('./processing/UserAPI/selectServer.js');
const getServers = require('./processing/UserAPI/getServers.js');
const validate = require('./processing/UserAPI/validate.js');

// Public API

const servers = require('./processing/PSAPI/servers.js');
const server = require('./processing/PSAPI/server.js');
const topvoted = require('./processing/PSAPI/topvoted.js');
const topboosted = require('./processing/PSAPI/topboosted.js');
const bedwars = require('./processing/PSAPI/player/bedwars.js');
const warzone = require('./processing/PSAPI/player/warzone.js');
const tntwars = require('./processing/PSAPI/player/tntwars.js');
const info = require('./processing/PSAPI/player/info.js');

// Utils

const playerUUID = require('./processing/utils/playerUUID.js');
const orderServers = require('./processing/utils/orderServers.js');

module.exports = {
        login: login,
        selectServer: selectServer,
        getServers: getServers,
        validate: validate,

        /*files: {
            create: createFile,
            edit: editFile,
            delete: deleteFile,
            read: readFile,
            getDir: getDir
        },

        console: {
            on: consoleMessage,
            send: consoleSend
        }
        
        managers: {
            add: managerAdd,
            edit: managerEdit,
            remove: managerRemove
        }
        */

        API: {
            servers: servers,
            server: server,
            topvoted: topvoted,
            topboosted: topboosted,
            player: {
                info: info,
                bedwars: bedwars,
                tntwars: tntwars,
                warzone: warzone
            }
        },

        utils: {
            playerUUID: playerUUID,
            orderServers: orderServers
        }
}