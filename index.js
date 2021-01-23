const login = require('./processing/UserAPI/login.js');
const selectServer = require('./processing/UserAPI/selectServer.js');
const getServers = require('./processing/UserAPI/getServers.js');
const validate = require('./processing/UserAPI/validate.js');

module.exports = {
        login: login,
        selectServer: selectServer,
        getServers: getServers,
        validate: validate

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