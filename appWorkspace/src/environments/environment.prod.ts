export const environment = {
  firebase: {
    projectId: 'socialraptor-3bbcd',
    appId: '1:807879198706:web:5c02b28cd64543660fcd6b',
    storageBucket: 'socialraptor-3bbcd.appspot.com',
    apiKey: 'AIzaSyCrQF6Kqfnt0Py79NSrirI3qox_NdL4vsU',
    authDomain: 'socialraptor-3bbcd.firebaseapp.com',
    messagingSenderId: '807879198706',
    measurementId: 'G-Y689TTZQBX',
  },
  publicVAPID: "BAHEv0utccwpEAJSFz8LqEGHb2SP2ffwPWnlJ-KY4jQ6u7YsN2cPmo-VJT9QVQ0EfgcX2KgGBvtLZtr6pbP1x3k",
  production: true
};

/**
 * Procedure pour faire fonctionner notification :
 * dans application active le record de notification et de messaging push
 * si marche pas regarde version service worker dans l'inspecteur
 * aussi tu dois avoir le token qui est console log dans l'inspecteur
 *
 */