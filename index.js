const login = require('./processing/UserAPI/login.js');
const selectServer = require('./processing/UserAPI/selectServer.js');
const getServers = require('./processing/UserAPI/getServers.js');

module.exports = {
        login: login,
        selectServer: selectServer,
        getServers: getServers,
        // validate

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


}