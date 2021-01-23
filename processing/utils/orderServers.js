module.exports = (servers) => {
    if (servers.servers) {
        if (!(servers.servers[0].onlinePlayers > -1)) {
            return error('Invalid servers object')
        }

        const result = new Object();
        result.server_count = servers.server_count;
        result.total_players_online = servers.total_players_online;
        result.servers = servers.servers.sort(function (a, b) { return b.onlinePlayers - a.onlinePlayers });

        return result;
    }
    else {
        if (!(servers[0].onlinePlayers > -1)) {
            return error('Invalid servers object')
        }
        return servers.sort(function (a, b) { return b.onlinePlayers - a.onlinePlayers });
    }
}