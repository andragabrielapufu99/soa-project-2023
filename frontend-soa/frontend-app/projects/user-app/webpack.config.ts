import {Configuration, container} from 'webpack';
import dep from 'package.json';

export const webpackConfig: Configuration = {
  output: {
    publicPath: 'http://localhost:4201/',
    uniqueName: 'user',
  },
  experiments: {
    topLevelAwait: true,
  },
  optimization: {
    runtimeChunk: false,
  },
  plugins: [
    new container.ModuleFederationPlugin({
      name: 'login',
      library: {type: 'var', name: 'login'},
      filename: 'remoteLogin.js',
      exposes: {
        LoginModule: 'projects/user-app/src/app/pages/login/login.module.ts',
        LoginComponent: 'projects/user-app/src/app/pages/login/login.component.ts'
      },
      shared: {
        '@angular/core': {
          eager: true,
          singleton: true,
          strictVersion: true,
          requiredVersion: dep.dependencies["@angular/router"]
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
          requiredVersion: dep.dependencies["@angular/router"]
        },
        'place-my-order-assets': {eager: true, singleton: true},
      }
    }),
    new container.ModuleFederationPlugin({
      name: 'register',
      library: {type: 'var', name: 'register'},
      filename: 'remoteRegister.js',
      exposes: {
        RegisterModule: 'projects/user-app/src/app/pages/register/register.module.ts',
        RegisterComponent: 'projects/user-app/src/app/pages/register/register.component.ts'
      },
      shared: {
        '@angular/core': {
          eager: true,
          singleton: true,
          strictVersion: true,
          requiredVersion: dep.dependencies["@angular/router"]
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
          requiredVersion: dep.dependencies["@angular/router"]
        },
        'place-my-order-assets': {eager: true, singleton: true},
      }
    }),
    new container.ModuleFederationPlugin({
      name: 'forgot',
      library: {type: 'var', name: 'forgot'},
      filename: 'remoteForgot.js',
      exposes: {
        ForgotModule: 'projects/user-app/src/app/pages/forgot/forgot.module.ts',
        ForgotComponent: 'projects/user-app/src/app/pages/forgot/forgot.component.ts'
      },
      shared: {
        '@angular/core': {
          eager: true,
          singleton: true,
          strictVersion: true,
          requiredVersion: dep.dependencies["@angular/router"]
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
          requiredVersion: dep.dependencies["@angular/router"]
        },
        'place-my-order-assets': {eager: true, singleton: true},
      }
    })
  ]
};

export default webpackConfig;
