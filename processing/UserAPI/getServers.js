const fetch = require('node-fetch');

module.exports = (SessionID) => {

    return new Promise((res, error) => {

        fetch(`https://playerservers.com/account`, {
            headers: { cookie: `PHPSESSID=${SessionID};` }
        }).then(res => res.text())
            .then(body => {
                
                if (body === '<script data-cfasync="false">window.location.replace("/login/");</script>') {
                    return error('Invalid Session ID');
                }

                const tables = body.split("<tbody>");
                var table1 = tables[1].split('</tbody>')[0];
                var table2 = tables[2].split('</tbody>')[0]

                var servers = [];

                table1 = table1.split('<tr>');
                table1.forEach(t => {
                    t = t.split('</tr>').join('');
                    if (t.includes('<a href="https://playerservers.com/dashboard/?s=')) {
                        t = t.split('</td>').join('');
                        t = t.split('\n').join('');
                        t = t.split('\t').join('');
                        t = t.split('<td>');
                        t.push(true)
                        servers.push(t);
                    }
                })
                table2 = table2.split('<tr>');
                table2.forEach(t => {
                    t = t.split('</tr>').join('');
                    if (t.includes('<a href="https://playerservers.com/dashboard/?s=')) {
                        t = t.split('</td>').join('');
                        t = t.split('\n').join('');
                        t = t.split('\t').join('');
                        t = t.split('<td>');
                        t.push(false)
                        servers.push(t);
                    }
                })

                servers = parseServers(servers);
                res(servers);
            })
    })
}

function parseServers(servers) {
    var result = [];
    servers.forEach(server => {
        console.log(server);
        const serverObject = new Object();
        serverObject.name = server[1];
        serverObject.plan = server[2].split('<a')[0].replace(' ', '');
        serverObject.boosters = server[3].split(' ').join('');
        serverObject.lastOnline = server[5];
        serverObject.code = server[6].split('https://playerservers.com/dashboard/?s=')[1].split('"')[0];
        serverObject.node = server[4]

        result.push(serverObject);
    })

    return result;
}