const fetch = require('node-fetch');

module.exports = (SessionID, path) => {

    return new Promise((res, error) => {

        if (path.endsWith('/')) {
            path = path.slice(0, path.length - 1)
        }
        if (!path.startsWith('/')) {
            path = `/${path}`;
        }

        fetch(`https://playerservers.com/dashboard/filemanager/&action=edit&medit=${path}`, {
            headers: { cookie: `PHPSESSID=${SessionID};` }
        }).then(res => res.text())
            .then(body => {

                if (body === '<script data-cfasync="false">window.location.replace("/dashboard/filemanager");</script>') {
                    return error(`Invalid File Path: "${path}" (https://playerservers.com/dashboard/filemanager/&action=edit&medit=${path})`);
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

                var file = new Object();

                file.title = body.split('<input type="text" name="edit-file-name" id="edit-file-name" class="form-control form-control-lg" value="')[1].split('">')[0]
                file.content = body.split('<textarea style="width:100%" id="edit-file-content" name="edit-file-content" class="form-control" rows="15">')[1].split('</textarea>')[0];

                res(file);
            })
    })
}

