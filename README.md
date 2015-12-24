xivo-auth
=========

Javascript library using rest client from : https://github.com/jpillora/jquery.rest

Example:

```
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
  <script src="https://jpillora.com/jquery.rest/dist/1/jquery.rest.min.js"></script>
  <script src="https://rawgit.com/sboily/xivo-js/master/src/auth.js"></script>
  <script>
    auth = new XiVOAuth();
    auth.host = "https://192.168.1.1:9497";

    backends = auth.backend();
    console.log(backends);

    c = { username: 'test',
          password: 'test',
          backend: 'xivo_user',
          expiration: '60'
        };
    auth.login(c).done(func_success).fail(func_fail);

    var func_success = function(data) {
        console.log(data);
    }

    var func_fail = function(data) {
        console.log(data);
    }

    auth.logout(token).done(func_success).fail(func_fail);
  </script>
```

xivo-ctid-ng
============

```
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
  <script src="https://jpillora.com/jquery.rest/dist/1/jquery.rest.min.js"></script>
  <script src="https://rawgit.com/sboily/xivo-js/master/src/callcontrol.js"></script>
  <script>
    cc = new XiVOCallControl();
    cc.host = "https://192.168.1.124:9500";

    c = { destination: {
              extension: "*10",
              context: "default",
              priority: 1
              },
              source: {
                  user: "ec008fd8-df3c-427a-8cb7-f94c1d238ad3"
              }
        };

    token = "90acc7e1-f580-d6e4-4f59-b4a20800a810";
    cc.make_call(token, c);

    var func_success = function(data) {
        console.log(data);
    }

    var func_fail = function(data) {
        console.log(data);
    }
  </script>
```
