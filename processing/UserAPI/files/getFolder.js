const fetch = require('node-fetch');

module.exports = (SessionID, path = '/') => {

    return new Promise((res, error) => {

        if (!path.endsWith('/')) {
            path = `${path}/`
        }
        if (!path.startsWith('/')) {
            path = `/${path}`;
        }

        fetch(`https://playerservers.com/dashboard/filemanager/&dir=${path}`, {
            headers: { cookie: `PHPSESSID=${SessionID};` }
        }).then(res => res.text())
            .then(body => {

                if (body === '<script data-cfasync="false">window.location.replace("/dashboard/filemanager");</script>') {
                    return error(`Invalid Folder Location: "${path}"`);
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

                var files = [];

                var folderSplit = body.split('<i class="fa fa-folder" aria-hidden="true"></i></a> ')
                folderSplit = folderSplit.splice(1, folderSplit.length)

                folderSplit.forEach(f => {
                    sf = f.split(' <small>')
                    f = sf[0]
                    if (!f.includes('...</td>')) {
                        var size = sf[1].split('</small>')[0].split('- ')[1]
                        var object = new Object();
                        object.name = f;
                        object.type = 'folder'
                        object.path = `${path}${f}`
                        object.size = size;
                        files.push(object);
                    }
                })

                var fileSplit = body.split('<i class="fa fa-file" aria-hidden="true"></i></a> ')
                fileSplit = fileSplit.splice(1, fileSplit.length)

                fileSplit.forEach(f => {
                    sf = f.split(' <small>')
                    f = sf[0]
                    var object = new Object();
                    var size = sf[1].split('</small>')[0].split('- ')[1]
                    object.name = f;
                    var split = f.split('.');
                    object.type = split[split.length - 1]
                    object.path = `${path}${f}`
                    object.size = size;
                    files.push(object);
                })

                res(files);
            })
    })
}

