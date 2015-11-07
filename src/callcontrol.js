function XiVOCallControl(host) {
    this.host = host;

    this.connect = function(host) {
        host = this.host + "/1.0/"
        return new $.RestClient(host);
    }

    this.get_calls = function(token, application, instance) {
        client = this.connect();

        client.add('calls', {
            stripTrailingSlash: true,
            stringifyData: true,
            ajax: { async: false,
                    headers: { 'X-Auth-Token': token }
                  }
        });

        data = client.calls.read({
            application: application,
            application_instance: instance
        }).done(function (data) {});

        return data.responseJSON;
    }

    this.hangup = function(token, call_id) {
        client = this.connect();

        client.add('calls', {
            stripTrailingSlash: true,
            stringifyData: true,
            ajax: { headers: { 'X-Auth-Token': token } }
        });

        client.calls.del(call_id);

    }

    this.answer = function(token, call_id, uuid) {
        client = this.connect();

        source = { source: { user: uuid } }

        client.add('calls', {
            stripTrailingSlash: true,
            stringifyData: true,
            ajax: { headers: { 'X-Auth-Token': token } }
        });

        client.calls.add('answer', {
            stripTrailingSlash: true,
            isSingle: true
         });

        client.calls.answer.create(call_id, source);
    }
}
