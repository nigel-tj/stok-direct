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
  production: true,
  authMode: AuthMode.Firebase,
}
