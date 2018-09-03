// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCYk7Vsb3TksS4-3pPY-KImrd3v0ysEl0s',
    authDomain: 'pogo-comm.firebaseapp.com',
    databaseURL: 'https://pogo-comm.firebaseio.com',
    projectId: 'pogo-comm',
    storageBucket: 'pogo-comm.appspot.com',
    messagingSenderId: '825570294140'
  }
};
