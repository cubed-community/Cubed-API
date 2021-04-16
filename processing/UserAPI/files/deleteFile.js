const fetch = require('node-fetch');

module.exports = (SessionID, path) => {

    return new Promise((res, error) => {

        if (path.endsWith('/')) {
            path = path.slice(0, folder.length - 1)
        }
        if (!path.startsWith('/')) {
            path = `/${path}`;
        }

        fetch(`https://playerservers.com/dashboard/filemanager/&action=delete&delete=${path}`, {
            headers: { cookie: `PHPSESSID=${SessionID};` }
        }).then(res => res.text())
            .then(body => {

                if ((body === '<script data-cfasync="false">window.location.replace("/dashboard/filemanager/");</script>') || (body === '<script data-cfasync="false">window.location.replace("/dashboard/filemanager");</script>')) {
                    return error(`Invalid File Path: "${path}"`);
                }
                if (body === '<script data-cfasync="false">window.location.replace("/login/");</script>') {
                    return error('Invalid Session ID');
                }
                if (body === '<script data-cfasync="false">window.location.replace("/account/");</script>') {
                    return error('The session ID provided does not have a server selected on it. \nFor information on selecting servers please read: https://pondwadermc.gitbook.io/cubed-api/tutorials-and-guides/selecting-a-server-to-edit');
                }
                if (body.includes('<b>No Permission</b></br>')) {
                    return error('You do not have permission to access file manager for this server');
                }

                return res('File delete success');

            })
    })
}

