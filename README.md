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

WIP...
