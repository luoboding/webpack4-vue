const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const eslintrc = require('./.eslintrc.js');
const paths = require('./paths');

module.exports = {
  entry: path.resolve(paths.src, 'index.js'),
  output: {
    path: paths.dist,
    filename: 'main.bundle.[hash].js'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          baseConfig: {
            extends: eslintrc.extends,
          },
          envs: ["browser", "mocha"],
          useEslintrc: false,
          rules: eslintrc.rules,
        },
      },
     {
      test: /\.less$/,
      use: [
        {
          loader: 'vue-style-loader',
        },
        {
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'less-loader',
          options: {
            sourceMap: true,
            modifyVars: {},
            globalVars: {},
          },
        }
      ]
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        "presets": ["@babel/preset-env"],
      },
    }, {
      test: /\.vue$/,
      loader: 'vue-loader'
    },
    {
      test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
      loader: require.resolve('url-loader'),
      options: {
        limit: 10000,
        name: 'static/media/[name].[hash:8].[ext]',
      },
    },
    {
      test: /\.pug$/,
      oneOf: [
        // this applies to `<template lang="pug">` in Vue components
        {
          resourceQuery: /^\?vue/,
          use: ['pug-plain-loader']
        },
        // this applies to pug imports inside JavaScript
        {
          use: ['raw-loader', 'pug-plain-loader']
        }
      ]
    }]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new StyleLintPlugin({
      files: ['**/*.{vue,htm,html,css,sss,less,scss,sass}'],
      configFile: path.join(paths.config, '.stylelintrc'),
    }),
    new HtmlWebpackPlugin({
      title: '测试',
      template: path.resolve(paths.src, 'public/template.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
  ],
  devServer: {
    contentBase: paths.dist,
    compress: true,
    port: 9000,
    hot: true,
    open: true,
    stats: 'errors-only'
  }
};
