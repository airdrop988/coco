const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const deps = require('./package.json').dependencies;

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  const publicPath = isProduction ? '/callmanagement/' : 'http://localhost:3002/';
  
  return {
    entry: './src/index.js',
    mode: isProduction ? 'production' : 'development',
    
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: isProduction ? '[name].[contenthash].js' : '[name].js',
      publicPath: publicPath,
      clean: true,
    },
    
    devServer: {
      port: 3002,
      historyApiFallback: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
      },
      static: {
        directory: path.join(__dirname, 'public'),
      },
      hot: true,
      open: true,
    },
    
    resolve: {
      extensions: ['.jsx', '.js', '.json', '.ts', '.tsx'],
      fallback: {
        "path": false,
        "fs": false
      }
    },
    
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: "defaults" }], 
                '@babel/preset-react'
              ],
            },
          },
        },
        {
          test: /\.css$/i,
          use: [
            'style-loader', 
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              }
            }
          ],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
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
          // Salt DS packages
          '@salt-ds/core': { 
            singleton: true,
            requiredVersion: deps['@salt-ds/core'] || '^1.0.0'
          },
          '@salt-ds/theme': { 
            singleton: true,
            requiredVersion: deps['@salt-ds/theme'] || '^1.0.0'
          },
          '@salt-ds/icons': { 
            singleton: true,
            requiredVersion: deps['@salt-ds/icons'] || '^1.0.0'
          },
          '@salt-ds/ag-grid-theme': { 
            singleton: true,
            requiredVersion: deps['@salt-ds/ag-grid-theme'] || '^1.0.0'
          },
          // AG Grid packages
          'ag-grid-community': {
            singleton: true,
            requiredVersion: deps['ag-grid-community'] || '^31.0.0'
          },
          'ag-grid-react': {
            singleton: true,
            requiredVersion: deps['ag-grid-react'] || '^31.0.0'
          },
          // Other common packages
          'react-router-dom': {
            singleton: true,
            requiredVersion: deps['react-router-dom'] || '^6.0.0'
          }
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
    ],
    
    ...(isProduction && {
      optimization: {
        minimize: true,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
            agGrid: {
              test: /[\\/]node_modules[\\/](ag-grid-community|ag-grid-react|@salt-ds\/ag-grid-theme)[\\/]/,
              name: 'ag-grid',
              chunks: 'all',
            },
          },
        },
      },
    }),
    
    // Additional webpack optimization for development
    ...(!isProduction && {
      devtool: 'eval-source-map',
      optimization: {
        runtimeChunk: 'single',
      }
    })
  };
};
