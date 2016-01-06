/*
@licstart  The following is the entire license notice for the 
JavaScript code in this page.

Copyright (C) 2015  Sylvain Boily

The JavaScript code in this page is free software: you can
redistribute it and/or modify it under the terms of the GNU
General Public License (GNU GPL) as published by the Free Software
Foundation, either version 3 of the License, or (at your option)
any later version.  The code is distributed WITHOUT ANY WARRANTY;
without even the implied warranty of MERCHANTABILITY or FITNESS
FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.

As additional permission under GNU GPL version 3 section 7, you
may distribute non-source (e.g., minimized or compacted) forms of
that code without the copy of the GNU GPL normally required by
section 4, provided you include this license notice and a URL
through which recipients can access the Corresponding Source.


@licend  The above is the entire license notice
for the JavaScript code in this page.
*/


/*
 * @class XiVOAuth
 *
 * @public
 */
var XiVOCallControl = function (host) {
    this.host = host;
    this.api_version = '1.0';
}

/*
 * Connection to the REST API
 *
 * @private
 */
XiVOCallControl.prototype._connect = function() {
    host = this.host + "/" + this.api_version + "/"
    return new $.RestClient(host);
}

/*
 *  Make call
 *  
 *  @param token - valid token
 *  @param call - dict with all call info
 *  @public
 */
XiVOCallControl.prototype.make_call = function(token, call) {
    client = this._connect();

    client.add('calls', {
        stripTrailingSlash: true,
        stringifyData: true,
        ajax: { headers: { 'X-Auth-Token': token } }
    });

    return client.calls.create(call);
}

/*
 *  Get calls
 *  
 *  @param token - valid token
 *  @param application - filter by application
 *  @param instance - filter by instance
 *  @public
 */
XiVOCallControl.prototype.get_calls = function(token, application, instance) {
    client = this._connect();

    client.add('calls', {
        stripTrailingSlash: true,
        stringifyData: true,
        ajax: { headers: { 'X-Auth-Token': token } }
    });

    return client.calls.read({
            application: application,
            application_instance: instance
    });
}

/*
 *  Get a call info
 *  
 *  @param token - valid token
 *  @param call_id - a call id
 *  @public
 */
XiVOCallControl.prototype.get_call = function(token, call_id) {
    client = this._connect();

    client.add('calls', {
        stripTrailingSlash: true,
        stringifyData: true,
        ajax: { headers: { 'X-Auth-Token': token } }
    });

    return client.calls.read(call_id);
}

/*
 *  Get incoming calls
 *  
 *  @param token - valid token
 *  @param incoming_id - Id of the incoming queue
 *  @public
 */
XiVOCallControl.prototype.get_incoming_calls = function(token, incoming_id) {
    client = this._connect();

    client.add('incoming', {
        ajax: { async: false,
                headers: { 'X-Auth-Token': token }
              }
    });

    client.incoming.add('calls', {
        stripTrailingSlash: true,
        isSingle: true
    });

    return client.incoming.calls.read(incoming_id);
}

/*
 *  Get holding calls
 *  
 *  @param token - valid token
 *  @param holding_id - Id of the waiting queue
 *  @public
 */
XiVOCallControl.prototype.get_holding_calls = function(token, holding_id) {
    client = this._connect();

    client.add('hold', {
        ajax: { headers: { 'X-Auth-Token': token } }
    });

    client.hold.add('calls', {
        stripTrailingSlash: true,
        isSingle: true
    });

    return client.hold.calls.read(holding_id);
}

/*
 *  Hangup a call
 *  
 *  @param token - valid token
 *  @param call_id - Id of the channel
 *  @public
 */
XiVOCallControl.prototype.hangup = function(token, call_id) {
    client = this._connect();

    client.add('calls', {
        stripTrailingSlash: true,
        stringifyData: true,
        ajax: { headers: { 'X-Auth-Token': token } }
    });

    return client.calls.del(call_id);
}

/*
 *  Answer a call
 *  
 *  @param token - valid token
 *  @param call_id - Id of the channel
 *  @param uuid - uuuid of the user
 *  @public
 */
XiVOCallControl.prototype.answer = function(token, call_id, uuid) {
    client = this._connect();

    client.add('calls', {
        stripTrailingSlash: true,
        stringifyData: true,
        ajax: { headers: { 'X-Auth-Token': token } }
    });

    client.calls.add('user', {
     });

    return client.calls.user.update(call_id, uuid);
}

/*
 *  Get incoming calls
 *  
 *  @param token - valid token
 *  @param holding_id - Id of the waiting queue
 *  @public
 */
XiVOCallControl.prototype.create_hold_queue = function(token, holding_id) {
    client = this._connect();

    client.add('hold', {
        stripTrailingSlash: true,
        stringifyData: true,
        ajax: { headers: { 'X-Auth-Token': token } }
    });

    client.hold.create(holding_id, {
      moh: 'default'
    });
}

/*
 *  Hold call
 *  
 *  @param token - valid token
 *  @param holding_id - Id of the waiting queue
 *  @param call_id - Id of the channel
 *  @public
 */
XiVOCallControl.prototype.hold = function(token, holding_id, call_id) {
    client = this._connect();

    client.add('hold', {
        ajax: { headers: { 'X-Auth-Token': token } }
    });

    client.hold.add('calls', {
        stripTrailingSlash: true
    });

    return client.hold.calls.update(holding_id, call_id);
}

/*
 *  Unhold call
 *  
 *  @param token - valid token
 *  @param incoming_id - Id of the incoming queue
 *  @param call_id - Id of the channel
 *  @public
 */
XiVOCallControl.prototype.unhold = function(token, incoming_id, call_id) {
    client = this._connect();

    client.add('incoming', {
        ajax: { headers: { 'X-Auth-Token': token } }
    });

    client.incoming.add('calls', {
        stripTrailingSlash: true
    });

    return client.incoming.calls.update(incoming_id, call_id);
}

/*
 *  blind transfer call
 *
 *  @param token - valid token
 *  @param originator_call_id - Call ID of the originator
 *  @param call_id - Call Id you want to transfer
 *  @param uuid - Uuid of the user you want to transfer
 *  @public
 */
XiVOCallControl.prototype.blind_transfer = function(token, originator_call_id, call_id, uuid) {
    client = this._connect();

    user = { destination: {
                 user: uuid
                 }
           }

    client.add('calls', {
        stripTrailingSlash: true,
        stringifyData: true,
        ajax: { headers: { 'X-Auth-Token': token } }
    });

    client.calls.add('transfer');
    client.calls.transfer.add('blind');

    return client.calls.transfer.blind.create(originator_call_id, call_id, user);
}
