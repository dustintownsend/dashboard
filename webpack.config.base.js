import path from 'path'
// eslint-disable-next-line import/no-extraneous-dependencies
import validate from 'webpack-validator'
import { dependencies as externals } from './app/package.json'

export default validate({
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel-loader'],
      include: [
        path.join(__dirname, 'desktop', 'main.development'), // temp solution until project reorganized
        path.join(__dirname, 'app'),
        path.join(__dirname, 'node_modules', 'serverless-site'),
        path.join(__dirname, 'node_modules', 'serverless'),
      ],
      exclude: [
        /node_modules(?!\/serverless)/, // ignore node_modules except serverless
      ]
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    },
    {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: ['url'],
    }],
    noParse: [/serverless.*\.test/]
  },
  output: {
    path: path.join(__dirname, 'app', 'dist'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main']
  },
  plugins: [

  ],
  externals: Object.keys(externals || {})
})
