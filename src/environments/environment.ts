// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { AuthMode } from 'src/app/auth/auth.enum'

export const environment = {
  firebase: {
    projectId: 'stokdirect-8b06d',
    appId: '1:418570652379:web:8def52e282b570890f1afe',
    storageBucket: 'stokdirect-8b06d.appspot.com',
    apiKey: 'AIzaSyAT9SnsIpmyK5oteFhWfTHnC64o2P5jZ6s',
    authDomain: 'stokdirect-8b06d.firebaseapp.com',
    messagingSenderId: '418570652379',
    measurementId: 'G-XXYF0D42PP',
  },
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyAT9SnsIpmyK5oteFhWfTHnC64o2P5jZ6s',
    authDomain: 'stokdirect-8b06d.firebaseapp.com',
    projectId: 'stokdirect-8b06d',
    storageBucket: 'stokdirect-8b06d.appspot.com',
    messagingSenderId: '418570652379',
    appId: '1:418570652379:web:6c9d1395cad00c450f1afe',
    measurementId: 'G-HK8WFS6Y1N',
  },
  authMode: AuthMode.CustomServer,
  apiURL: 'http://192.168.100.30:8000',
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
