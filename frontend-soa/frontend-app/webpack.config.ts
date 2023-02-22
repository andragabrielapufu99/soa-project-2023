import {Configuration, container} from 'webpack';
import dep from 'package.json';

export const webpackConfig: Configuration = {
  output: {
    publicPath: 'http://localhost:4200/',
    uniqueName: 'frontend',
  },
  experiments: {
    topLevelAwait: true,
  },
  optimization: {
    runtimeChunk: false,
  },
  plugins: [
    new container.ModuleFederationPlugin({
      name: 'frontend',
      library: {type: 'var', name: 'frontend'},
      filename: 'remoteFrontend.js',
      exposes: {
        FrontendComponent: 'src/app/app.component.ts'
      },
      shared: {
        '@angular/core': {
          eager: true,
          singleton: true,
          strictVersion: true,
          requiredVersion: dep.dependencies['@angular/core']
        },
        '@angular/common': {
          eager: true,
          singleton: true,
          strictVersion: true,
          requiredVersion: dep.dependencies["@angular/common"]
        },
        '@angular/router': {
          eager: true,
          singleton: true,
          strictVersion: true,
          requiredVersion: dep.dependencies["@angular/router"],
        },
        'place-my-order-assets': {eager: true, singleton: true, strictVersion: true},
      }
    })
  ]
};
export default webpackConfig;
