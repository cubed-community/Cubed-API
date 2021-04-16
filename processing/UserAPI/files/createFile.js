const fetch = require('node-fetch');
const cheerio = require('cheerio');

module.exports = (SessionID, folder, name, content = '') => {

    return new Promise((res, error) => {

        if (!name.endsWith('.sk') && !name.endsWith('.txt') && !name.endsWith('.json') && !name.endsWith('.yml') && !name.endsWith('.properties') && !name.endsWith('.mcfunction')) {
            return error(`The name "${name}" does not end in one of the accepted extensions: ".sk", ".txt", ".json", ".yml", ".properties" or ".mcfunction" so a file cannot be created with that name!`);
        }

        if (folder.endsWith('/')) {
            folder = folder.slice(0, folder.length - 1)
        }
        if (!folder.startsWith('/')) {
            folder = `/${folder}`;
        }

        fetch(`https://playerservers.com/dashboard/filemanager/?action=new&dir=${folder}`, {
            headers: { cookie: `PHPSESSID=${SessionID};` }
        }).then(res => res.text())
            .then(body => {

                if ((body === '<script data-cfasync="false">window.location.replace("/dashboard/filemanager/");</script>') || (body === '<script data-cfasync="false">window.location.replace("/dashboard/filemanager");</script>')) {
                    return error(`Invalid Folder Location: "${folder}"`);
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

                var ext = name.split('.');
                ext = ext[ext.length - 1];
                name = name.slice(0, name.length - ext.length - 1);

                const $ = cheerio.load(body);
                const token = $("input[name=token]").val();

                const params = new URLSearchParams();
                params.append("token", token);
                params.append("edit-file-name", name);
                params.append("edit-file-content", content);
                params.append("edit-file-sub", "Save");
                params.append("ext", ext);

                fetch(`https://playerservers.com/dashboard/filemanager/?action=new&dir=${folder}`, {
                    method: "POST",
                    headers: { cookie: `PHPSESSID=${SessionID};` },
                    body: params,
                }).then((save) => save.text())
                .then(txt => {
                    if (!txt.includes('<h5><i class="icon fas fa-exclamation-triangle"></i> Error</h5>')) {
                        fetch(`https://playerservers.com/dashboard/filemanager/&dir=${folder}`, {
                            headers: { cookie: `PHPSESSID=${SessionID};` }
                        }).then(res => res.text()).then(txt2 => {
                            if (txt2 === '<script data-cfasync="false">window.location.replace("/dashboard/filemanager");</script>') {
                                return error(`Invalid Folder Location: "${folder}"`);
                            }
                        
                            const file = new Object();
                            file.name = name;
                            file.type = ext;
                            file.path = `${folder}/${name}.${ext}`;
                            return res(file);
                        })
                    }
                    else {
                        var terror = txt.split('<h5><i class="icon fas fa-exclamation-triangle"></i> Error</h5>')[1];
                        terror = terror.split('<li>')[1];
                        terror = terror.split('</li>')[0];

                        return error(`Something went wrong whilst creating a new file ("${name}.${ext}"), error: "${terror}"`)
                    }
                });

            })
    })
}

