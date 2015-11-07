function XiVOAuth(host) {
    this.host = host;

    this.connect = function(host) {
        host = this.host + "/0.1/"
        return new $.RestClient(host);
    }

    this.login = function(username, password, backend, expiration) {
        client = this.connect();

        if (expiration == null)
            expiration = 3600;

        if (backend == null)
            backend = 'xivo_ws';

        client.add('token', {
            stripTrailingSlash: true,
            stringifyData: true,
            ajax: { async: false },
            username: username,
            password: password
        });

        data = client.token.create({
            backend: backend,
            expiration: expiration
        }).done(function (data) {
            return data;
        });
        return data.responseJSON;
    }

    this.logout = function(token) {
        client = this.connect();

        client.add('token', {
            stripTrailingSlash: true,
            ajax: { async: false,
                    headers: { 'X-Auth-Token': token }
                  }
        });

        return client.token.del(token);
    }

    this.backend = function() {
        client = this.connect();

        client.add('backends', {
            stripTrailingSlash: true,
            stringifyData: true,
            ajax: { async: false }
        });

        data = client.backends.read().done();
        return data.responseJSON;
    }
}
