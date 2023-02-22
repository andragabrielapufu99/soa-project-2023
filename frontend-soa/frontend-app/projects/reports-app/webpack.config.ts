import {Configuration, container} from 'webpack';
import dep from 'package.json';


export const webpackConfig: Configuration = {
  output: {
    publicPath: 'http://localhost:4202/',
    uniqueName: 'reports',
  },
  experiments: {
    topLevelAwait: true,
  },
  optimization: {
    runtimeChunk: false,
  },
  plugins: [
    new container.ModuleFederationPlugin({
      name: 'reports',
      library: {type: 'var', name: 'reports'},
      filename: 'remoteReports.js',
      exposes: {
        ReportsModule: './projects/reports-app/src/app/app.module.ts',
        ReportsComponent: './projects/reports-app/src/app/app.component.ts'
      },
      shared: {
        '@angular/core': {
          eager: true,
          singleton: true,
          requiredVersion: dep.dependencies["@angular/core"]
        },
        '@angular/common': {
          eager: true,
          singleton: true,
        },
        '@angular/router': {
          eager: true,
          singleton: true,
          requiredVersion: dep.dependencies["@angular/router"]
        },
        'place-my-order-assets': {eager: true, singleton: true},
      }
    })
  ]
};

export default webpackConfig;
