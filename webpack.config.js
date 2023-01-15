const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = 'production' !== process.env.NODE_ENV;
const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
  assets: path.join(__dirname, 'assets'),
};

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: {
    build: PATHS.src + '/index.tsx',
  },
  output: {
    filename: 'js/[name].js',
    path: PATHS.dist,
    clean: true,
  },
  devServer: {
    server: {
      options: {
        baseDir: PATHS.dist,
      },
    },
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.([cm]?ts|tsx)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s?css/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: './postcss.config.js',
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html' }),
    new ESLintPlugin({ extensions: ['js', 'jsx', 'ts', 'tsx'] }),
    new MiniCssExtractPlugin({ filename: 'main.css' }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};
