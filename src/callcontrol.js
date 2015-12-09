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

    this.get_incoming_calls = function(token, incoming_id) {
        client = this.connect();

        client.add('incoming', {
            ajax: { async: false,
                    headers: { 'X-Auth-Token': token }
                  }
        });

        client.incoming.add('calls', {
            stripTrailingSlash: true,
            isSingle: true
        });

        data = client.incoming.calls.read(incoming_id)
                                    .done(function (data) {});

        return data.responseJSON;
    }

    this.get_holding_calls = function(token, holding_id) {
        client = this.connect();

        client.add('hold', {
            ajax: { async: false,
                    headers: { 'X-Auth-Token': token }
                  }
        });

        client.hold.add('calls', {
            stripTrailingSlash: true,
            isSingle: true
        });

        data = client.hold.calls.read(holding_id)
                                .done(function (data) {});

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

    this.create_hold_queue = function(token, holding_id) {
        client = this.connect();

        client.add('hold', {
            stripTrailingSlash: true,
            stringifyData: true,
            ajax: { headers: { 'X-Auth-Token': token } }
        });

        client.hold.create(holding_id, {
          moh: 'default'
        });
    }

    this.hold = function(token, holding_id, call_id) {
        client = this.connect();

        client.add('hold', {
            ajax: { headers: { 'X-Auth-Token': token } }
        });

        client.hold.add('calls', {
            stripTrailingSlash: true
        });
        client.hold.calls.update(holding_id, call_id);
    }

    this.unhold = function(token, incoming_id, call_id) {
        client = this.connect();

        client.add('incoming', {
            ajax: { headers: { 'X-Auth-Token': token } }
        });

        client.incoming.add('calls', {
            stripTrailingSlash: true
        });
        client.incoming.calls.update(incoming_id, call_id);
    }
}
