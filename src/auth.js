function XiVOAuth(host) {
    this.host = host;

    $.ajaxSetup({
      timeout: 3
    });

    this.connect = function(host) {
        host = this.host + "/0.1/"
        return new $.RestClient(host);
    }

    this.login = function(username, password, backend, expiration, callback, callback_defered) {
        client = this.connect();

        if (expiration == null)
            expiration = 3600;

        if (backend == null)
            backend = 'xivo_ws';

        client.add('token', {
            stripTrailingSlash: true,
            stringifyData: true,
            username: username,
            password: password
        });

        data = client.token.create({
            backend: backend,
            expiration: expiration
        }).done(function (data) {
            callback(data);
        }).fail(function (data) {
            callback_defered(data);
        });
    }

    this.logout = function(token, callback, callback_defered) {
        client = this.connect();

        client.add('token', {
            stripTrailingSlash: true,
            ajax: { headers: { 'X-Auth-Token': token }
                  }
        });

        client.token.del(token).done(function(data) {
            callback(data);
        }).fail(function(data) {
            callback_defered(data);
        });
    }

    this.backend = function(callback, callback_defered) {
        client = this.connect();

        client.add('backends', {
            stripTrailingSlash: true,
            stringifyData: true
        });

        client.backends.read().done(function(data) {
            callback(data);
        }).fail(function(data) {
            callback_defered(data);
        });
    }
}
