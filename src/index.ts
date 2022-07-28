require('normalize.css/normalize.css');

import '@src/sass/main.scss';
import App from '@src/components/app/app';
import '@src/components/helpers/taskCheck';

new App(document.body);
