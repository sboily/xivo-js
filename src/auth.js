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

DEFAULT_BACKEND = 'xivo_ws';

/*
 * @class XiVOAuth
 *
 * @public
 */
var XiVOAuth = function (host) {
    this.host = host;
}

/*
 * Connection to the REST API
 *
 * @private
 */
XiVOAuth.prototype._connect = function() {
    host = this.host + "/0.1/"
    return new $.RestClient(host);
}

/*
 *  Login in service
 *  
 *  @param info - dict with username, password, backend and expiration
 *  @param callback - callback function if connection is success
 *  @param callback_defered - callback function if connection is unsuccessfull
 *
 *  @public
 */
XiVOAuth.prototype.login = function(info, callback, callback_defered) {
    client = this._connect();
    username = info.username;
    password = info.password;
    backend = info.backend;
    expiration = info.expiration;

    if (expiration == null) {
        expiration = 3600;
    }

    if (backend == null) {
        backend = DEFAULT_BACKEND;
    }

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

/*
 *  Logout from service
 *  
 *  @param token - valid token you want to logout
 *  @param callback - callback function if connection is success
 *  @param callback_defered - callback function if connection is unsuccessfull
 *
 *  @public
 */
XiVOAuth.prototype.logout = function(token, callback, callback_defered) {
    client = this._connect();

    client.add('token', {
        stripTrailingSlash: true,
        ajax: { headers: { 'X-Auth-Token': token } }
    });

    client.token.del(token).done(function(data) {
        callback(data);
    }).fail(function(data) {
        callback_defered(data);
    });
}

/*
 *  Get the all backends support by service
 *  
 *  @param callback - callback function if connection is success
 *  @param callback_defered - callback function if connection is unsuccessfull
 *
 *  @public
 */
XiVOAuth.prototype.backend = function(callback, callback_defered) {
    client = this._connect();

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
