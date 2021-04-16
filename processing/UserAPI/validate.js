const fetch = require('node-fetch');
const cheerio = require("cheerio");

module.exports = (SessionID, username, password) => {

    return new Promise((session, error) => {

        fetch('https://playerservers.com/login', {headers: {cookie: `PHPSESSID=${SessionID};`}}).then(async res => {

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
                headers: { cookie: `PHPSESSID=${SessionID};` },
                body: params
            }).then(async (res) => {
                const txt = await res.text();
                if (txt === `<br />\n<b>Notice</b>:  Undefined property: stdClass::$pass_method in <b>/var/www/html/core/classes/User.php</b> on line <b>212</b><br />\n<script data-cfasync="false">window.location.replace("/dashboard/");</script>` || txt === `<br />\n<b>Notice</b>:  Undefined property: stdClass::$pass_method in <b>/var/www/html/core/classes/User.php</b> on line <b>212</b><br />\n<script data-cfasync="false">window.location.replace("/");</script>` || txt === `<script data-cfasync="false">window.location.replace("/");</script>` || txt === `<script data-cfasync="false">window.location.replace("/dashboard");</script>`) {
                    session(SessionID);
                }
                else {
                    error('Invalid login credentials or session ID was provided');
                }
                
            })
        })
    })
}