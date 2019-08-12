const chalk = require('chalk');
const webpack = require('webpack');
const options = require('./config');
const WebpackDevServer = require('webpack-dev-server');

const args = process.argv.slice(2);
const type = args[args.length - 1];
const HOST = process.env.HOST || '0.0.0.0';

const buildMode = type && type === 'build';
Object.assign(options, {
  mode: 'development',
});
if (buildMode) {
  Object.assign(options, {
    mode: 'production',
    devtool: "source-map",
  });
}
const compiler = webpack(options);
if (buildMode) {
  compiler.run((error, stats) => {
    const result = stats.toString({
      colors: true
    });
    console.log(result);
  });
} else {
  const server = new WebpackDevServer(compiler, options.devServer);
  server.listen(options.devServer.port, HOST, err => {
    if (err) {
      return console.log(err);
    }
    console.log(chalk.cyan(`Starting the development server on port: ${options.devServer.port} ...\n`));
  });
}







