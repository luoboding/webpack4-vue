const path = require('path');

const workspace = process.cwd();
module.exports = {
  src: path.join(workspace, 'src'),
  dist: path.join(workspace, 'dist'),
  config: path.join(workspace, 'config'),
};
