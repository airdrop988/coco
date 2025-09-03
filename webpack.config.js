const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const deps = require('./package.json').dependencies;

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  const publicPath = isProduction ? '/callmanagement/' : 'http://localhost:3002/';

  return {
    entry: './src/index.js',
    mode: 'development',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].js',
      publicPath: publicPath,
      clean: true,
    },
    devServer: {
      port: 3002,
      historyApiFallback: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      static: {
        directory: path.join(__dirname, 'public'),
      },
      hot: true,
      open: true,
    },
    resolve: {
      extensions: ['.jsx', '.js', '.json'],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'callmanagement',
        filename: 'remoteEntry.js',
        exposes: {
          './CallManagementApp': './src/App'
        },
        shared: {
          react: {
            singleton: true,
            requiredVersion: deps.react,
            eager: true
          },
          'react-dom': {
            singleton: true,
            requiredVersion: deps['react-dom'],
            eager: true
          },
          '@salt-ds/core': { singleton: true },
          '@salt-ds/theme': { singleton: true },
          '@salt-ds/icons': { singleton: true },
        },
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        templateParameters: {
          PUBLIC_URL: publicPath.endsWith('/') ? publicPath.slice(0, -1) : publicPath
        },
        favicon: path.resolve(__dirname, 'public/favicon.ico'),
        manifest: path.resolve(__dirname, 'public/manifest.json'),
      }),
    ]
  };
};
