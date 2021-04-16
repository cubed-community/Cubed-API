const getConsole = require('./getConsole.js');

module.exports = (SessionID, callback) => {

    getConsole(SessionID).then(console => {

        var lastConsole = console;

        function checkConsole() {

            getConsole(SessionID).then(console => {

                if ((console === `The server is offline, Please start the server first`) || (console === `The log file is empty. Perhaps the server was just started`)) {
                    lastConsole = console;
                    setTimeout(checkConsole, 5000)
                }
                else {
                    consoleMessages = console.split('\n');
                    consoleMessages.forEach(m => {
                        if (!lastConsole.includes(`\n` + m) && !lastConsole.includes(m + `\n`)) {
                            callback(m);
                        }
                    })

                    lastConsole = console;
                    setTimeout(checkConsole, 1000);
                }

            })

        }

        setTimeout(checkConsole, 1500)
    })

}