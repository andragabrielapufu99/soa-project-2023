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
      name: 'dashboard',
      library: {type: 'var', name: 'dashboard'},
      filename: 'remoteDashboard.js',
      exposes: {
        DashboardModule: './projects/reports-app/src/app/pages/dashboard/dashboard.module.ts',
        DashboardComponent: './projects/reports-app/src/app/pages/dashboard/dashboard.component.ts'
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
