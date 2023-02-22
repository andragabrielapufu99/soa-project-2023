import webpackConfig from './webpack.config';
import {Configuration} from 'webpack';

export const prodWebpackConfig: Configuration = {
  ...webpackConfig,
  output: {
    publicPath: 'https://module-federation-app2.web.app/', // production server,
    uniqueName: 'user',
  },
};

export default prodWebpackConfig;
