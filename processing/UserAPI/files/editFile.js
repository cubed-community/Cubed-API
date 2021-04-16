const fetch = require('node-fetch');
const cheerio = require('cheerio');

module.exports = (SessionID, path, newContent) => {

    return new Promise((res, error) => {

        if (path.endsWith('/')) {
            path = path.slice(0, folder.length - 1)
        }
        if (!path.startsWith('/')) {
            path = `/${path}`;
        }

        fetch(`https://playerservers.com/dashboard/filemanager/&action=edit&medit=${path}`, {
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

                var name = body.split('<input type="text" name="edit-file-name" id="edit-file-name" class="form-control form-control-lg" value="')[1].split('">')[0]
                var ext = name.split('.');
                ext = ext[ext.length - 1];
                name = name.slice(0, name.length - ext.length - 1);

                const $ = cheerio.load(body);
                const token = $("input[name=token]").val();

                const params = new URLSearchParams();
                params.append("token", token);
                params.append("edit-file-name", name + ext);
                params.append("edit-file-content", newContent);
                params.append("edit-file-sub", "Save");

                fetch(`https://playerservers.com/dashboard/filemanager/&action=edit&medit=${path}`, {
                    method: "POST",
                    headers: { cookie: `PHPSESSID=${SessionID};` },
                    body: params,
                }).then((save) => save.text())
                    .then(txt => {
                        if (!txt.includes('<h5><i class="icon fas fa-exclamation-triangle"></i> Error</h5>')) {
                            const file = new Object();
                            file.name = name;
                            file.type = ext;
                            file.path = `${path}`;
                            return res(file);
                        }

                        else {
                            var terror = txt.split('<h5><i class="icon fas fa-exclamation-triangle"></i> Error</h5>')[1];
                            terror = terror.split('<li>')[1];
                            terror = terror.split('</li>')[0];

                            return error(`Something went wrong whilst editing the file ("${name}.${ext}"), error: "${terror}"`)
                        }
                    });

            })
    })
}

