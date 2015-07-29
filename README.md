Let people manage inventory.

Do the following to get things started.
=======================================

1. Install nodejs & npm.
2. Install MongoDB.
3. Start mongod.
4. Run `npm install` and `bower install` inside inven-manage directory.
5. Run `grunt -d react` to compile JSX.
6. Run `node server.js` and everything SHOULD be working.


Dev Tips
========
When developing, ensure that any new js code is added within the static/js/frontend directory.


Testing
=======
To test simply run ```mocha tests/``` after installing mocha, supertest, and should and starting the server.

If you would like ot be able to debug tests, do the following:
1. Install node-inspector
2. Run ```node-inspector --web-port=9000 & mocha test/ --debug-brk```. The node-inspector process will continue running in the background so you can just do ```mocha test/ --debug-brk``` on subsequent calls
3. Open a web browser and go to ```http://127.0.0.1:9000```
5. After a few seconds the page should stop at the beginning of the Mocha code. After that you should be able to view the testing code and set breakpoints, etc.