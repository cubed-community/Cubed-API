const { URLSearchParams } = require("url");
const fetch = require('node-fetch');
const cheerio = require("cheerio");

module.exports = (username, password) => {

    return new Promise((session, error) => {

        fetch('https://playerservers.com/login').then(async res => {

            const cookies = await res.headers.get('set-cookie');
            const PHPSESSID = await cookies.split('PHPSESSID=')[1].split(';')[0];

            const html = await res.text();

            const $ = cheerio.load(html);
            const token = $("input[name=token]").val();
            
            const params = new URLSearchParams();
            params.append("username", username);
            params.append("password", password);
            params.append("remember", 1);
            params.append("token", token);

            fetch("https://playerservers.com/login", {
                method: "POST",
                headers: { cookie: `PHPSESSID=${PHPSESSID};` },
                body: params
            }).then(async (res) => {
                const txt = await res.text();
                console.log(txt);
                if (txt === `<br />
                <b>Notice</b>:  Undefined property: stdClass::$pass_method in <b>/var/www/html/core/classes/User.php</b> on line <b>212</b><br />
                <script data-cfasync="false">window.location.replace("/dashboard/");</script>`) {
                    session(PHPSESSID);
                }
                else {
                    error('Invalid login credentials were provided');
                }
                
            })
        })
    })
}