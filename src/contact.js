/*
@licstart  The following is the entire license notice for the 
JavaScript code in this page.

Copyright (C) 2016  Sylvain Boily

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
 * @class XiVODird
 *
 * @public
 */
var XiVODird = function (host) {
    this.host = host;
    this.api_version = '0.1';
}

/*
 * Connection to the REST API
 *
 * @private
 */
XiVODird.prototype._connect = function() {
    host = this.host + "/" + this.api_version + "/"
    return new $.RestClient(host);
}

/*
 *  Get a contact
 *  
 *  @param token - valid token
 *  @param profile - Profile you want to use for searching
 *  @param term - Term you search
 *  @public
 */
XiVODird.prototype.lookup = function(token, profile, term) {
    client = this._connect();

    client.add('directories', {
        stripTrailingSlash: true,
        ajax: { headers: { 'X-Auth-Token': token } }
    });

    client.directories.add('lookup');

    return client.directories.lookup.read({term:term});
}
