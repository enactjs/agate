var fs = require('fs');

fs.writeFile('.env', 'SKIN=silicon', function (err) {
  if (err) throw err;
  console.log('`.env` file created!!!`');
});
